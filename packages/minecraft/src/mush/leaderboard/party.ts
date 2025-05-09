import { MushLeaderboardItem } from "./base";

export interface MushPartyLeaderboardItem extends MushLeaderboardItem {
    game: "party",
    "party:points": number,
    "party:first_place": number,
    "party:second_place": number,
    "party:third_place": number
}