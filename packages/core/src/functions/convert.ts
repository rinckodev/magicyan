type Color = `#${string}` | string;

/**
 * Converts a hexadecimal color string to its numeric RGB representation.
 *
 * @param color - A hexadecimal color string (e.g., `"#FFFFFF"`) or a plain string representing a hex value.
 * @returns A number representing the RGB value parsed from the hexadecimal string.
 *
 * @example
 * hexToRgb("#FFFFFF");
 * // Returns: 16777215
 *
 * @example
 * hexToRgb("000000");
 * // Returns: 0
 *
 * @example
 * hexToRgb("#FF5733");
 * // Returns: 16724755
 *
 */
export function hexToRgb(color: Color): number{
    return Number.parseInt(color.startsWith("#") ? color.slice(1) : color, 16)
}

/**
 * Converts a numeric RGB value to its hexadecimal color string representation.
 *
 * @param rgb - The numeric RGB value to convert.
 * @param includeHash - Whether to prefix the result with `#`. Defaults to `true`.
 * @returns A hexadecimal color string representing the RGB value, optionally prefixed with `#`.
 *
 * @example
 * rgbToHex(16777215);
 * // Returns: "#ffffff"
 *
 * @example
 * rgbToHex(0, false);
 * // Returns: "000000"
 *
 * @example
 * rgbToHex(16724755);
 * // Returns: "#ff5733"
 */
export function rgbToHex(rgb: number, includeHash: boolean = true): string {
    const hexValue = rgb.toString(16);
    const hexColor = hexValue.padStart(6, "0");
    return includeHash ? `#${hexColor}` : hexColor;
}