/// <reference types="node" />
export { setTimeout as sleep } from "node:timers/promises";
interface CreateIntervalOptions {
    time: number;
    run(stop: () => void): void;
}
export declare function createInterval({ time, run }: CreateIntervalOptions): {
    timer: NodeJS.Timeout;
    stop: () => void;
};
