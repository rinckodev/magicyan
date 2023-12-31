export type DeepPartial<T> = {
    [Key in keyof T]?: DeepPartial<T[Key]>
}

export type DeepRequired<T> = {
    [Key in keyof T]-?: DeepRequired<T[Key]>
}

export type DeepObjectPath<T, Separator extends string = ".", K extends keyof T = keyof T> = K extends string | number
? T[K] extends infer R 
    ? `${K}`| (R extends Record<string, unknown> ? `${K}${Separator}${DeepObjectPath<R, Separator>}` : never) 
    : never 
: never