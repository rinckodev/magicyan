interface NotOkResult {
    success: false, error: string; code: number;
}
export function notOkResult(response: Response): NotOkResult {
    const { status, statusText } = response;
    return { success: false, error: statusText, code: status };
}