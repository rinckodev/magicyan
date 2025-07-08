import { ContainerBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link ContainerBuilder}.
 *
 * This function returns `true` if the value is an instance of `ContainerBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `ContainerBuilder`, otherwise `false`.
 *
 * @example
 * import { ContainerBuilder } from "discord.js";
 * 
 * function handle(input: ContainerBuilder | unknown) {
 *   if (isContainerBuilder(input)) {
 *     input.setAccentColor(0x2ecc71);
 *   }
 * }
 */
export function isContainerBuilder(value: unknown): value is ContainerBuilder {
  return value instanceof ContainerBuilder ||
    (hasConstructor(value) && value.constructor.name === ContainerBuilder.name);
}
