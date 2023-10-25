/**
 * Just returns null
 * @returns null
 */
export function toNull(){
    return null;
}
/**
 * Receives a possibly null value and returns the value or undefined if falsy
 * @param value Any value
 * @returns 
 */
export function notFound<T>(value: T): NonNullable<T> | undefined{
    return value ?? undefined;
}
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
export function brBuilder(...text: string[]){
    return text.join("\n");
}

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
export function textReplacer<R extends Record<string, any>>(text: string, replaces: R){
    let result = text;
    for (const prop in replaces){
        result = result.replaceAll(prop, replaces[prop]);
    }
    return result;
}
export function captalize(word: string){
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}