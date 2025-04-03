import type { FetchResult } from "@magicyan/config";
import { RouteBases } from "../index";
import { notOkResult } from "../helpers/result";

export interface MinecraftProfile {
    /** UUID of the player. */
    id: string;
    /** Name of the player, case sensitive. */
    name: string;
    /** Included in response if the account has not migrated to Mojang account. */
    legacy?: boolean;
    /** Included in response if the account does not own the game. */
    demo?: boolean;
}

export type FetchMinecraftProfileResult = FetchResult<MinecraftProfile>;

export async function fetchMinecraftProfile(nick: string): Promise<FetchMinecraftProfileResult> {
    const route = `minecraft/profile/lookup/name/${nick}`;
    const url = `${RouteBases.mcservices}/${route}`;

    const response = await fetch(url);
    if (!response.ok) return notOkResult(response);

    const data = await response.json() as MinecraftProfile;
    return { success: true, data }
}