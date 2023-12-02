import type { Guild } from "discord.js";
export declare function findRole(guild: Guild): {
    byName(name: string): import("discord.js").Role | undefined;
    byId(id: string): import("discord.js").Role | undefined;
};
