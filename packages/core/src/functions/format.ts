type MaybeString = string | null | undefined;
/**
 * Receives a possibly null value and returns the value or undefined if falsy
 * @param value Any value
 * @returns 
 */
export function notFound<T>(value: T): T & {} | undefined {
    return value !== null ? value : undefined;
}
/**
 * Creates text with a line break and omit nullish values
 * @param text String Array
 * @returns string
 * ```ts
 * const text = brBuilder("Hello world", "This is javascript!")
 * console.log(text) 
 * // Hello world
 * // This is javascript
 * ```
 */
export function brBuilder(...text: (MaybeString | MaybeString[])[]): string {
    return text.flat().filter(nonnullish).join("\n");
}

/**
 * Creates text with a spaces and omit nullish values
 * @param text String array
 * @returns string
 * ```ts
 * const adm = "Rincko";
 * const action = "promoted"
 * const text = spaceBuilder("Administrator", adm, "has been", action)
 * console.log(text) // Administrator Rincko has been promoted
 * ```
 */
export function spaceBuilder(...text: (MaybeString | MaybeString[])[]): string {
    return text.flat().filter(nonnullish).join(" ");
}
/**
 * Replace the text with object variables
 * @param text 
 * @param replaces 
 * @returns 
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
 *
 * @param {string} word - The word to be capitalized.
 * @param {string} allWords - Whether all words should be capitalized
 * @returns {string} The capitalized word.
 *
 * @example
 * ```ts
 * const capitalizedWord = capitalize("hello");
 * console.log(capitalizedWord); // Output: "Hello"
 * 
 * const capitalizedText = capitalize("i love brazil", true);
 * console.log(capitalizedText); // Output: "I Love Brazil"
 * ```
 */
export function captalize(word: string, allWords: boolean = false): string {
    return allWords
    ? word.split(" ").map(word => captalize(word)).join(" ")
    : word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function limitText(text: string, maxLength: number, endText: string = ""){
    return text.length >= maxLength ? text.slice(0, maxLength) + endText : text;
}

function nonnullish(v: unknown): boolean {
    return v !== null && v !== undefined;
}