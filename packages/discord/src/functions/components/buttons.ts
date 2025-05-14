import { type LinkButtonComponentData, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { createRow } from "./row";

interface CreateLinkButtonData extends Omit<LinkButtonComponentData, "style" | "type"> {}
export function createLinkButton(data: CreateLinkButtonData){
    data.label??=data.url;
    return new ButtonBuilder({ style: ButtonStyle.Link, ...data });
}

/**
 * Wraps buttons into multiple {@link ActionRowBuilder} instances with a maximum number of buttons per row.
 *
 * This function takes a list of {@link ButtonBuilder} instances (or arrays of them) and groups them into 
 * multiple `ActionRowBuilder<ButtonBuilder>` objects, ensuring that each row contains no more than the specified 
 * number of buttons.
 *
 * @param maxItemsPerRow - The maximum number of buttons to include in each row.
 * @param buttons - A variadic list of {@link ButtonBuilder} instances or arrays of them to be wrapped.
 *
 * @returns An array of {@link ActionRowBuilder} instances, each containing up to `maxItemsPerRow` buttons.
 *
 * @example
 * const button1 = new ButtonBuilder().setLabel("A").setCustomId("a").setStyle(ButtonStyle.Primary);
 * const button2 = new ButtonBuilder().setLabel("B").setCustomId("b").setStyle(ButtonStyle.Primary);
 * const button3 = new ButtonBuilder().setLabel("C").setCustomId("c").setStyle(ButtonStyle.Primary);
 *
 * const rows = wrapButtons(2, button1, button2, button3);
 * // Result: Two rows, the first with [button1, button2], the second with [button3]
 */
export function wrapButtons(
    maxItemsPerRow: number, 
    ...buttons: (ButtonBuilder | ButtonBuilder[])[]
): ActionRowBuilder<ButtonBuilder>[] {
    const items = buttons.flat();
    const result: ActionRowBuilder<ButtonBuilder>[] = [];

    for (let index = 0; index < items.length; index += maxItemsPerRow) {
        result.push(createRow(
            items.slice(index, index + maxItemsPerRow)
        ));        
    }
    return result;
}
