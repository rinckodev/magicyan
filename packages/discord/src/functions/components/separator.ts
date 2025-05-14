import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

export interface SeparatorData {
    divider?: boolean;
    large?: boolean;
}

/**
 * Creates a {@link SeparatorBuilder} component with configurable visibility and spacing.
 *
 * This function generates a separator component that can be customized for:
 * - Visibility (`divider`: whether the visual divider line is shown).
 * - Spacing (`large`: whether to use large or small spacing).
 *
 * It accepts parameters in two formats:
 *
 * **1. As an object:**
 * @param data - An optional object with the following properties:
 * - `divider` (boolean, optional): Whether the divider is visible. Defaults to `true`.
 * - `large` (boolean, optional): Whether to use large spacing. Defaults to `false`.
 *
 * **2. As positional arguments:**
 * @param large - Whether to use large spacing. Defaults to `false`.
 * @param divider - Whether the divider is visible. Defaults to `true`.
 *
 * @returns A {@link SeparatorBuilder} instance with the specified configuration.
 *
 * @example
 * // Using object syntax with default options
 * const separator = createSeparator(); 
 *
 * @example
 * // Using object syntax to disable the divider and enable large spacing
 * const separator = createSeparator({ divider: false, large: true });
 *
 * @example
 * // Using positional arguments: large spacing, visible divider
 * const separator = createSeparator(true, true);
 *
 * @example
 * // Using positional arguments: small spacing, hidden divider
 * const separator = createSeparator(false, false);
 */
export function createSeparator(large?: boolean, divider?: boolean): SeparatorBuilder
export function createSeparator(data?: SeparatorData): SeparatorBuilder
export function createSeparator(argA?: SeparatorData | boolean, argB?: boolean): SeparatorBuilder{
    const [large, divider] = typeof argA === "object" 
        ? [argA.large, argA.divider] 
        : [argA, argB];
    return new SeparatorBuilder({
        divider: divider,
        spacing: large 
            ? SeparatorSpacingSize.Large
            : SeparatorSpacingSize.Small
    });
}