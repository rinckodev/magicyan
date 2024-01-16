import { DiscordEvents } from "./events";

declare module "discord.js" {
	interface ClientEvents extends DiscordEvents {}
	export type DeletedRole = { id: string; }
	export type RoleChanges = { -readonly[K in keyof Role]?: { old?: Role[K], new?: Role[K] } }
}

export {};