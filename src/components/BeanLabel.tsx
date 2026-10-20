import React from "react";
import BeanShape from "types/BeanShape";
import BeanChart from "./BeanChart";
import RoastShape from "types/RoastShape";
import BeanRoast from "./BeanRoast";
import moment from "moment";

export default function BeanLabel({
  bean,
  roast,
}: {
  bean: BeanShape;
  roast: RoastShape;
}) {
  return (
    <div className="h-[6in] w-[4in] overflow-hidden flex flex-col gap-2 p-2 rounded border border-gray-200 text-black">
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
        Roasted {moment(roast.dateTime).format("MMM D, YYYY")}
      </div>

      <BeanChart beans={[bean]} />

      <BeanRoast roast={roast} />
    </div>
  );
}
