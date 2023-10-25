export { setTimeout as sleep } from "node:timers/promises";

interface CreateIntervalOptions {
    time: number,
    run(stop: () => void): void
}
export function createInterval({ time, run }: CreateIntervalOptions){
    const timer = setInterval(() => {
        run(createStopInterval(timer));
    }, time);
    return { timer, stop: createStopInterval(timer) };
}

function createStopInterval(timer: NodeJS.Timeout){
    return () => clearInterval(timer);
}