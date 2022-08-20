import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import { data } from "./withdata";

const World = ({
  year,
  commodity,
  type,
  settabledata,
  globeElement,
  selectedCountryonGlobe,
  setCountry,
}) => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    var muidiv = document.getElementById("worldmap").getClientRects();
    setSize([muidiv["0"].width, muidiv["0"].height]);
    globeElement.current.controls().autoRotate = true;
    globeElement.current.controls().autoRotateSpeed = -1;
    globeElement.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.45 });
  }, [globeElement]);

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  useEffect(() => {
    setCountries(data);
  }, []);
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getVal = useCallback(
    (feat) => {
      return feat.properties[year] === undefined
        ? 0
        : feat.properties[year][commodity][type];
    },
    [year, commodity, type]
  );

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries, getVal]
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
      polygonAltitude={(d) => {
        return d === hoverD ? 0.06 : d === selectedCountryonGlobe ? 0.1 : 0.02;
      }}
      // polygonAltitude={(d) => (d === hoverD ? 0.06 : 0.02)}
      polygonCapColor={(d) =>
        d === hoverD
          ? "steelblue"
          : d === selectedCountryonGlobe
          ? "turquoise"
          : colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) => `
      <div>
        <b>${d.SOVEREIGNT} (${d.ISO_A2}):</b> <br />
        ${commodity} ${year} ${type}: <i>${
        d[year] === undefined
          ? "NA"
          : d[year][commodity][type] + " " + d[year][commodity]["Metric"]
      } </i> <br />
        World Bank Region: <i>${d.REGION_WB}</i>
        </div>
      `}
      onPolygonHover={setHoverD}
      onPolygonClick={(value) => {
        setCountry(value.properties.SOVEREIGNT);
        var tabledata = [];
        for (var year of [
          "1990",
          "1991",
          "1992",
          "1993",
          "1994",
          "1995",
          "1996",
          "1997",
          "1998",
          "1999",
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
        ]) {
          if (value.properties[year] !== undefined) {
            tabledata.push({
              commodity: commodity,
              year: year,
              imports: value.properties[year][commodity]["Imports"],
              exports: value.properties[year][commodity]["Exports"],
              consumption: value.properties[year][commodity]["Consumption"],
              production: value.properties[year][commodity]["Production"],
              metric: value.properties[year][commodity]["Metric"],
            });
          }
        }
        settabledata(tabledata);
      }}
      polygonsTransitionDuration={300}
    />
  );
};

export default World;
