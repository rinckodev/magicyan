import { RouteBases } from "../../index";
import { notOkResult } from "../../helpers/result";
import type { FetchResult } from "@magicyan/config";
import type { MushBedwarsLeaderboardItem } from "./bedwars";
import type { MushSkywarsLeaderboardItem } from "./skywars";
import type { MushPvpLeaderboardItem } from "./pvp";
import type { MushPartyLeaderboardItem } from "./party";
import type { MushCTFLeaderboardItem } from "./ctf";
import type { MushHGLeaderboardItem } from "./hg";
import { MushMurderLeaderboardItem } from "./murder";
import { MushQuickbuildersLeaderboardItem } from "./quickbuilders";

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
    return { success: true, data: records }
}