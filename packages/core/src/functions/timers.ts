import { setTimeout as setSleep } from "node:timers/promises";

type SetTimeoutFunction = (delay: number) => Promise<void>;

type Sleep = SetTimeoutFunction & {
    seconds: SetTimeoutFunction;
    minutes: SetTimeoutFunction;
}

/**
 * ```ts
 * await sleep(100); // wait 100 ms
 * await sleep.seconds(5); // wait 5000 ms
 * await sleep.minutes(2); // wait 120000 ms
 * ```
 */
// const sleep: Sleep = Object.assign(setSleep, {
//     seconds: (time) => setSleep(time * 1000),
//     minutes: (time) => setSleep(time * 1000 * 60),
// } satisfies Record<string, SetTimeoutFunction>);
const sleep: Sleep = time => setSleep(time);

sleep.seconds = time => setSleep(time * 1000);
sleep.minutes = time => setSleep(time * 1000 * 60);

export { sleep };

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