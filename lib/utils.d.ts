export { generateHOTP, getCounterFromTime };
declare function generateHOTP({ key, counter }: {
    key: string;
    counter?: number;
}): string;
declare function getCounterFromTime({ now, timeStep }: {
    now: number;
    timeStep: number;
}): number;
