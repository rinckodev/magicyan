import type { FetchResult } from "@magicyan/config";
import { SkinRenderTypeCrop, skinRenderTypeCrops } from "./crops";
import { SkinRenderLightingOptions, SkinRenderModelOptions, SkinRenderCameraOptions } from "./options";
import { SkinRenderType } from "./types";
import { RouteBases } from "../index";

export type SkinRenderOptions = {
    camera?: Partial<SkinRenderCameraOptions>;
    lighting?: Partial<SkinRenderLightingOptions>;
    model?: Partial<SkinRenderModelOptions>;
}

export function skinRoute<const T extends SkinRenderType>(
    nickOrUUID: string, type: T = "default" as T,
    crop?: SkinRenderTypeCrop[T], options?: SkinRenderOptions
) {
    const { camera, lighting, model } = options ?? {};
    const validCrops = skinRenderTypeCrops[type];
    if (crop && !validCrops.includes(crop as never)) {
        throw new Error(`Invalid crop "${crop}" for render type "${type}". Valid crops are: ${validCrops.join(', ')}`);
    }

    const url = new URL(`${RouteBases.skins}/render/${type}/${nickOrUUID}/${crop ?? validCrops[0]}`)

    if (model) loopParams(url, model);
    if (camera) loopParams(url, camera);
    if (lighting) loopParams(url, lighting);

    return decodeURIComponent(url.toString());
}

export type FetchSkinRenderResult = FetchResult<{ 
    buffer: Buffer,
    arrayBuffer: ArrayBuffer,
    url: string,
    response: Response 
}>

export async function fetchSkinRender<T extends SkinRenderType = "default">(
    nickOrUUID: string, type: T = "default" as T,
    crop?: SkinRenderTypeCrop[T], options?: SkinRenderOptions
): Promise<FetchSkinRenderResult> {
    const response = await fetch(skinRoute(nickOrUUID, type, crop, options));
    if (!response.ok) {
        const { statusText, status } = response;
        return { success: false, error: statusText, code: status }
    }

    const arrayBuffer = await response.arrayBuffer();

    return {
        success: true,
        data: {
            buffer: Buffer.from(arrayBuffer),
            arrayBuffer,
            url: response.url,
            response,
        }
    }
}

function loopParams<T>(url: URL, obj: T){
    for (const key in obj) {
        const value = obj[key]
        if (typeof value === "object"){
            url.searchParams.set(key, JSON.stringify(value));
            continue;
        }
        if (typeof value !== "undefined") {
            url.searchParams.set(key, `${value}`);
            continue;
        }
    }
}