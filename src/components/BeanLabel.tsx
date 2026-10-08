import React from "react";
import BeanShape from "types/BeanShape";
import BeanChart from "./BeanChart";

const toSeconds = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);

    return minutes * 60 + seconds;
};

const formatSeconds = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} `;

export default function BeanLabel({ bean }: { bean: BeanShape }) {
    // https://roast.world/outreach/roasts/MbJ_3pAl6Foe4LOzKWEOi

    // grams
    const inWeight = 500;
    const outWeight = 436;
    const yieldPercentage = outWeight / inWeight;

    // TODO: yellowing vs drying

    // manually recorded events, celcius
    const yellowing = { temp: 161.8, time: "3:15" };
    const firstCrack = { temp: 201.8, time: "7:23" };
    const drop = { temp: 209.6, time: "09:06" }; // end temp and total time

    const totalSeconds = toSeconds(drop.time);

    const dryingSeconds = toSeconds(yellowing.time);
    const roastingSeconds = toSeconds(firstCrack.time) - toSeconds(yellowing.time);
    const developingSeconds = totalSeconds - toSeconds(firstCrack.time);

    const dryingPercentage = (100 * dryingSeconds / totalSeconds).toFixed();
    const roastingPercentage = (100 * roastingSeconds / totalSeconds).toFixed();
    const developingPercentage =
        (100 * developingSeconds / totalSeconds).toFixed();

    return (
        <div className="flex h-[6in] w-[4in] flex-col gap-2 overflow-hidden bg-white p-[0.2in] text-black">
            <div className="">
                <div className="text-2xl font-black leading-none tracking-tight">
                    {bean.specifications?.["country"]}
                </div>

                <div className="mt-1 text-[9px] font-bold uppercase tracking-widest">
                    {bean.specifications?.["local region"]}
                    ·
                    {bean.specifications?.["process"]}
                    ·
                    {bean.specifications?.["altitude"]}
                </div>
            </div>

            <div className="border-y border-black p-2 text-center text-xl font-black leading-none">
                WHOLE BEANS
                <br />
                Roasted{" "}
                {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </div>

            <BeanChart beans={[bean]} />

            <div className="grid grid-cols-4 border-y border-black py-2 text-center">
                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">In</div>
                    <div className="mt-1 text-xs font-black">{inWeight}g</div>
                </div>

                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Out</div>
                    <div className="mt-1 text-xs font-black">{outWeight}g</div>
                </div>

                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Yield</div>
                    <div className="mt-1 text-xs font-black">
                        {(yieldPercentage * 100).toFixed()}%
                    </div>
                </div>

                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Loss</div>
                    <div className="mt-1 text-xs font-black">
                        {((1 - yieldPercentage) * 100).toFixed()}%
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 border-y border-black py-2 text-center">
                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Drying</div>
                    <div className="mt-1 text-xs font-black">
                        {formatSeconds(dryingSeconds)} · {dryingPercentage}%
                    </div>
                </div>

                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Roasting</div>
                    <div className="mt-1 text-xs font-black">
                        {formatSeconds(roastingSeconds)} · {roastingPercentage}%
                    </div>
                </div>

                <div className="border-r border-gray-400 px-1 last:border-0">
                    <div className="text-[7px] font-bold uppercase">Development</div>
                    <div className="mt-1 text-xs font-black">
                        {formatSeconds(developingSeconds)} · {developingPercentage}%
                    </div>
                </div>
            </div>
        </div>
    );
}
