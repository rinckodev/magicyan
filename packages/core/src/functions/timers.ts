import { setTimeout as setSleep } from "node:timers/promises";
import { withProperties } from "./with";

type SetTimeoutFunction = (delay: number) => Promise<void>;

interface SleepTimes {
    seconds: SetTimeoutFunction;
    minutes: SetTimeoutFunction;
}

type Sleep = SetTimeoutFunction & SleepTimes;

export const sleep: Sleep = withProperties<SetTimeoutFunction, SleepTimes>(
    time => setSleep(time), 
    {
        seconds: time => setSleep(time * 1000),
        minutes: time => setSleep(time * 1000 * 60)
    }
);

interface CreateIntervalOptions {
    time: number;
    immediately?: boolean;
    run(stop: () => void): void;
}
export function createInterval(options: CreateIntervalOptions){
    const { time, run, immediately } = options;

    if (immediately) run(() => {});

    const timer = setInterval(() => {
        run(() => clearInterval(timer));
    }, time);

    return { timer, stop: () => clearInterval(timer) };
}

interface CreateTimeoutOptions {
    delay: number;
    run(): void;
}
export function createTimeout(options: CreateTimeoutOptions){
    const { delay, run } = options;
    const timer = setTimeout(() => run(), delay);
    return { timer, stop: () => clearTimeout(timer) };
}

interface CreateLoopIntervalOptions<T> {
    array: T[]
    time: number;
    immediately?: boolean;
    run(value: T, stop: () => void, lap: number, array: T[]): void;
}
export function createLoopInterval<T>(options: CreateLoopIntervalOptions<T>){
    const { run, time, array, immediately } = options;
    let lap = 0;
    let loop = 0;
    return createInterval({
        immediately, time, 
        run(stop) {
            if (loop === array.length){
                lap++; 
                loop=0; 
            }
            run(array[loop], stop, lap, array);
            loop++;
        },
    });
}