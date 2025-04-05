import { MushLeaderboardItem } from "./base";

export interface MushCTFLeaderboardItem extends MushLeaderboardItem {
    game: "ctf",
    "ctf:captures": number,
    "ctf:kills": number,
    "ctf:coins": number
}