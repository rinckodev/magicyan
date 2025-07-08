import { TextInputBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link TextInputBuilder}.
 *
 * This function returns `true` if the value is an instance of `TextInputBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `TextInputBuilder`, otherwise `false`.
 *
 * @example
 * import { TextInputBuilder } from "discord.js";
 * 
 * function handle(input: TextInputBuilder | unknown) {
 *   if (isTextInputBuilder(input)) {
 *     console.log("TextInputBuilder value:", input.data.value);
 *   }
 * }
 */
export function isTextInputBuilder(value: unknown): value is TextInputBuilder {
  return value instanceof TextInputBuilder ||
    (hasConstructor(value) && value.constructor.name === TextInputBuilder.name);
}
