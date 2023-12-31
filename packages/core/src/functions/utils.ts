export function copyObject<T extends object>(object: T): T{
    return JSON.parse(JSON.stringify(object))
}