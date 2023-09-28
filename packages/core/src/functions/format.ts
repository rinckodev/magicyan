export function toNull(){
    return null;
}
export function notFound<T>(value: T): NonNullable<T> | undefined{
    return value ?? undefined;
}
export function brBuilder(...text: string[]){
    return text.join("\n")
}
export function textReplacer<R extends Record<string, any>>(text: string, replaces: R){
    let result = text;
    for (const prop in replaces){
        result = result.replaceAll(prop, replaces[prop])
    }
    return result
}
export function captalize(word: string){
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}