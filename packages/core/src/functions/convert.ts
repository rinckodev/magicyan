type Color = `#${string}` | string;

/**
 * Converts a hexadecimal color string to an RGB number.
 *
 * @param {string} color - The hexadecimal color string.
 * @returns {number} The RGB number representation of the color.
 * 
 */
export function hexToRgb(color: Color): number{
    if (color.startsWith("#")){
        return parseInt(color.slice(1), 16);
    }
    return parseInt(color, 16);
}
/**
 * Converts an RGB number to a hexadecimal color string.
 *
 * @param {number} rgb - The RGB number.
 * @param {boolean} includeHash - Whether to include '#' in the output. Default is true.
 * @returns {string} The hexadecimal color string.
 */
export function rgbToHex(rgb: number, includeHash: boolean = true): string {
    const hexValue = rgb.toString(16);
    const hexColor = `${"0".repeat(6 - hexValue.length)}${hexValue}`;
    return includeHash ? `#${hexColor}` : hexColor;
}