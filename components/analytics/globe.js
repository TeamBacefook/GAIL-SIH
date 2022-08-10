import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";

import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import axios from "axios";

const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [data, setdata] = useState({ features: [] });
  const globeElement = useRef();
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    var muidiv = document.getElementById("worldmap").getClientRects();
    setSize([muidiv["0"].width, muidiv["0"].height]);
    // Auto-rotate
    globeElement.current.controls().autoRotate = true;
    globeElement.current.controls().autoRotateSpeed = 1;
    globeElement.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.45 });
  }, []);

  // useLayoutEffect(() => {
  //   setSize([window.innerWidth * 0.564, window.innerHeight]);
  // }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/getglobaldataforeachcountry?param=naturalgas&&startyear=2019&&endyear=2022&&country=Albania"
      )
      .then(setdata);
  }, []);
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

  return (
    <ReactGlobe
      // showGraticules={true}
      // style={{
      //   width: "400",
      //   height: "400",
      // }}
      width={size[0]}
      height={size[1]}
      ref={globeElement}
      waitForGlobeReady={true}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundColor="rgba(0,0,0,0)"
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== "AQ"
      )}
      polygonAltitude={(d) => (d === hoverD ? 0.1 : 0.01)}
      polygonCapColor={(d) =>
        d === hoverD ? "#00116a" : colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
      animateIn={true}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
    />
  );
};

export default World;
