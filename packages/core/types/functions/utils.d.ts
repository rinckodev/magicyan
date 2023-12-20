/**
 * @param value Initial value
 * @param or Alt value
 * @returns Return alt value if initial value is nullable
 */
export declare function orValue<V>(value: V | null | undefined, or: NonNullable<V>): V;
