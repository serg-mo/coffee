export default interface RoastShape {
    uid: string;
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
    actions: Object[]; // { type: 'Power', second: 5, setting: 6 },
    humidity: number;
    ambient: number;
    ibtsAmbientTemp: number;
    atmosphericPressure: number;
    indexYellowingStart: number;
    indexFirstCrackStart: number;
}