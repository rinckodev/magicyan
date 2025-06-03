import { isDefined } from "./validation";

export type CanBeString = string | { toString(): string };
export type MaybeString = CanBeString | null | undefined
/**
 * Ensures that a value is either kept as is (if not `null`) or converted to `undefined`.
 *
 * @param value - The value to process. If it is `null`, it will return `undefined`; otherwise, it returns the original value.
 * @returns The original value if it is not `null`, otherwise `undefined`.
 *
 * @example
 * notFound("Hello");
 * // Returns: "Hello"
 *
 * @example
 * notFound(null);
 * // Returns: undefined
 *
 * @example
 * notFound(42);
 * // Returns: 42
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
export function brBuilder(...texts: (MaybeString | MaybeString[])[]): string {
    return texts.flat().filter(isDefined).map(txt => `${txt}`).join("\n");
}

/**
 * Joins multiple strings or arrays of strings into a single string separated by spaces, ignoring `null` and `undefined` values.
 *
 * @param texts - A list of strings or arrays of strings, which may include `null` or `undefined`.
 * @returns A single string where all valid strings are joined by a space.
 *
 * @example
 * spaceBuilder("Hello", "World");
 * // Returns: "Hello World"
 *
 * @example
 * spaceBuilder(["Hello", null], "World");
 * // Returns: "Hello World"
 *
 * @example
 * spaceBuilder(null, undefined, "Only this");
 * // Returns: "Only this"
 */
export function spaceBuilder(...texts: (MaybeString | MaybeString[])[]): string {
    return texts.flat().filter(isDefined).map(txt => `${txt}`).join(" ");
}

/**
 * Replaces all occurrences of the properties in the `replaces` object within the given `text` string. The replacements can be either strings or functions that receive the matched substring.
 *
 * @param text - The text in which the replacements will be made.
 * @param replaces - An object where keys are substrings to be replaced and values are either a string or a function that returns a string to replace the match.
 * @returns A new string with all specified replacements applied.
 *
 * @example
 * replaceText("Hello, {name}!", { "{name}": "Alice" });
 * // Returns: "Hello, Alice!"
 *
 * @example
 * replaceText("Goodbye, {name}. See you later!", { "{name}": (match) => match.toUpperCase() });
 * // Returns: "Goodbye, {NAME}. See you later!"
 *
 * @example
 * replaceText("Price is {price} dollars", { "{price}": (match) => `$${match.replace(/\D/g, "")}` });
 * // Returns: "Price is $100 dollars"
 */
export function replaceText<R extends Record<string, CanBeString>>(text: string, replaces: R){
    let result = String(text);
    for (const prop in replaces){
        result = result.replaceAll(prop, `${replaces[prop]}`);
    }
    return result;
}

/**
 * Capitalizes the first letter of a given word, or all words in a phrase if `allWords` is true.
 * 
 * @param word - The word or phrase to capitalize.
 * @param allWords - A flag to indicate whether to capitalize the first letter of every word in a phrase. Defaults to `false`.
 * @returns The word or phrase with the specified capitalization.
 *
 * @example
 * capitalize("hello");
 * // Returns: "Hello"
 *
 * @example
 * capitalize("hello world", true);
 * // Returns: "Hello World"
 *
 * @example
 * capitalize("  whitespace  ");
 * // Returns: "Whitespace"
 */
export function capitalize(word: string, allWords: boolean = false): string {
    word = word.trim();
    if (!word) return word;
    return allWords
    ? word.split(" ").map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ")
    : word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Truncates the given text to a specified length and appends the `endText` if the text exceeds the maximum length.
 * 
 * @param text - The text to be truncated.
 * @param maxLength - The maximum allowed length of the text.
 * @param endText - A string to append at the end of the truncated text if it exceeds the `maxLength`. Defaults to an empty string.
 * @returns The truncated text with the `endText` appended if the original text exceeds the `maxLength`.
 *
 * @example
 * limitText("Hello, this is a long sentence.", 10);
 * // Returns: "Hello, thi"
 *
 * @example
 * limitText("Hello, this is a long sentence.", 10, "...");
 * // Returns: "Hello, thi..."
 */
export function limitText(text: string, maxLength: number, endText: string = ""): string{
    return text.length >= maxLength ? text.slice(0, maxLength) + endText : text;
}