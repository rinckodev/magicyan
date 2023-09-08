export declare function equalsIgnoreCase(text1: string, text2: string): boolean;

type Color = `#${string}` | string;
export declare function hexToRgb(color: Color): number;
export {};

export declare function brBuilder(...text: string[]): string;
export declare function toNull(): null;
export declare function notFound<T>(value: T): NonNullable<T> | undefined;
export declare function textReplacer<R extends Record<string, any>>(text: string, replaces: R): string;

export declare function randomNumber(min: number, max: number): number;
export { setTimeout as sleep } from "node:timers/promises";