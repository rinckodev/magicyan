export { setTimeout as sleep } from "node:timers/promises";

interface CreateIntervalOptions {
    time: number;
    run(stop: () => void): void;
}
export function createInterval(options: CreateIntervalOptions){
    const { time, run } = options;
    const timer = setInterval(() => {
        run(() => clearInterval(timer));
    }, time);
    return { timer, stop: () => clearInterval(timer) };
}

interface CreateTimeoutOptions {
    time: number;
    run(): void;
}
export function createTimeout(options: CreateTimeoutOptions){
    const { time, run } = options;
    const timer = setTimeout(() => run(), time);
    return { timer, stop: () => clearTimeout(timer) };
}

interface CreateLoopIntervalOptions<T> {
    array: T[]
    time: number;
    run(value: T, stop: () => void, lap: number, array: T[]): void;
}
export function createLoopInterval<T>(options: CreateLoopIntervalOptions<T>){
    const { run, time, array } = options;
    let lap = 0;
    let loop = 0;
    return createInterval({
        time, run(stop) {
            if (loop === array.length){
                lap++; 
                loop=0; 
            }
            run(array[loop], stop, lap, array);
            loop++;
        },
    });
}