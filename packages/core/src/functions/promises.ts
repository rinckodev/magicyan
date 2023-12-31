export { setTimeout as sleep } from "node:timers/promises";

interface CreateIntervalOptions {
    time: number,
    run(stop: () => void): void
}
export function createInterval(options: CreateIntervalOptions){
    const { time, run } = options;
    const timer = setInterval(() => {
        run(() => clearInterval(timer));
    }, time);
    return { timer, stop: () => clearInterval(timer) };
}