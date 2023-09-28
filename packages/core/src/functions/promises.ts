export { setTimeout as sleep } from "node:timers/promises";

interface CreateIntervalOptions {
    time: number,
    run(stop: () => void): void
}
export function createInterval({ time, run }: CreateIntervalOptions){
    const timer = setInterval(() => {
        function stop(){
            clearInterval(timer)
        }
        run(stop);
    }, time)
}