import type { FetchResult } from "@magicyan/config";
import { notOkResult } from "../../helpers/result";
import { convertKeysToCamelCase } from "../../helpers/format";
import { RouteBases } from "../../index";
import type { MushLeaderboardGame, MushLeaderboardGameStats, MushLeaderboardItem } from "./base";
import type { MushBedwarsLeaderboardItem } from "./bedwars";
import type { MushCTFLeaderboardItem } from "./ctf";
import type { MushHGLeaderboardItem } from "./hg";
import type { MushMurderLeaderboardItem } from "./murder";
import type { MushPartyLeaderboardItem } from "./party";
import type { MushPvpLeaderboardItem } from "./pvp";
import type { MushQuickbuildersLeaderboardItem } from "./quickbuilders";
import type { MushSkywarsLeaderboardItem } from "./skywars";
import _ from "lodash";

export type MushLeaderboard<T extends MushLeaderboardGame> = {
    bedwars: MushBedwarsLeaderboardItem[];
    skywars: MushSkywarsLeaderboardItem[];
    pvp: MushPvpLeaderboardItem[];
    party: MushPartyLeaderboardItem[];
    ctf: MushCTFLeaderboardItem[];
    hg: MushHGLeaderboardItem[];
    murder: MushMurderLeaderboardItem[];
    quickbuilders: MushQuickbuildersLeaderboardItem[]
}[T];

export type FetchMushLeaderboardResult<T extends MushLeaderboardGame> = FetchResult<
    MushLeaderboard<T>
>;

export async function fetchMushLeaderboard
<T extends MushLeaderboardGame>(game: T): Promise<FetchMushLeaderboardResult<T>> 
{
    const url = `${RouteBases.mush}/leaderboard/${game}`;
    const response = await fetch(url);
    if (!response.ok) return notOkResult(response);

    const { records } = await response.json() as { records: MushLeaderboard<T> };

    const data = records.map((raw: any) => ({
        account: convertKeysToCamelCase(raw.account),
        avatarURL: raw.avatar_url,
        color: raw.color,
        position: raw.pos,
        game,
        get: implementMethod(game),
        ..._.omit(raw, ["account", "avatar_url", "color", "pos"])
    }) as MushLeaderboardItem) as MushLeaderboard<T>;

    return { success: true, data }
}

function implementMethod(game: MushLeaderboardGame){
    const key: string = game === "skywars" ? "skywars_r1" :
    game === "hg" ? "hungergames" : game;

    return function getStats(this: any, stats: MushLeaderboardGameStats){
        return this[`${key}:${stats}`] ?? -1;
    }
}