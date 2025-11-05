export type DateUnit =
    | "days"
    | "hours"
    | "minutes"
    | "seconds"
    | "milliseconds"
    | "months"
    | "years";

export interface DatePlus extends Date {
    /**
     * Adds a value to a specific unit of the date.
     * @param unit Time unit to add to (`days`, `hours`, `minutes`, `seconds`, `milliseconds`, `months`, `years`).
     * @param value Amount to add (can be negative or fractional, e.g., 1.5 days).
     * @returns The same `DatePlus` instance (supports method chaining).
     * 
     * @example
     * const d = new DatePlus("2025-01-01");
     * d.add("days", 5); // adds 5 days
     * @example
     * d.add("hours", 12); // adds 12 hours
     */
    add(unit: DateUnit, value: number): this;
    /**
     * Subtracts a value from a specific unit of the date.
     * @param unit Time unit to subtract from (`days`, `hours`, `minutes`, `seconds`, `milliseconds`, `months`, `years`).
     * @param value Amount to subtract.
     * @returns The same `DatePlus` instance (supports method chaining).
     * 
     * @example
     * const d = new DatePlus("2025-01-10");
     * d.sub("days", 3); // subtracts 3 days
     * @example
     * d.sub("hours", 5); // subtracts 5 hours
     */
    sub(unit: DateUnit, value: number): this;
    /**
     * Sets a specific unit of the date to an absolute value.
     * @param unit Time unit to set (`days`, `hours`, `minutes`, `seconds`, `milliseconds`, `months`, `years`).
     * @param value New value for the specified unit.
     * @returns The same `DatePlus` instance (supports method chaining).
     * 
     * @example
     * const d = new DatePlus("2025-01-01");
     * d.set("hours", 15); // sets the hour to 15
     * @example
     * d.set("days", 10); // sets the day of the month to 10
     */
    set(unit: DateUnit, value: number): this;
    /**
     * Creates a clone of the current `DatePlus` instance.
     * @returns A new `DatePlus` instance with the same date/time.
     * 
     * @example
     * const d1 = new DatePlus("2025-01-01");
     * const d2 = d1.clone();
     * @example
     * d2.add("days", 5); // d1 remains unchanged
     */
    clone(): DatePlus;
    /**
     * Calculates the difference between this date and another date.
     * @param other The other `Date` or `DatePlus` instance to compare against.
     * @param unit Unit to return the difference in (`milliseconds` by default).
     * @returns The difference between the two dates in the specified unit.
     * 
     * @example
     * const d1 = new DatePlus("2025-01-01");
     * const d2 = new DatePlus("2025-01-10");
     * console.log(d2.diff(d1, "days")); // 9
     * @example
     * console.log(d2.diff(d1, "milliseconds")); // 777600000
     */
    diff(other: Date | DatePlus, unit?: DateUnit): number;
}
/**
 * Helper function to create a `DatePlus` instance.
 * @param date Optional initial date (`string`, `number`, or `Date`). Defaults to current date/time.
 * @returns A new `DatePlus` instance.
 * 
 * @example
 * const d = createDate("2025-01-01");
 * @example
 * const now = createDate(); // current date/time
 */
export function createDate(date?: string | number | Date): DatePlus {
    const _date = new Date(date ?? Date.now());

    return Object.assign(_date, {
        add(unit: DateUnit, value: number) {
            switch (unit) {
                case "days":
                    _date.setDate(_date.getDate() + value);
                    break;
                case "hours":
                    _date.setHours(_date.getHours() + value);
                    break;
                case "minutes":
                    _date.setMinutes(_date.getMinutes() + value);
                    break;
                case "seconds":
                    _date.setSeconds(_date.getSeconds() + value);
                    break;
                case "milliseconds":
                    _date.setMilliseconds(_date.getMilliseconds() + value);
                    break;
                case "months":
                    _date.setMonth(_date.getMonth() + value);
                    break;
                case "years":
                    _date.setFullYear(_date.getFullYear() + value);
                    break;
            }
            return this;
        },
        sub(unit: DateUnit, value: number) {
            return this.add(unit, -value);
        },
        set(unit: DateUnit, value: number) {
            switch (unit) {
                case "days":
                    _date.setDate(value);
                    break;
                case "hours":
                    _date.setHours(value);
                    break;
                case "minutes":
                    _date.setMinutes(value);
                    break;
                case "seconds":
                    _date.setSeconds(value);
                    break;
                case "milliseconds":
                    _date.setMilliseconds(value);
                    break;
                case "months":
                    _date.setMonth(value);
                    break;
                case "years":
                    _date.setFullYear(value);
                    break;
            }
            return this;
        },
        diff(other: Date | DatePlus, unit: DateUnit = "milliseconds") {
            const msDiff = Math.abs(_date.getTime() - other.getTime());

            switch (unit) {
                case "milliseconds":
                    return msDiff;
                case "seconds":
                    return Math.floor(msDiff / 1000);
                case "minutes":
                    return Math.floor(msDiff / (1000 * 60));
                case "hours":
                    return Math.floor(msDiff / (1000 * 60 * 60));
                case "days":
                    return Math.floor(msDiff / (1000 * 60 * 60 * 24));
                case "months": {
                    const years = _date.getFullYear() - other.getFullYear();
                    const months = _date.getMonth() - other.getMonth();
                    return Math.abs(years * 12 + months);
                }
                case "years":
                    return Math.abs(_date.getFullYear() - other.getFullYear());
            }
        },
        clone(){
            return createDate(_date.getTime());
        }
    }) as DatePlus;
}