import type { Message } from "discord.js";

export async function webhookMessageCreate(message: Message){
    if (!message.inGuild() || !message.webhookId) return;
    
    const webhook = await message.fetchWebhook().catch(() => null);
    if (!webhook) return;
    message.client.emit("webhookMessageCreate", message, webhook);
}