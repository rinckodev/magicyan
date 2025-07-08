import { Message } from "discord.js";
import { hasConstructor } from "./utils";

/**
 * Checks whether the given value is a {@link Message}.
 *
 * This function returns `true` if the value is an instance of `Message`
 * or if it structurally resembles a `Message` object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `Message`, otherwise `false`.
 *
 * @example
 * import type { Message, Interaction } from "discord.js";
 * 
 * function handle(input: Message | Interaction | unknown) {
 *   if (isMessage(input)) {
 *     console.log("This is a message with ID:", input.id);
 *   }
 * }
 */
export function isMessage(value: unknown): value is Message {
    if (value instanceof Message){
        return true;
    };

    if (
        hasConstructor(value) &&
        value.constructor.name === Message.name &&
        "id" in value &&
        "toJSON" in value &&
        typeof value.toJSON === "function"
    ) {
        const json = value.toJSON();
        return typeof json === "object" && 
            json !== null && 
            "id" in json && 
            json.id === value.id;
    }

    return false;
}