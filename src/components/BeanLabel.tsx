import React from "react";
import BeanShape from "types/BeanShape";
import BeanChart from "./BeanChart";

const toSeconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

const fromSeconds = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} `;

export default function BeanLabel({ bean }: { bean: BeanShape }) {
  // TODO: given a roast url, fetch all the numbers
  // https://roast.world/outreach/roasts/MbJ_3pAl6Foe4LOzKWEOi

  // grams
  const inWeight = 500;
  const outWeight = 436;
  const yieldPercentage = outWeight / inWeight;

  // manually recorded events, celcius
  const yellow = { temp: 161.8, time: "3:15" };
  const firstCrack = { temp: 201.8, time: "7:23" };
  const drop = { temp: 209.6, time: "09:06" }; // end temp and total time

  const totalSeconds = toSeconds(drop.time);
  const dryingSeconds = toSeconds(yellow.time);
  const roastingSeconds = toSeconds(firstCrack.time) - toSeconds(yellow.time);
  const developingSeconds = totalSeconds - toSeconds(firstCrack.time);

  const dryingPercentage = ((100 * dryingSeconds) / totalSeconds).toFixed();
  const roastingPercentage = ((100 * roastingSeconds) / totalSeconds).toFixed();
  const developingPercentage = (
    (100 * developingSeconds) /
    totalSeconds
  ).toFixed();

  return (
    <div className="h-[6in] w-[4in] m-auto flex flex-col gap-2 overflow-hidden rounded border border-gray-200 p-2 text-black">
      <div className="">
        <div className="text-2xl font-black leading-none tracking-tight">
          {bean.specifications?.["country"]}
        </div>

        <div className="mt-1 text-[9px] font-bold uppercase tracking-widest flex flex-row justify-between items-center w-full">
          <div>{bean.specifications?.["local region"]}</div>
          <div>{bean.specifications?.["process"]}</div>
          <div>{bean.specifications?.["altitude"]}</div>
        </div>
      </div>

      <div className="border-y p-2 text-center text-xl font-black leading-none">
        WHOLE BEANS
        <br />
        Roasted
        {/* TODO: fetch date from url */}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>

      <BeanChart beans={[bean]} />

      <div>
        <div className="grid grid-cols-4 divide-x text-[7px] text-center uppercase mb-2">
          <div className="">
            <div className="font-bold">In</div>
            <div className="font-black">{inWeight}g</div>
          </div>

          <div className="">
            <div className="font-bold">Yield</div>
            <div className="font-black">
              {(yieldPercentage * 100).toFixed()}%
            </div>
          </div>

          <div className="">
            <div className="font-bold">Loss</div>
            <div className="font-black">
              {((1 - yieldPercentage) * 100).toFixed()}%
            </div>
          </div>

          <div className="">
            <div className="font-bold">Out</div>
            <div className="font-black">{outWeight}g</div>
          </div>
        </div>

        <div className="grid grid-cols-3 items-stretch border-t text-[7px] text-center font-bold uppercase">
          <div className="relative">
            <div className="font-bold pt-2">Drying</div>
            <div className="font-black">
              {fromSeconds(dryingSeconds)} · {dryingPercentage}%
            </div>

            <div className="absolute left-0 top-0 -translate-y-1/2 -translate-x-[2px] bg-white pr-1 ">
              Green
            </div>

            <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-white px-1 ">
              Yellow
            </div>
          </div>

          <div className="border-x">
            <div className="font-bold pt-2">Browning</div>
            <div className="font-black">
              {fromSeconds(roastingSeconds)} · {roastingPercentage}%
            </div>
          </div>

          <div className="relative">
            <div className="font-bold pt-2">Development</div>
            <div className="font-black">
              {fromSeconds(developingSeconds)} · {developingPercentage}%
            </div>

            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-1 ">
              First Crack
            </div>

            <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-[2px] bg-white pl-1 ">
              Drop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
