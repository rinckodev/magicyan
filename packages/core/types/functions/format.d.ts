/**
 * Just returns null
 * @returns null
 */
export declare function toNull(): null;
/**
 * Receives a possibly null value and returns the value or undefined if falsy
 * @param value Any value
 * @returns
 */
export declare function notFound<T>(value: T): NonNullable<T> | undefined;
/**
 * Creates text with a line break
 * @param text String Array
 * @returns string
 * ```ts
 * const text = brBuilder("Hello world", "This is javascript!")
 * console.log(text)
 * // Hello world
 * // This is javascript
 * ```
 */
export declare function brBuilder(...text: string[]): string;
/**
 * Replace the text with object variables
 * @param text
 * @param replaces
 * @returns
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
 * textReplacer(lang.welcome[locale], {
 *     "var(name)": user.displayName,
 *     "var(libname)": lib.getName()
 * })
 * ```
 */
export declare function textReplacer<R extends Record<string, any>>(text: string, replaces: R): string;
export declare function captalize(word: string): string;
