import React, { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as d3 from "d3-geo";

const worldGeo =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

export default function OriginMap({ countries }: { countries: string[] }) {
  const [hovered, setHovered] = useState<string>();

  // coffee belt is between the Tropic of Cancer (23.5N) and the Tropic of Capricorn (23.5S)
  // these parameters control the viewport of the map, so estimates, not literal coordinates
  const scale = 160;
  const width = 800;
  const height = 250;

  useEffect(() => {
    setHovered(countries.join(", "));
  }, [countries]);

  // default center is on the equator and scale size decide what's visible
  const projection = useMemo(
    () =>
      d3
        .geoMercator()
        .scale(scale)
        .translate([width / 2 - 50, height / 2]),
    [],
  );

  return (
    <div className="w-full user-select-none my-5">
      <div className="h-5 text-center text-sm">{hovered}</div>

      <ComposableMap
        projection={projection}
        width={width}
        height={height}
        className="bg-gray-50"
      >
        <Geographies geography={worldGeo}>
          {({ geographies }: { geographies: any }) =>
            geographies.map((geo: any) => {
              const name = geo.properties.name;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(countries.join(", "))}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{
                    default: {
                      fill: countries.includes(name) ? "#2b2b2b" : "#d9d9d9",
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
