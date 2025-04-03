import { MushLeaderboardItem } from "./base";

export interface MushHGLeaderboardItem extends MushLeaderboardItem {
    "hungergames:wins": number,
    "hungergames:kills": number,
    "hungergames:deaths": number,
    "hungergames:kd": number
}