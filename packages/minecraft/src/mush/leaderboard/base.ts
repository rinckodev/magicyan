import { MushPlayerAccount } from "../player";

export interface MushLeaderboardItem {
    pos: number,
    color: string,
    account: MushPlayerAccount,
    avatar_url: string,
}