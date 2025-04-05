import { MushLeaderboardItem } from "./base"

export interface MushSkywarsLeaderboardItem extends MushLeaderboardItem {
    game: "skywars",
    "skywars_r1:level": number,
    "skywars_r1:wins": number,
    "skywars_r1:kills": number,
    "skywars_r1:losses": number,
    "skywars_r1:coins": number
}