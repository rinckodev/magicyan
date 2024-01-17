import { DiscordEvents } from "./events";

declare module "discord.js" {
	interface ClientEvents extends DiscordEvents {}
}

export {};