type Color = `#${string}` | string;
/**
 * Converts a hexadecimal color string to an RGB number.
 *
 * @param {string} color - The hexadecimal color string.
 * @returns {number} The RGB number representation of the color.
 *
 */
export declare function hexToRgb(color: Color): number;
/**
 * Converts an RGB number to a hexadecimal color string.
 *
 * @param {number} rgb - The RGB number.
 * @param {boolean} includeHash - Whether to include '#' in the output. Default is true.
 * @returns {string} The hexadecimal color string.
 */
export declare function rgbToHex(rgb: number, includeHash?: boolean): string;
export {};
