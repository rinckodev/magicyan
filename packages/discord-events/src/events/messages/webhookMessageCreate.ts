import type { Message, Webhook } from "discord.js";

export type WebhookMessageCreate = [message: Message<true>, webhook: Webhook];

export async function webhookMessageCreate(message: Message){
    if (!message.webhookId) return;
    if (!message.inGuild()) return;

    const { client } = message;

    const webhook = await message.fetchWebhook().catch(() => null);
    if (!webhook) return;

    client.emit("webhookMessageCreate", message, webhook);
}