import { TextDisplayBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link TextDisplayBuilder}.
 *
 * This function returns `true` if the value is an instance of `TextDisplayBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `TextDisplayBuilder`, otherwise `false`.
 *
 * @example
 * import type { TextDisplayBuilder } from "discord.js";
 * 
 * function handle(input: TextDisplayBuilder | unknown) {
 *   if (isTextDisplayBuilder(input)) {
 *     console.log("TextDisplayBuilder content:", input.data.content);
 *   }
 * }
 */
export function isTextDisplayBuilder(value: unknown): value is TextDisplayBuilder {
  return value instanceof TextDisplayBuilder ||
    (hasConstructor(value) && value.constructor.name === TextDisplayBuilder.name);
}
