import { FileBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link FileBuilder}.
 *
 * This function returns `true` if the value is an instance of `FileBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `FileBuilder`, otherwise `false`.
 *
 * @example
 * import type { FileBuilder } from "discord.js";
 * 
 * function handle(input: FileBuilder | unknown) {
 *   if (FileBuilder(input)) {
 *     input.setURL("https://example.com/image.png");
 *   }
 * }
 */
export function isFileBuilder(value: unknown): value is FileBuilder {
  return value instanceof FileBuilder ||
    (hasConstructor(value) && value.constructor.name === FileBuilder.name);
}