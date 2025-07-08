import { ModalBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link ModalBuilder}.
 *
 * This function returns `true` if the value is an instance of `ModalBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `ModalBuilder`, otherwise `false`.
 *
 * @example
 * import type { ModalBuilder } from "discord.js";
 * 
 * function handle(input: ModalBuilder | unknown) {
 *   if (isModalBuilder(input)) {
 *     input.setTitle("User Feedback");
 *   }
 * }
 */
export function isModalBuilder(value: unknown): value is ModalBuilder {
  return value instanceof ModalBuilder ||
    (hasConstructor(value) && value.constructor.name === ModalBuilder.name);
}
