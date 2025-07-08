import { isDefined } from "@magicyan/core";

export function hasConstructor(value: unknown): value is { constructor: Function } {
    return typeof value === "object" &&
        isDefined(value) && 
        "constructor" in value &&
        typeof value.constructor?.name === "string"
}