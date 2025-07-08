import { ButtonBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link ButtonBuilder}.
 *
 * This function returns `true` if the value is an instance of `ButtonBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `ButtonBuilder`, otherwise `false`.
 *
 * @example
 * import { ButtonBuilder } from "discord.js";
 * 
 * function handle(input: ButtonBuilder | unknown) {
 *   if (isButtonBuilder(input)) {
 *     input.setLabel("Click me!");
 *   }
 * }
 */
export function isButtonBuilder(value: unknown): value is ButtonBuilder {
    return value instanceof ButtonBuilder || 
        hasConstructor(value) &&
        value.constructor.name === ButtonBuilder.name;
}