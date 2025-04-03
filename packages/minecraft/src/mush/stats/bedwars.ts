import { MushGameBadge } from "./base";

export interface MushBedWarsStats {
    assists: number;
    deaths: number;
    games_played: number;
    kills: number;
    level: number;
    level_badge: MushGameBadge;
    losses: number;
    max_winstreak: number;
    wins: number;
    winstreak: number;
    xp: number;

    "1v1_games_played": number;
    "3v3_games_played": number;
    "3v3v3v3_beds_broken": number;
    "3v3v3v3_beds_lost": number;
    "3v3v3v3_deaths": number;
    "3v3v3v3_final_deaths": number;
    "3v3v3v3_final_kills": number;
    "3v3v3v3_games_played": number;
    "3v3v3v3_kills": number;
    "3v3v3v3_losses": number;
    "3v3v3v3_max_winstreak": number;
    "3v3v3v3_wins": number;
    "3v3v3v3_winstreak": number;
    "4v4v4v4_beds_broken": number;
    "4v4v4v4_deaths": number;
    "4v4v4v4_final_kills": number;
    "4v4v4v4_games_played": number;
    "4v4v4v4_kills": number;
    "4v4v4v4_wins": number;
    "4v4v4v4_winstreak": number;

    beds_broken: number;
    beds_lost: number;

    doubles_assists: number;
    doubles_beds_broken: number;
    doubles_beds_lost: number;
    doubles_deaths: number;
    doubles_final_assists: number;
    doubles_final_deaths: number;
    doubles_final_kills: number;
    doubles_games_played: number;
    doubles_kills: number;
    doubles_losses: number;
    doubles_max_winstreak: number;
    doubles_wins: number;
    doubles_winstreak: number;

    final_assists: number;
    final_deaths: number;
    final_kills: number;
    fkdr: number;

    infection_solo_beds_broken: number;
    infection_solo_beds_lost: number;
    infection_solo_deaths: number;
    infection_solo_final_deaths: number;
    infection_solo_final_kills: number;
    infection_solo_fkdr: number;
    infection_solo_games_played: number;
    infection_solo_kills: number;
    infection_solo_losses: number;
    infection_solo_max_winstreak: number;
    infection_solo_wins: number;
    infection_solo_winstreak: number;

    solo_assists: number;
    solo_beds_broken: number;
    solo_beds_lost: number;
    solo_deaths: number;
    solo_final_deaths: number;
    solo_final_kills: number;
    solo_fkdr: number;
    solo_games_played: number;
    solo_kills: number;
    solo_losses: number;
    solo_max_winstreak: number;
    solo_wins: number;
    solo_winstreak: number;
  }
  