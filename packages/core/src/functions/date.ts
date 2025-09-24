export type DateUnit =
    | "days"
    | "hours"
    | "minutes"
    | "seconds"
    | "milliseconds"
    | "months"
    | "years";

export class DatePlus extends Date {
    /**
     * Creates a new `DatePlus` instance.
     * @param date Initial date. Can be a `string`, `number` (timestamp), or `Date`. Defaults to the current date/time.
     * 
     * @example
     * const d1 = new DatePlus(); // now
     * @example
     * const d2 = new DatePlus("2025-01-01"); // specific date
     */
    constructor(date?: string | number | Date) {
        super(date ?? Date.now());
    }
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
    public add(unit: DateUnit, value: number): this {
        switch (unit) {
            case "days":
                this.setDate(this.getDate() + value);
                break;
            case "hours":
                this.setHours(this.getHours() + value);
                break;
            case "minutes":
                this.setMinutes(this.getMinutes() + value);
                break;
            case "seconds":
                this.setSeconds(this.getSeconds() + value);
                break;
            case "milliseconds":
                this.setMilliseconds(this.getMilliseconds() + value);
                break;
            case "months":
                this.setMonth(this.getMonth() + value);
                break;
            case "years":
                this.setFullYear(this.getFullYear() + value);
                break;
        }
        return this;
    }
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
    public sub(unit: DateUnit, value: number): this {
        return this.add(unit, -value);
    }
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
    public set(unit: DateUnit, value: number): this {
        switch (unit) {
            case "days":
                this.setDate(value);
                break;
            case "hours":
                this.setHours(value);
                break;
            case "minutes":
                this.setMinutes(value);
                break;
            case "seconds":
                this.setSeconds(value);
                break;
            case "milliseconds":
                this.setMilliseconds(value);
                break;
            case "months":
                this.setMonth(value);
                break;
            case "years":
                this.setFullYear(value);
                break;
        }
        return this;
    }
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
    public clone(): DatePlus {
        return new DatePlus(this.getTime());
    }
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
    public diff(other: Date | DatePlus, unit: DateUnit = "milliseconds"): number {
        const msDiff = Math.abs(this.getTime() - other.getTime());

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
                const years = this.getFullYear() - other.getFullYear();
                const months = this.getMonth() - other.getMonth();
                return Math.abs(years * 12 + months);
            }
            case "years":
                return Math.abs(this.getFullYear() - other.getFullYear());
        }
    }
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
export function createDate(date?: string | number | Date) {
    return new DatePlus(date);
}