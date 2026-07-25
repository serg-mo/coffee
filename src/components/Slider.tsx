import React from "react";

export default function Slider({
  slide,
  setSlide,
  children,
}: {
  slide: number;
  setSlide: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode[];
}) {
  return (
    <div className="relative">

      <div>
        {children[slide]}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            className={`
              h-2 w-2 rounded-full
              ${slide === index ? "bg-black" : "bg-gray-300"}
            `}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>

    </div>
  );
}
