import React from "react";

export default function Slider({
  slide,
  setSlide,
  direction = "horizontal",
  children,
}: {
  slide: number;
  setSlide: React.Dispatch<React.SetStateAction<number>>;
  direction?: "horizontal" | "vertical";
  children: React.ReactNode[];
}) {
  const isVertical = direction === "vertical";

  const dotNav = (
    <div
      className={
        isVertical
          ? "flex flex-col justify-center gap-2 py-4"
          : "flex justify-center gap-2 mt-2 shrink-0"
      }
    >
      {children.map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-colors duration-300 ${
            slide === index ? "bg-black" : "bg-gray-300"
          }`}
          onClick={() => setSlide(index)}
        />
      ))}
    </div>
  );

  return (
    <div className={isVertical ? "flex gap-3" : "flex flex-col"}>
      {isVertical && dotNav /* vertical dots go first*/}

      <div
        className={`relative flex-1 overflow-hidden ${isVertical ? "min-w-0" : "min-h-0"}`}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-300 ease-in-out ${
              index === slide ? "relative" : "absolute inset-0"
            }`}
            style={{
              transform: `translate${isVertical ? "Y" : "X"}(${(index - slide) * 100}%)`,
              opacity: index === slide ? 1 : 0,
              pointerEvents: index === slide ? "auto" : "none",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {!isVertical && dotNav /* horizontal dots go last*/}
    </div>
  );
}
