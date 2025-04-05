import { RouteBases } from "../index";
import { SkinModelType } from "./options";
import type { FetchResult } from "@magicyan/config";

export interface SkinInfo {
    /** The UUID of the requested player. */
    playerUUID: string;
    /** The link to the players skin file. If the skinURL parameter is defined this will change to match it. */
    skinUrl: string;
    /** The link to the players cape file. */
    userCape: string;
    /** If the skin's texture height is equal to 32 pixels indicating a classic skin is present, this value will generate a base64 copy of the skin converted to 64x64. */
    processedSkinUrl: string;
    /** Defines whether the geometry for your model is slim or wide. If the skinType parameter is defined this will change to match it. */
    skinType: SkinModelType;
    /** The width in pixels of the player's skin. Will default to 64 when the skinUrl parameter is defined. */
    skinTextureWidth: number;
    /** The height in pixels of the player's skin. Will default to 64 when the skinUrl parameter is defined. */
    skinTextureHeight: number;
}

export type FetchSkinInfoResult = FetchResult<Partial<SkinInfo>>;

export async function fetchSkinInfo(nickOrUIID: string): Promise<FetchSkinInfoResult>  {
    if (typeof nickOrUIID !== "string"){
        throw new Error(`The nickOrUIID parameter expected the string type but received ${typeof nickOrUIID}`);
    }
    const url = `${RouteBases.skins}/info/user/${nickOrUIID}`;
    
    const response = await fetch(url)
    if (!response.ok){
        const { statusText, status } = response;
        return { success: false, error: statusText, code: status }
    }
    try {
        const data = await response.json() as SkinInfo;
        return {
            success: true,
            data
        }
    } catch (err){
        return { success: false, error: `${err}`, code: 502 }
    }
}