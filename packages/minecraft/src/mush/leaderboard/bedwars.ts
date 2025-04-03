import { MushLeaderboardItem } from "./base";

export interface MushBedwarsLeaderboardItem extends MushLeaderboardItem {
    "bedwars:level": number,
    "bedwars:wins": number,
    "bedwars:kills": number,
    "bedwars:final_kills": number
}