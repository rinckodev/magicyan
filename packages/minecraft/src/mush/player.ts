import type { FetchResult } from "@magicyan/config";
import type { MushBedWarsStats } from "./stats/bedwars";
import type { MushBlockpartyStats } from "./stats/blockparty";
import type { MushBrigdepraticeStats } from "./stats/bridgepratice";
import type { MushCTFStats } from "./stats/ctf";
import type { MushDuelsStats } from "./stats/duels";
import type { MushHungergamesRanking } from "./stats/hungergames";
import type { MushMurderStats } from "./stats/murder";
import type { MushPartyStats } from "./stats/party";
import type { MushPlaytimeStats } from "./stats/playtime";
import type { MushPvpStats } from "./stats/pvp";
import type { MushQuickBuildersStats } from "./stats/quickbuilders";
import type { MushSeekStats } from "./stats/seek";
import type { MushSkyWarsStats } from "./stats/skywarsr1";
import { RouteBases } from "../index";
import { notOkResult } from "../helpers/result";
import { MushAPIDataResponse } from "./api";

export interface MushPlayerAccount {
    profile_id: number;
    type: string;
    unique_id: string;
    username: string;
}

export interface MushPlayerTag {
    color: string;
    name: string;
}

export interface MushPlayerSkin {
    hash: string;
    slim: boolean;
}

export interface MushPlayerStats {
    bedwars: MushBedWarsStats
    blockparty: MushBlockpartyStats
    bridgepractice: MushBrigdepraticeStats
    ctf: MushCTFStats
    duels: MushDuelsStats
    hungergames: MushHungergamesRanking
    murder: MushMurderStats
    party: MushPartyStats
    play_time: MushPlaytimeStats
    pvp: MushPvpStats
    quickbuilders: MushQuickBuildersStats
    seek: MushSeekStats
    skywars_r1: MushSkyWarsStats
}

export interface MushPlayerInfo {
    account: MushPlayerAccount
    best_tag: MushPlayerTag,
    profile_tag: MushPlayerTag;
    rank_tag: MushPlayerTag;
    connected: boolean;
    first_login: number;
    last_login: number;
    medal: string;
    medals: string[];
    skin: MushPlayerSkin;
    stats: MushPlayerStats;
    tags: string[];
}

export type FetchMushPlayerResult = FetchResult<MushPlayerInfo>

export async function fetchMushPlayerInfo(nickOrUUID: string): Promise<FetchMushPlayerResult> {
    const url = `${RouteBases.mush}/player/${nickOrUUID}`;
    const response = await fetch(url);
    if (!response.ok) return notOkResult(response);

    const data = await response.json() as MushAPIDataResponse<MushPlayerInfo>;
    if (!data.success){
        return { 
            success: data.success, 
            code: data.error_code, 
            error: data.response.message 
        }
    }
    return { success: true, data: data.response };
}