import type { FetchResult } from "@magicyan/config";
import { RouteBases } from "../index";
import { MinecraftProfile } from "./profile";
import { decodeBase64Json } from "../helpers/utils";
import { notOkResult } from "../helpers/result";

interface SessionProperty {
    timestamp: number,
    profileId: string,
    profileName: string,
    textures: {
        SKIN: {
            url: string
            metadata?: {
                model: "slim"
            }
        },
        CAPE: {
            url: string 
        }
    }
}

export interface MinecraftProfileSession extends Omit<MinecraftProfile, "demo"> {
    properties: SessionProperty[] 
}

export type FetchMinecraftProfileSessionResult = FetchResult<MinecraftProfileSession>;

export async function fetchMinecraftProfileSession(UUID: string): Promise<FetchMinecraftProfileSessionResult> {
    const route = `session/minecraft/profile/${UUID}`;
    const url = `${RouteBases.sessionmojang}/${route}`;

    const response = await fetch(url);
    if (!response.ok) return notOkResult(response);
    

    const data = await response.json() as MinecraftProfileSession;

    const properties = (data.properties as any)
    .map((d: { value: string }) => decodeBase64Json<SessionProperty>(d.value));

    data.properties = properties;

    return { success: true, data }
}