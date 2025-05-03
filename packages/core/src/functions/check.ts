/**
 * Compares two strings for equality, ignoring case sensitivity.
 *
 * @param text1 - The first string to compare.
 * @param text2 - The second string to compare.
 * @returns `true` if the strings are equal when compared in lowercase, otherwise `false`.
 *
 * @example
 * equalsIgnoreCase("Hello", "hello");
 * // Returns: true
 *
 * @example
 * equalsIgnoreCase("World", "WORLD");
 * // Returns: true
 *
 * @example
 * equalsIgnoreCase("Test", "Toast");
 * // Returns: false
 */
export function equalsIgnoreCase(text1: string, text2: string): boolean {
    return text1.toLowerCase() === text2.toLowerCase();
}

/**
 * Checks if a string contains a given query, ignoring case sensitivity.
 *
 * @param text - The string to search within.
 * @param query - The substring to search for.
 * @returns `true` if `query` is found within `text` when both are compared in lowercase, otherwise `false`.
 *
 * @example
 * includesIgnoreCase("Hello World", "world");
 * // Returns: true
 *
 * @example
 * includesIgnoreCase("Programming", "GRAM");
 * // Returns: true
 *
 * @example
 * includesIgnoreCase("TypeScript", "Java");
 * // Returns: false
 */

export function includesIgnoreCase(text: string, query: string): boolean {
    return text.toLowerCase().includes(query.toLowerCase());
}