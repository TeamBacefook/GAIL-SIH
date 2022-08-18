import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import axios from "axios";

const World = () => {
  // const [countries, setCountries] = useState({ features: [] });
  // const [hoverD, setHoverD] = useState();
  // const [data, setdata] = useState({ features: [] });
  // const globeElement = useRef();
  // const [size, setSize] = useState([0, 0]);

  // useEffect(() => {
  //   var muidiv = document.getElementById("worldmap").getClientRects();
  //   setSize([muidiv["0"].width, muidiv["0"].height]);
  //   globeElement.current.controls().autoRotate = true;
  //   globeElement.current.controls().autoRotateSpeed = -1;
  //   globeElement.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.45 });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://github.com/vasturiano/globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson"
  //     )
  //     .then(setCountries);
  // }, []);
  // // useEffect(() => {
  // //   // load data
  // //   fetch(
  // //     "https://github.com/vasturiano/globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson"
  // //   )
  // //     .then((res) => res.json())
  // //     .then(setCountries);
  // // }, []);
  // const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  // const getVal = (feat) =>
  //   feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  // const maxVal = useMemo(
  //   () => Math.max(...countries.features.map(getVal)),
  //   [countries]
  // );
  // colorScale.domain([0, maxVal]);

  // return (
  //   <ReactGlobe
  //     width={size[0]}
  //     height={size[1] * 0.9}
  //     ref={globeElement}
  //     waitForGlobeReady={true}
  //     globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
  //     backgroundColor="rgba(0,0,0,0)"
  //     lineHoverPrecision={0}
  //     polygonsData={countries.features.filter(
  //       (d) => d.properties.ISO_A2 !== "AQ"
  //     )}
  //     polygonAltitude={(d) => (d === hoverD ? 0.1 : 0.01)}
  //     polygonCapColor={(d) =>
  //       d === hoverD ? "#00116a" : colorScale(getVal(d))
  //     }
  //     polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
  //     polygonStrokeColor={() => "#111"}
  //     polygonLabel={({ properties: d }) => `
  //       <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
  //       GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
  //       Population: <i>${d.POP_EST}</i>
  //     `}
  //     animateIn={true}
  //     onPolygonHover={setHoverD}
  //     polygonsTransitionDuration={300}
  //   />
  // );
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    // load data
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

  return (
    <ReactGlobe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== "AQ"
      )}
      polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={(d) =>
        d === hoverD ? "steelblue" : colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
    />
  );
};

export default World;
