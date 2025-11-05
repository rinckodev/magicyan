import { withProperties } from "./with";

type TimeUnit = "seconds" | "minutes" | "hours" | "days";

const timeUnits = Object.freeze({
    seconds: (value: number) => value * 1000,
    minutes: (value: number) => timeUnits.seconds(value * 60),
    hours: (value: number) => timeUnits.minutes(value * 60),
    days: (value: number) => timeUnits.hours(value * 24),
});

function toMsFunc(value: number, unit: TimeUnit = "seconds"){
    return timeUnits [unit](value);
}

/**
 * Converts a numeric value from a specified time unit into milliseconds.
 *
 * @param value - The numeric value to convert.
 * @param unit - The unit of time for the value. Defaults to `"seconds"`.
 *               Can be `"seconds"`, `"minutes"`, `"hours"`, or `"days"`.
 * @returns The equivalent time in milliseconds.
 *
 * @example
 * toMs(5, "seconds");
 * // Returns: 5000
 *
 * @example
 * toMs(2, "minutes");
 * // Returns: 120000
 *
 * @example
 * toMs(1.5, "hours");
 * // Returns: 5400000
 *
 * @example
 * toMs(1, "days");
 * // Returns: 86400000
 *
 * @example
 * toMs(30); // Defaults to seconds
 * // Returns: 30000
 */
export const toMs = withProperties(toMsFunc, timeUnits);