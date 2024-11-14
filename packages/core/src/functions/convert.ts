type Color = `#${string}` | string;

/**
 * Converts a hexadecimal color string to a numeric RGB representation.
 * 
 * @param color - The hexadecimal color string (with or without `#`).
 * @returns The RGB color as a number.
 *
 * @example
 * ```ts
 * const rgb = hexToRgb("#FF5733");
 * console.log(rgb); // Output: 16724755
 *
 * const rgbNoHash = hexToRgb("FF5733");
 * console.log(rgbNoHash); // Output: 16724755
 * ```
 */
export function hexToRgb(color: Color): number{
    return Number.parseInt(color.startsWith("#") ? color.slice(1) : color, 16)
}
/**
 * Converts an RGB color value to a hexadecimal string.
 *
 * @param rgb - The RGB color value as a number.
 * @param includeHash - Whether to include the `#` prefix in the returned hexadecimal string. Default is `true`.
 * @returns The hexadecimal color string, optionally prefixed with `#`.
 *
 * @example
 * ```ts
 * const hexColor = rgbToHex(16724755);
 * console.log(hexColor); // Output: "#ff5733"
 *
 * const hexColorWithoutHash = rgbToHex(16724755, false);
 * console.log(hexColorWithoutHash); // Output: "ff5733"
 * ```
 */
export function rgbToHex(rgb: number, includeHash: boolean = true): string {
    const hexValue = rgb.toString(16);
    const hexColor = `${"0".repeat(6 - hexValue.length)}${hexValue}`;
    return includeHash ? `#${hexColor}` : hexColor;
}