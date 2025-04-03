import { MushLeaderboardItem } from "./base";

export interface MushQuickbuildersLeaderboardItem extends MushLeaderboardItem {
    "quickbuilders:wins": number,
    "quickbuilders:losses": number,
    "quickbuilders:perfect_builds": number,
    "quickbuilders:builds": number
}