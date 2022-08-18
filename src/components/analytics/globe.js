import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import { data } from "./withdata";

const World = ({ year, commodity, type, setpolygondata }) => {
  const globeElement = useRef();
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    var muidiv = document.getElementById("worldmap").getClientRects();
    setSize([muidiv["0"].width, muidiv["0"].height]);
    globeElement.current.controls().autoRotate = true;
    globeElement.current.controls().autoRotateSpeed = -1;
    globeElement.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.45 });
  }, []);

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  useEffect(() => {
    setCountries(data);
  }, []);
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getVal = (feat) =>
    feat.properties[year] === undefined
      ? 0
      : feat.properties[year][commodity][type];

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries, year, commodity, type]
  );
  colorScale.domain([0, maxVal]);

  return (
    <ReactGlobe
      width={size[0]}
      height={size[1] * 0.9}
      ref={globeElement}
      waitForGlobeReady={true}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundColor="rgba(0,0,0,0)"
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== "AQ"
      )}
      polygonAltitude={(d) => (d === hoverD ? 0.06 : 0.02)}
      polygonCapColor={(d) =>
        d === hoverD ? "steelblue" : colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) => `
        <b>${d.SOVEREIGNT} (${d.ISO_A2}):</b> <br />
        ${commodity} ${year} ${type}: <i>${
        d[year] === undefined
          ? "NA"
          : d[year][commodity][type] + " " + d[year][commodity]["Metric"]
      } </i> <br />
        World Bank Region: <i>${d.REGION_WB}</i>
      `}
      onPolygonHover={setHoverD}
      onPolygonClick={setpolygondata}
      polygonsTransitionDuration={300}
    />
  );
};

export default World;
