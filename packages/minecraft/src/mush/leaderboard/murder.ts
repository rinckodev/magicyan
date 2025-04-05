import { MushLeaderboardItem } from "./base";

export interface MushMurderLeaderboardItem extends MushLeaderboardItem {
    game: "murder",
    "murder:wins": number,
    "murder:losses": number
}