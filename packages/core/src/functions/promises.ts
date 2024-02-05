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