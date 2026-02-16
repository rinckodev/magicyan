import { setTimeout as setSleep } from "node:timers/promises";
import type { FunctionLike } from "../@types/function";
import { withProperties } from "./with.js";

type ResolveSleepValue<V> = V extends FunctionLike
    ? ReturnType<V>
    : V;

async function baseSleep<V>(time: number, value?: V): Promise<ResolveSleepValue<V>> {
    await setSleep(time);
    return typeof value === "function"
        ? value()
        : value as ResolveSleepValue<V>;
}

export const sleep = withProperties(baseSleep, {
    async seconds<V>(time: number, value?: V){
        return sleep(time * 1000, value)
    },
    async minutes<V>(time: number, value?: V){
        return sleep.seconds(time * 60, value);
    },
    async hours<V>(time: number, value?: V){
        return sleep.minutes(time * 60, value)
    }
});