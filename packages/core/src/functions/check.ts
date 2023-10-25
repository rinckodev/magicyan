/**
 * This function compares two strings ignoring case sensitivity
 * @param text1 Text 1
 * @param text2 Text 2
 * @returns Boolean
 */
export function equalsIgnoreCase(text1: string, text2: string): boolean {
    return text1.toLowerCase() === text2.toLowerCase();
}