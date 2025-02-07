/**
 * Compares two strings for equality, ignoring case differences.
 *
 * @param text1 - The first string to compare.
 * @param text2 - The second string to compare.
 * @returns `true` if the strings are equal, ignoring case; otherwise, `false`.
 *
 * @example
 * ```ts
 * const isEqual = equalsIgnoreCase("Hello", "hello");
 * console.log(isEqual); // Output: true
 * 
 * const isNotEqual = equalsIgnoreCase("Hello", "world");
 * console.log(isNotEqual); // Output: false
 * ```
 */
export function equalsIgnoreCase(text1: string, text2: string): boolean {
    return text1.toLowerCase() === text2.toLowerCase();
}

/**
 * Checks if a string contains a specified substring, ignoring case differences.
 *
 * @param text - The string to search within.
 * @param includeText - The substring to search for.
 * @returns `true` if the substring is found within the string, ignoring case; otherwise, `false`.
 *
 * @example
 * ```ts
 * const contains = includesIgnoreCase("Hello World", "hello");
 * console.log(contains); // Output: true
 * 
 * const notContains = includesIgnoreCase("Hello World", "bye");
 * console.log(notContains); // Output: false
 * ```
 */
export function includesIgnoreCase(text: string, includeText: string): boolean {
    return text.toLowerCase().includes(includeText.toLowerCase());
}