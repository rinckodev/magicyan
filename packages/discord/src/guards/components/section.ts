import { SectionBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link SectionBuilder}.
 *
 * This function returns `true` if the value is an instance of `SectionBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `SectionBuilder`, otherwise `false`.
 *
 * @example
 * import type { SectionBuilder } from "discord.js";
 * 
 * function handle(input: SectionBuilder | unknown) {
 *   if (isSectionBuilder(input)) {
 *     console.log("SectionBuilder accessory:", input.accessory);
 *   }
 * }
 */
export function isSectionBuilder(value: unknown): value is SectionBuilder {
  return value instanceof SectionBuilder ||
    (hasConstructor(value) && value.constructor.name === SectionBuilder.name);
}
