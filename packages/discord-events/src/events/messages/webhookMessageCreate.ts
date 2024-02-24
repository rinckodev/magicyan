import { Message } from "discord.js";

export function webhookMessageCreate(message: Message){
    if (!message.guild) return;

    console.log(message);
}