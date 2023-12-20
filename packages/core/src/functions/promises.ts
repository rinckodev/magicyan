export { setTimeout as sleep } from "node:timers/promises";

interface CreateIntervalOptions {
    time: number,
    run(stop: () => void): void
}
export function createInterval({ time, run }: CreateIntervalOptions){
    const timer = setInterval(() => {
        run(() => clearInterval(timer));
    }, time);
    return { timer, stop: () => clearInterval(timer) };
}

interface CreateTimeoutOptions {
    time: number,
    run(repeat: () => void): void
}
export function createTimeout({ time, run }: CreateTimeoutOptions){
    const timer = setTimeout(function(){
        
    }, time)
    // const timer = setTimeout(() => {
    //     run(() => clearInterval(timer));
    // }, time);
    // return { timer, stop: () => clearInterval(timer) };
}