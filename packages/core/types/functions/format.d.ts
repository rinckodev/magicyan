export declare function toNull(): null;
export declare function notFound<T>(value: T): NonNullable<T> | undefined;
export declare function brBuilder(...text: string[]): string;
export declare function textReplacer<R extends Record<string, any>>(text: string, replaces: R): string;
export declare function captalize(word: string): string;
