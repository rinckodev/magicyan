import { Client, Message, Webhook } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { webhookMessageCreate } from "../src/events/messages/webhookMessageCreate";

describe("webhookMessageCreate", () => {
    let mockClient: Client;
    let mockMessage: Message;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        mockMessage = {
            webhookId: "webhook-id",
            inGuild: vi.fn().mockReturnValue(true),
            fetchWebhook: vi.fn(),
            client: mockClient,
        } as unknown as Message;
    });

    it("should not emit an event if the message does not have a webhookId", async () => {
        mockMessage.webhookId = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        await webhookMessageCreate(mockMessage);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the message is not in a guild", async () => {
        vi.spyOn(mockMessage, "inGuild").mockReturnValue(false);

        const emitSpy = vi.spyOn(mockClient, "emit");

        await webhookMessageCreate(mockMessage);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if fetchWebhook fails", async () => {
        vi.spyOn(mockMessage, "fetchWebhook").mockRejectedValue(new Error("Failed to fetch webhook"));

        const emitSpy = vi.spyOn(mockClient, "emit");

        await webhookMessageCreate(mockMessage);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'webhookMessageCreate' with correct parameters", async () => {
        const mockWebhook = { id: "webhook-id" } as Webhook;
        vi.spyOn(mockMessage, "fetchWebhook").mockResolvedValue(mockWebhook);

        const emitSpy = vi.spyOn(mockClient, "emit");

        await webhookMessageCreate(mockMessage);

        expect(emitSpy).toHaveBeenCalledWith("webhookMessageCreate", mockMessage, mockWebhook);
    });
});
