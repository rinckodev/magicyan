import type { Client, Guild } from "discord.js";
export declare function findEmoji(guildOrClient: Guild | Client): {
    byName(name: string, animated?: boolean): import("discord.js").GuildEmoji | undefined;
    byId(id: string, animated?: boolean): import("discord.js").GuildEmoji | undefined;
};
