import { RouteBases } from "../index";
import { FetchResult } from "@magicyan/config";

export type FetchServerIconResult = FetchResult<{
    buffer: Buffer,
    url: string,
    response: Response,
}>;

export async function fetchServerIcon(ip: string): Promise<FetchServerIconResult> {
    const url = `${RouteBases.mcsrvstat}/icon/${ip}`;
    const response = await fetch(url);
    if (!response.ok){
        const { statusText, status } = response;
        return { success: false, error: statusText, code: status }
    }
    const arrayBuffer = await response.arrayBuffer();

    return {
        success: true,
        data: {
            buffer: Buffer.from(arrayBuffer),
            url: response.url,
            response,
        }
    }
}