import { TextDisplayBuilder } from "discord.js";

/**
 * Creates a {@link TextDisplayBuilder} with the given content and optional ID.
 *
 * This function simplifies the creation of text display components for a container,
 * allowing you to set the text content and optionally assign a custom ID.
 *
 * @param content - The text content to display.
 * @param id - An optional numeric ID for the text component.
 * 
 * @returns A new {@link TextDisplayBuilder} instance containing the provided content and ID.
 * 
 * @example
 * // Creating a simple text display component
 * const textDisplay = createTextDisplay("Hello World!");
 * 
 * @example
 * // Creating a text display component with a custom ID
 * const textDisplay = createTextDisplay("Welcome!", 123);
 */
export function createTextDisplay(content: string, id?: number){
    return new TextDisplayBuilder({
        content, id
    });
}