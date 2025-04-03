import { MushLeaderboardItem } from "./base";

export interface MushMurderLeaderboardItem extends MushLeaderboardItem {
    "murder:wins": number,
    "murder:losses": number
}