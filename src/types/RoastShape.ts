// const formatAction = (type: string, setting: number) => {
//     if (type == 'Power') {
//         return `P${setting}`;
//     } else if (type == 'Blower') {
//         return `F${setting}`;
//     }
//     return `D${setting}`; // drum never changes
// };

export interface ActionShape {
    type: string;
    second: number;
    setting: number;
}

export default interface RoastShape {
    uid: string;
    beanName: string; // NOTE: SKU on RoastWorld
    roastName: string;
    dateTime: Date;
    updatedAt: Date;
    weightGreen: number;
    weightRoasted: number;
    totalRoastTime: number;
    preheatTemperature: number;
    beanChargeTemperature: number;
    drumChargeTemperature: number;
    beanTemperature: number[];
    ibtsTemperature: number[];
    beanDerivative: number[];
    ibtsDerivative: number[];
    differentialAirPressure: number[];
    actions: ActionShape[];
    humidity: number;
    ambient: number;
    ibtsAmbientTemp: number;
    atmosphericPressure: number;
    indexYellowingStart: number;
    indexFirstCrackStart: number;
}