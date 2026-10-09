export default interface RoastShape {
    weightGreen: number;
    weightRoasted: number;
    yellow: {
        temp: number;
        time: string;
    };
    firstCrack: {
        temp: number | null;
        time: string | null;
    };
    drop: {
        temp: number;
        time: string;
    };
    dateTime: Date;
}