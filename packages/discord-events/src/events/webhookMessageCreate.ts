import { Client, Message } from "discord.js";

export async function webhookMessageCreate(client: Client, message: Message){
    if (!message.inGuild()) return;
    const { author, guild } = message;
    
    if (!author.bot) return;
    const webhooks = await guild.fetchWebhooks();
    const webhook = webhooks.get(author.id);

    if (!webhook) return;
    client.emit("webhookMessageCreate", message, webhook);
}