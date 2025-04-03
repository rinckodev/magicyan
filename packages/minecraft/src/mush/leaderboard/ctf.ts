import { MushLeaderboardItem } from "./base";

export interface MushCTFLeaderboardItem extends MushLeaderboardItem {
    "ctf:captures": number,
    "ctf:kills": number,
    "ctf:coins": number
}