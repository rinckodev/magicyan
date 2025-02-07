type MaybeString = string | null | undefined;
/**
 * Returns the given value if it is not `null`; otherwise, returns `undefined`.
 *
 * @param value - The value to be checked for `null`.
 * @returns The original value if it is not `null`, or `undefined` if it is.
 *
 * @example
 * ```ts
 * const result = notFound("Hello");
 * console.log(result); // Output: "Hello"
 *
 * const notFoundResult = notFound(null);
 * console.log(notFoundResult); // Output: undefined
 * ```
 */
export function notFound<T>(value: T): T & {} | undefined {
    return value !== null ? value : undefined;
}
/**
 * Joins multiple strings or arrays of strings into a single string, separated by line breaks.
 * Filters out any `null` or `undefined` values.
 *
 * @param text - The text segments to be joined. Each segment can be a string, an array of strings, or `null`/`undefined`.
 * @returns The concatenated string with each segment separated by a line break.
 *
 * @example
 * ```ts
 * const result = brBuilder("Hello", [null, "World"], undefined, "!");
 * console.log(result);
 * // Output:
 * // Hello
 * // World
 * // !
 * ```
 */
export function brBuilder(...text: (MaybeString | MaybeString[])[]): string {
    return text.flat().filter(nonNullish).join("\n");
}

/**
 * Joins multiple strings or arrays of strings into a single string, separated by spaces.
 * Filters out any `null` or `undefined` values.
 *
 * @param text - The text segments to be joined. Each segment can be a string, an array of strings, or `null`/`undefined`.
 * @returns The concatenated string with each segment separated by a space.
 *
 * @example
 * ```ts
 * const result = spaceBuilder("Hello", [null, "World"], undefined, "!");
 * console.log(result); // Output: "Hello World !"
 * ```
 */
export function spaceBuilder(...text: (MaybeString | MaybeString[])[]): string {
    return text.flat().filter(nonNullish).join(" ");
}

/**
 * Replaces occurrences of specified substrings within a text string based on a set of key-value pairs.
 * Each key in the `replaces` object is replaced with its corresponding value in the text.
 *
 * @param text - The original text where replacements will be made.
 * @param replaces - An object containing the substrings to replace (as keys) and their replacement values.
 * @returns The modified text with all specified replacements applied.
 * 
 * @example
 * ```ts
 * // lang.json
 * {
 *     "welcome": {
 *         "en-US": "Hi var(name), welcome to var(libname) lib",
 *         "pt-BR": "Olá var(name), seja bem vindo à lib var(libname)"
 *     }
 * }
 * // command.ts
 * import lang from "./lang"
 * // ...
 * replaceText(lang.welcome[locale], {
 *     "var(name)": user.displayName,
 *     "var(libname)": lib.getName()
 * })
 * ```
 */
export function replaceText<R extends Record<string, any>>(text: string, replaces: R){
    let result = String(text);
    for (const prop in replaces){
        result = result.replaceAll(prop, replaces[prop]);
    }
    return result;
}
/**
 * Capitalizes the first letter of a word and converts the remaining letters to lowercase.
 * If `allWords` is true, capitalizes the first letter of each word in the string.
 *
 * @param word - The word or sentence to be capitalized.
 * @param allWords - Whether all words should be capitalized individually. Default is `false`.
 * @returns The capitalized word or sentence.
 *
 * @example
 * ```ts
 * const capitalizedWord = captalize("hello");
 * console.log(capitalizedWord); // Output: "Hello"
 * 
 * const capitalizedText = captalize("i love brazil", true);
 * console.log(capitalizedText); // Output: "I Love Brazil"
 * ```
 */
export function captalize(word: string, allWords: boolean = false): string {
    word = word.trim();
    if (!word) return word;
    return allWords
    ? word.split(" ").map(word => captalize(word)).join(" ")
    : word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Limits the length of a given text to a specified maximum length,
 * optionally appending additional text if the limit is exceeded.
 *
 * @param text - The original text to be truncated if necessary.
 * @param maxLength - The maximum length of the returned text.
 * @param endText - The text to append to the truncated text, if the limit is exceeded. Default is an empty string.
 * @returns The truncated text with optional appended text.
 *
 * @example
 * ```ts
 * const shortText = limitText("Hello World", 5);
 * console.log(shortText); // Output: "Hello"
 *
 * const truncatedText = limitText("Hello World", 5, "...");
 * console.log(truncatedText); // Output: "Hello..."
 * ```
 */
export function limitText(text: string, maxLength: number, endText: string = ""): string{
    return text.length >= maxLength ? text.slice(0, maxLength) + endText : text;
}

function nonNullish(v: unknown): boolean {
    return v !== null && v !== undefined;
}