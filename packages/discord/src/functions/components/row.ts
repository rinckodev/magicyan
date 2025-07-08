import { type AnyComponentBuilder, ActionRowBuilder } from "discord.js";

/**
 * Creates an {@link ActionRowBuilder} containing one or more UI components.
 *
 * This function accepts individual components or arrays of components, flattens them,
 * and returns an action row builder suitable for use in Discord messages.
 * It's designed to support any component builder type that extends {@link AnyComponentBuilder}.
 *
 * ---
 * While this function supports any valid message component (such as buttons, select menus, etc.),
 * the examples below demonstrate common use cases using {@link ButtonBuilder} and {@link StringSelectMenuBuilder}.
 *
 * @typeParam Component - A type extending {@link AnyComponentBuilder}, such as a button or select menu builder.
 *
 * @param components - A variadic list of component instances or arrays of component instances to include in the row.
 *
 * @returns An {@link ActionRowBuilder} instance containing all provided components.
 *
 * @example
 * // Create a row with two buttons
 * const row = createRow(
 *     new ButtonBuilder({ customId: "a", label: "A", style: ButtonStyle.Success }),
 *     new ButtonBuilder({ customId: "b", label: "B", style: ButtonStyle.Primary }),
 *     new ButtonBuilder({ customId: "c", label: "C", style: ButtonStyle.Danger })
 * );
 *
 * @example
 * // Create a row with a string select menu
 * const row = createRow(
 *     new StringSelectMenuBuilder({
 *         customId: "choose",
 *         placeholder: "Make a selection",
 *         options: [
 *             { label: "Option 1", value: "opt1" },
 *             { label: "Option 2", value: "opt2" },
 *             { label: "Option 3", value: "opt3" },
 *         ]
 *     })
 * );
 */
export function createRow<Component extends AnyComponentBuilder>(
    ...components: (Component | Component[])[]
): ActionRowBuilder<Component> {
    return new ActionRowBuilder<Component>({ 
        components: components.flat()
    });
}