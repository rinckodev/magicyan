import { MushPlayerAccount } from "../player";

export type MushLeaderBoardGameStats = 
| "wins"
| "losses"
| "level"
| "kills"
| "final_kills"
| "kd"
| "coins"
| "deaths"
| "perfect_builds"
| "builds"
| "arena_kills"
| "arena_deaths"
| "arena_kdr"
| "points"
| "first_place"
| "second_place"
| "third_place"
| "captures"

export interface MushLeaderboardItem {
    position: number,
    color: string,
    account: MushPlayerAccount,
    avatarURL: string,

    /**
     * This function takes the name of a statistic as an argument and returns its value. If the statistic does not exist for the selected game, it returns -1.
     * 
     * - **wins** : `bedwars`, `hg`, `murder`, `quickbuilders`, `skywars`
     * - **losses** : `murder`, `quickbuilders`, `skywars`
     * - **level** : `bedwars`, `skywars`
     * - **kills** : `bedwars`, `ctf`, `hg`, `skywars`
     * - **final_kills** : `bedwars`
     * - **kd** : `hg`
     * - **coins** : `ctf`, `skywars`
     * - **deaths** : `hg`
     * - **perfect_builds** : `quickbuilders`
     * - **builds** : `quickbuilders`
     * - **arena_kills** : `pvp`
     * - **arena_deaths** : `pvp`
     * - **arena_kdr** : `pvp`
     * - **points** : `party`
     * - **first_place** : `party`
     * - **second_place** : `party`
     * - **third_place** : `party`
     * - **captures** : `ctf`
     */
    get(stats: MushLeaderBoardGameStats): number;
}