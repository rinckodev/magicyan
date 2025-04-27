import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

export interface SeparatorData {
    disabled?: boolean;
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
 * - `disabled` (optional): If `true`, the separator will be disabled and won't be rendered. Default is `false`.
 * - `large` (optional): If `true`, the separator will have a large spacing. Default is `false` (small spacing).
 *
 * @param data - An object containing the optional properties `disabled` and `large` to configure the separator.
 * 
 * @returns A {@link SeparatorBuilder} instance with the specified configuration.
 *
 * @example
 * // Creating a separator with default settings (visible and small spacing)
 * const separator = createSeparator();
 *
 * @example
 * // Creating a disabled separator (not visible)
 * const separator = createSeparator({ disabled: true });
 *
 * @example
 * // Creating a separator with large spacing
 * const separator = createSeparator({ large: true });
 */
export function createSeparator(data: SeparatorData = {}){
    return new SeparatorBuilder({
        divider: !data.disabled,
        spacing: data.large 
            ? SeparatorSpacingSize.Large
            : SeparatorSpacingSize.Small
    });
}