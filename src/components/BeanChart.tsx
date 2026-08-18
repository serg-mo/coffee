import React from "react";
import RadarChart from "./RadarChart";

export default function BeanChart({ beanData }: { beanData: any }) { 
    // this breaks if I try to make local variables
    const getChartData = (key) => ({
        labels: Object.keys(Object.values(beanData)[0]?.[key] || {}),
        datasets: Object.entries(beanData).map(([label, data]) => ({
            label,
            data: Object.values(data[key]),
            backgroundColor: `rgba(217, 119, 6, 0.30)`, // same opacity works best
            borderWidth: 0,
        })),
    });


    return (<div className="w-full flex flex-row justify-between items-center m-auto">
        <div className="w-1/2">
            <RadarChart data={getChartData("attributes")} max={7} />
        </div>
        <div className="w-1/2">
            <RadarChart data={getChartData("flavors")} max={4} />
        </div>
    </div>
)
}