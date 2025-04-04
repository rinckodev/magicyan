import { MushGameBadge } from "./base";

export interface MushDuelsStats {
    bed_fight_deaths: number,
    bed_fight_kills: number,
    bed_fight_level_badge: MushGameBadge,
    bed_fight_losses: number,
    bed_fight_played: number,
    bed_fight_solo_deaths: number,
    bed_fight_solo_kills: number,
    bed_fight_solo_losses: number,
    bed_fight_solo_played: number,

    boxing_deaths: number,
    boxing_kills: number,
    boxing_level: number,
    boxing_level_badge: MushGameBadge,
    boxing_losses: number,
    boxing_max_winstreak: number,
    boxing_played: number,
    boxing_solo_deaths: number,
    boxing_solo_kills: number,
    boxing_solo_losses: number,
    boxing_solo_max_winstreak: number,
    boxing_solo_played: number,
    boxing_solo_wins: number,
    boxing_solo_winstreak: number,
    boxing_wins: number,
    boxing_winstreak: number,
    boxing_xp: number,

    bridge_1v1v1v1_winstreak: number,
    bridge_deaths: number,
    bridge_doubles_deaths: number,
    bridge_doubles_kills: number,
    bridge_doubles_losses: number,
    bridge_doubles_played: number,
    bridge_doubles_points: number,
    bridge_doubles_wins: number,
    bridge_doubles_winstreak: number,
    bridge_four_winstreak: number,
    bridge_kills: number,
    bridge_level: number,
    bridge_level_badge: MushGameBadge,
    bridge_losses: number,
    bridge_played: number,
    bridge_points: number,
    bridge_solo_deaths: number,
    bridge_solo_kills: number,
    bridge_solo_played: number,
    bridge_solo_points: number,
    bridge_solo_wins: number,
    bridge_solo_winstreak: number,
    bridge_wins: number,
    bridge_winstreak: number,
    bridge_xp: number,

    combo_deaths: number,
    combo_kills: number,
    combo_level: number,
    combo_level_badge: MushGameBadge,
    combo_max_winstreak: number,
    combo_played: number,
    combo_solo_kills: number,
    combo_solo_max_winstreak: number,
    combo_solo_played: number,
    combo_solo_wins: number,
    combo_solo_winstreak: number,
    combo_wins: number,
    combo_winstreak: number,
    combo_xp: number,

    fireball_fight_beds_broken: number,
    fireball_fight_deaths: number,
    fireball_fight_kills: number,
    fireball_fight_level_badge: MushGameBadge,
    fireball_fight_losses: number,
    fireball_fight_max_winstreak: number,
    fireball_fight_played: number,
    fireball_fight_solo_beds_broken: number,
    fireball_fight_solo_deaths: number,
    fireball_fight_solo_kills: number,
    fireball_fight_solo_losses: number,
    fireball_fight_solo_max_winstreak: number,
    fireball_fight_solo_played: number,
    fireball_fight_solo_wins: number,
    fireball_fight_solo_winstreak: number,
    fireball_fight_wins: number,
    fireball_fight_winstreak: number,
    fireball_fight_xp: number,

    gapple_deaths: number,
    gapple_kills: number,
    gapple_level: number,
    gapple_level_badge: MushGameBadge,
    gapple_losses: number,
    gapple_played: number,
    gapple_solo_deaths: number,
    gapple_solo_kills: number,
    gapple_solo_losses: number,
    gapple_solo_played: number,
    gapple_solo_wins: number,
    gapple_solo_winstreak: number,
    gapple_wins: number,
    gapple_winstreak: number,
    gapple_xp: number,

    gladiator_deaths: number,
    gladiator_hg_solo_deaths: number,
    gladiator_hg_solo_kills: number,
    gladiator_hg_solo_losses: number,
    gladiator_hg_solo_played: number,
    gladiator_hg_solo_wins: number,
    gladiator_hg_solo_winstreak: number,
    gladiator_kills: number,
    gladiator_level: number,
    gladiator_level_badge: MushGameBadge,
    gladiator_losses: number,
    gladiator_played: number,
    gladiator_solo_deaths: number,
    gladiator_solo_losses: number,
    gladiator_solo_played: number,
    gladiator_solo_wins: number,
    gladiator_solo_winstreak: number,
    gladiator_wins: number,
    gladiator_winstreak: number,
    gladiator_xp: number,

    hgsim_level_badge: MushGameBadge,

    lava_level_badge: MushGameBadge,
    lava_played: number,
    lava_solo_winstreak: number,
    lava_wins: number,
    lava_winstreak: number,
    lava_xp: number,

    no_debuff_deaths: number,
    no_debuff_doubles_winstreak: number,
    no_debuff_kills: number,
    no_debuff_level_badge: MushGameBadge,
    no_debuff_played: number,
    no_debuff_solo_winstreak: number,
    no_debuff_wins: number,
    no_debuff_winstreak: number,
    no_debuff_xp: number,

    soup_deaths: number,
    soup_doubles_deaths: number,
    soup_doubles_kills: number,
    soup_doubles_losses: number,
    soup_doubles_played: number,
    soup_doubles_wins: number,
    soup_doubles_winstreak: number,
    soup_kills: number,
    soup_level: number,
    soup_level_badge: MushGameBadge,
    soup_losses: number,
    soup_max_winstreak: number,
    soup_played: number,
    soup_solo_deaths: number,
    soup_solo_kills: number,
    soup_solo_losses: number,
    soup_solo_max_winstreak: number,
    soup_solo_played: number,
    soup_solo_wins: number,
    soup_solo_winstreak: number,
    soup_wins: number,
    soup_winstreak: number,
    soup_xp: number,

    sumo_level_badge: MushGameBadge,
    
    uhc_deaths: number,
    uhc_doubles_deaths: number,
    uhc_doubles_kills: number,
    uhc_doubles_losses: number,
    uhc_doubles_played: number,
    uhc_doubles_wins: number,
    uhc_doubles_winstreak: number,
    uhc_kills: number,
    uhc_level: number,
    uhc_level_badge: MushGameBadge,
    uhc_losses: number,
    uhc_max_winstreak: number,
    uhc_played: number,
    uhc_solo_deaths: number,
    uhc_solo_kills: number,
    uhc_solo_losses: number,
    uhc_solo_max_winstreak: number,
    uhc_solo_played: number,
    uhc_solo_wins: number,
    uhc_solo_winstreak: number,
    uhc_wins: number,
    uhc_winstreak: number,
    uhc_xp: number
}