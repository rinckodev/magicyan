/**
 * Validates if the given string is a valid email address.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 *
 * @example
 * ```ts
 * const validEmail = isEmail("example@domain.com");
 * console.log(validEmail); // Output: true
 *
 * const invalidEmail = isEmail("example@domain");
 * console.log(invalidEmail); // Output: false
 * ```
 */
export function isEmail(email: string): boolean {
    return new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email);
}
/**
 * Validates if the given string is a valid URL.
 *
 * @param url - The URL to validate.
 * @returns `true` if the URL is valid, otherwise `false`.
 *
 * @example
 * ```ts
 * const validUrl = isUrl("https://example.com");
 * console.log(validUrl); // Output: true
 *
 * const invalidUrl = isUrl("example.com");
 * console.log(invalidUrl); // Output: false
 * ```
 */
export function isUrl(url: string): boolean {
  	return new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/).test(url);
}
/**
 * Checks if the given string is numeric (contains only digits).
 *
 * @param text - The text to check.
 * @returns `true` if the text is numeric, otherwise `false`.
 *
 * @example
 * ```ts
 * const isNumericText = isNumeric("12345");
 * console.log(isNumericText); // Output: true
 *
 * const isNotNumericText = isNumeric("123a45");
 * console.log(isNotNumericText); // Output: false
 * ```
 */
export function isNumeric(text: string): boolean {
  	return new RegExp(/^\d+$/).test(text);
}