import { MushLeaderboardItem } from "./base";

export interface MushPvpLeaderboardItem extends MushLeaderboardItem {
    game: "pvp",
    "pvp:arena_kills": number,
    "pvp:arena_deaths": number,
    "pvp:arena_kdr": number
}