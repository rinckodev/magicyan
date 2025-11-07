import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { AnySelectMenuBuilder, isAnySelectMenuBuilder } from "./selectmenu";
import { isButtonBuilder } from "./button";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is an {@link ActionRowBuilder}, optionally filtered by component type.
 *
 * This function returns `true` if the value is an `ActionRowBuilder` instance or structurally matches one.
 * You can optionally specify a component type to check whether the row contains components of that type.
 *
 * @param value - The value to check.
 * @param withComponents - (Optional) Filter by component type: `"selects"`, `"buttons"`, or `"inputs"`.
 * @returns `true` if the value is an `ActionRowBuilder`, and optionally contains components of the specified type.
 *
 * @example
 * import type { ActionRowBuilder, ButtonBuilder } from "discord.js";
 *
 * function handle(input: unknown) {
 *   if (isActionRowBuilder(input, "buttons")) {
 *     console.log("Action row with buttons:", input.components.length);
 *   }
 * }
 *
 * @example
 * import type { AnySelectMenuBuilder } from "discord.js";
 *
 * function handleSelectRow(row: unknown) {
 *   if (isActionRowBuilder(row, "selects")) {
 *     console.log("Row contains select menus.");
 *   }
 * }
 */
export function isActionRowBuilder(value: unknown): value is ActionRowBuilder
export function isActionRowBuilder(value: unknown, withComponents: "selects"): value is ActionRowBuilder<AnySelectMenuBuilder>
export function isActionRowBuilder(value: unknown, withComponents: "buttons"): value is ActionRowBuilder<ButtonBuilder> 
export function isActionRowBuilder(value: unknown, withComponent?: string): value is ActionRowBuilder {
    const isActionRow = hasConstructor(value) &&
        value.constructor.name === ActionRowBuilder.name &&
        "components" in value && Array.isArray(value.components);
    
    if (isActionRow && withComponent){
        const guard = 
            withComponent === "selects" ? isAnySelectMenuBuilder :
            isButtonBuilder;
            
        return (value as ActionRowBuilder).components.some(guard)
    }
    return isActionRow;

}