export interface MushHungergamesRanking {
    hex_color: string;
    id: string;
    name: string;
    symbol: string;
}
export interface MushHungergamesStats {
    coins: number;
    deaths: number;
    doublekit_ranking: MushHungergamesRanking;
    games_played: number;
    kd: number;
    kills: number;
    max_kills: number;
    minimush_ranking: MushHungergamesRanking;

    mode_doublekit_deaths: number;
    mode_doublekit_games_played: number;
    mode_doublekit_kd: number;
    mode_doublekit_kills: number;
    mode_doublekit_max_kills: number;
    mode_doublekit_rank_exp: number;

    mode_event_games_played: number;

    mode_hg_deaths: number;
    mode_hg_games_played: number;
    mode_hg_kd: number;

    mode_randomkit_deaths: number;
    mode_randomkit_games_played: number;
    mode_randomkit_kd: number;
    mode_randomkit_kills: number;
    mode_randomkit_max_kills: number;
}