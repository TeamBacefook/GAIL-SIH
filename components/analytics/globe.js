import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
} from "react-simple-maps-legacy";

const Map = () => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    var muidiv = document.getElementById("worldmap").getClientRects();
    setSize([muidiv["0"].width, muidiv["0"].height]);
  }, []);
  return (
    <div>
      <ComposableMap
        width={size[0]}
        height={size[1]}
        projection="orthographic"
        projectionConfig={{ scale: 220 }}
      >
        <ZoomableGlobe>
          <circle
            cx={size[0] / 2}
            cy={size[1] / 2}
            r={220}
            fill="#0072c4"
            stroke="#CFD8DC"
          />
          <Geographies
            disableOptimization
            geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
          >
            {(geos, proj) =>
              geos.map((geo, i) => (
                <Geography
                  key={geo.id + i}
                  geography={geo}
                  projection={proj}
                  style={{
                    default: { fill: "#CFD8DC" },
                    hover: {
                      fill: "orange",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGlobe>
      </ComposableMap>
    </div>
  );
};

export default Map;
