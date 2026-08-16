import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as d3 from "d3-geo";

const worldGeo =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

export default function OriginMap({ country }: { country: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // 🌱 Coffee belt crop: ~30°N to 35°S visually
  const projection = useMemo(() => {
    return d3
      .geoMercator()
      .center([20, -5]) // focus Africa / coffee belt
      .scale(160)
      .translate([400, 130]); // controls "cropped viewport"
  }, []);

  return (
    <div style={{ width: "100%", height: 260, userSelect: "none" }}>
      <div style={{ height: 20, fontSize: 12, textAlign: "center" }}>
        {hovered}
      </div>

      <ComposableMap
        projection={projection}
        width={800}
        height={260}
        style={{
          background: "#fafafa",
        }}
      >
        <Geographies geography={worldGeo}>
          {({ geographies }: { geographies: any }) =>
            geographies.map((geo: any) => {
              const name = geo.properties.name;
              const isSelected = name.includes(country);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{
                    default: {
                      fill: isSelected ? "#2b2b2b" : "#d9d9d9",
                      stroke: "#999",
                      strokeWidth: 0.4,
                      outline: "none",
                      cursor: "default",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
