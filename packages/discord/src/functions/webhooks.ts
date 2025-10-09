import { WebhookClient, type WebhookClientData, type WebhookClientOptions } from "discord.js";

export function createWebhookClient(url: string, options?: WebhookClientOptions): WebhookClient | null
export function createWebhookClient(data: WebhookClientData, options?: WebhookClientOptions): WebhookClient | null
export function createWebhookClient(info: string | WebhookClientData, options?: WebhookClientOptions) {
    try {
        return new WebhookClient(
            typeof info === "string"
                ? { url: info }
                : info,
            options
        );
    } catch {
        return null
    }
}