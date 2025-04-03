export interface SuccessMushAPIDataResponse<T> {
    success: true,
    error_code: -1,
    response: T;
}
export interface FailMushAPIDataResponse {
    success: false,
    error_code: number,
    response: {
        details: object,
        message: string,
        status: number
    }
}
export type MushAPIDataResponse<T = any> = SuccessMushAPIDataResponse<T> | FailMushAPIDataResponse;