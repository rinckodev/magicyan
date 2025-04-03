export type FetchResult<T extends object> = 
| {
    success: true;
    data: T;
}
| {
    success: false;
    error: string;
    code: number;
}