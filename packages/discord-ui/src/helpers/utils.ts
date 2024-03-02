type ObjectRecord = Record<string | number | symbol, any>;

type MergedObject<T, U> = {
    [K in Exclude<keyof T, keyof U>]: T[K];
} & U;

export function toMergeObject<T extends ObjectRecord, U extends ObjectRecord>(obj1: T, obj2: U): MergedObject<T, U> {
    const result = JSON.parse(JSON.stringify(obj1)) as T;
    for (const key in obj2){
        if (typeof obj2[key] === "object" && obj1[key] && typeof obj1[key] === "object"){
            result[key] = toMergeObject(obj1[key], obj2[key]);
        } else {
            result[key] = obj2[key];
        }
    }
    return result;
}