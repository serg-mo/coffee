import React, { createContext, useContext, useState } from "react";

// TODO: x is year, y is slide, add "region"
const SliderContext = createContext<{ x: number; y: number }>({ x: 0, y: 0 });

export function useSlider() {
  const context = useContext(SliderContext);
  if (!context) throw new Error("useSlider must be used inside Slider");
  return context;
}

function NavDots({
  length,
  value,
  setValue,
}: {
  length: number;
  value: number;
  setValue: (v: number) => void;
}) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-colors duration-800 ${value === index ? "bg-gray-600" : "bg-gray-300"}`}
          onClick={() => setValue(index)}
        />
      ))}
    </>
  );
}

export default function Slider({
  maxX,
  children,
}: {
  maxX: number;
  children: React.ReactNode[];
}) {
  const maxY = children.length;
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  return (
    <div className="relative w-full min-h-full">
      {/* Left dots */}
      <div className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
        <NavDots length={maxY} value={y} setValue={setY} />
      </div>

      {/* Centered content */}
      <div className="flex min-h-full w-full items-center justify-center px-6 pb-6">
        <div className="relative w-full">
          <SliderContext.Provider value={{ x, y }}>
            {children[y]}
          </SliderContext.Provider>
        </div>
      </div>

      {/* Bottom dots */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
        <NavDots length={maxX} value={x} setValue={setX} />
      </div>
    </div>
  );
}
