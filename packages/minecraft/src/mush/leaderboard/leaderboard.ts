import type { FetchResult } from "@magicyan/config";
import { notOkResult } from "../../helpers/result";
import { RouteBases } from "../../index";
import type { MushLeaderBoardGameStats } from "./base";
import type { MushBedwarsLeaderboardItem } from "./bedwars";
import type { MushCTFLeaderboardItem } from "./ctf";
import type { MushHGLeaderboardItem } from "./hg";
import { MushMurderLeaderboardItem } from "./murder";
import type { MushPartyLeaderboardItem } from "./party";
import type { MushPvpLeaderboardItem } from "./pvp";
import { MushQuickbuildersLeaderboardItem } from "./quickbuilders";
import type { MushSkywarsLeaderboardItem } from "./skywars";
import { convertKeysToCamelCase } from "../../helpers/format";
import _ from "lodash";

export type MushLeaderboardGames = 
| "bedwars"
| "skywars"
| "pvp"
| "party"
| "hg"
| "murder"
| "quickbuilders"
| "ctf";

export type MushGameLeaderboard<T extends MushLeaderboardGames> = {
    bedwars: MushBedwarsLeaderboardItem[];
    skywars: MushSkywarsLeaderboardItem[];
    pvp: MushPvpLeaderboardItem[];
    party: MushPartyLeaderboardItem[];
    ctf: MushCTFLeaderboardItem[];
    hg: MushHGLeaderboardItem[];
    murder: MushMurderLeaderboardItem[];
    quickbuilders: MushQuickbuildersLeaderboardItem[]
}[T];

export type FetchMushLeaderboardResult<T extends MushLeaderboardGames> = FetchResult<
    MushGameLeaderboard<T>
>;

export async function fetchMushLeaderboard
<T extends MushLeaderboardGames>(game: T): Promise<FetchMushLeaderboardResult<T>> 
{
    const url = `${RouteBases.mush}/leaderboard/${game}`;
    const response = await fetch(url);
    if (!response.ok) return notOkResult(response);

    const { records } = await response.json() as { records: MushGameLeaderboard<T> };

    const data = records.map((raw: any) => ({
        account: convertKeysToCamelCase(raw.account),
        avatarURL: raw.avatar_url,
        color: raw.color,
        position: raw.pos,
        get: implementMethod(game),
        ..._.omit(raw, ["account", "avatar_url", "color", "pos"])
    })) as MushGameLeaderboard<T>;

    return { success: true, data }
}

function implementMethod(game: MushLeaderboardGames, ){
    const key: string = game === "skywars" ? "skywars_r1" :
    game === "hg" ? "hungergames" : game;

    return function getStats(this: any, stats: MushLeaderBoardGameStats){
        return this[`${key}:${stats}`] ?? -1;
    }
}