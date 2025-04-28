import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

export interface SeparatorData {
    divider?: boolean;
    large?: boolean;
}

/**
 * Creates a {@link SeparatorBuilder} component with customizable options for visibility and spacing.
 *
 * This function generates a separator that can be configured to either be visible or disabled, 
 * and can have either small or large spacing between components. The default settings are for a 
 * visible separator with small spacing.
 *
 * **Parameters:**
 * - `divider` (optional): If `false`, the separator divider will be disabled and won't be rendered. Default is `true`.
 * - `large` (optional): If `true`, the separator will have a large spacing. Default is `false` (small spacing).
 *
 * @param data - An object containing the optional properties `divider` and `large` to configure the separator.
 * 
 * @returns A {@link SeparatorBuilder} instance with the specified configuration.
 *
 * @example
 * // Creating a separator with default settings (visible and small spacing)
 * const separator = createSeparator();
 *
 * @example
 * // Creating a disabled separator divider (not visible)
 * const separator = createSeparator({ divider: false });
 *
 * @example
 * // Creating a separator with large spacing
 * const separator = createSeparator({ large: true });
 */
export function createSeparator(data: SeparatorData = {}){
    return new SeparatorBuilder({
        divider: data.divider,
        spacing: data.large 
            ? SeparatorSpacingSize.Large
            : SeparatorSpacingSize.Small
    });
}