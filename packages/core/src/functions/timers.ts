import { setTimeout as sleep } from "node:timers/promises";

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