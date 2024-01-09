type ObjectRecord = Record<string | number | symbol, any>;

export function copyObject<T extends ObjectRecord>(object: T): T{
    return JSON.parse(JSON.stringify(object))
}

type MergedObject<T, U> = {
    [K in Exclude<keyof T, keyof U>]: T[K];  // Propriedades do objeto original não alteradas
  } & U;
export function mergeObject<T extends ObjectRecord, U extends ObjectRecord>(obj1: T, obj2: U): MergedObject<T, U> {
    const result = { ...obj1 };

    for (const key in obj2){
        if (typeof obj2[key] === "object" && obj1[key] && typeof obj1[key] === "object"){
            result[key] = mergeObject(obj1[key], obj2[key]);
        } else {
            result[key] = obj2[key];
        }
    }

    return result;
}