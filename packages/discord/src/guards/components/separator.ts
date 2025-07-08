import { SeparatorBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link SeparatorBuilder}.
 *
 * This function returns `true` if the value is an instance of `SeparatorBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `SeparatorBuilder`, otherwise `false`.
 *
 * @example
 * import { SeparatorBuilder } from "discord.js";
 * 
 * function handle(input: SeparatorBuilder | unknown) {
 *   if (isSeparatorBuilder(input)) {
 *     console.log("SeparatorBuilder detected");
 *     input.setDivider(false);
 *   }
 * }
 */
export function isSeparatorBuilder(value: unknown): value is SeparatorBuilder {
  return value instanceof SeparatorBuilder ||
    (hasConstructor(value) && value.constructor.name === SeparatorBuilder.name);
}