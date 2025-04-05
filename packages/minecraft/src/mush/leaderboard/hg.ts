import { MushLeaderboardItem } from "./base";

export interface MushHGLeaderboardItem extends MushLeaderboardItem {
    game: "hg",
    "hungergames:wins": number,
    "hungergames:kills": number,
    "hungergames:deaths": number,
    "hungergames:kd": number
}