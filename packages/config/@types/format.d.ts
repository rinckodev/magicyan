export type CamelCase<S extends string> = S extends `${infer First}_${infer Rest}`
    ? `${First}${Capitalize<CamelCase<Rest>>}`
    : S;

export type CamelCaseKeys<T> = T extends any[]
    ? T extends [infer First, ...infer Rest]
    ? [CamelCaseKeys<First>, ...CamelCaseKeys<Rest>]
    : T
    : {
        [K in keyof T as CamelCase<K & string>]: T[K] extends object
        ? CamelCaseKeys<T[K]>
        : T[K];
    };