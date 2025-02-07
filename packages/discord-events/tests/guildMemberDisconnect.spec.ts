import { VoiceState, Client, GuildMember, VoiceBasedChannel } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { guildMemberDisconnect } from "../src/events/members/guildMemberDisconnect";

describe("guildMemberDisconnect", () => {
    let mockClient: Client;
    let mockOldState: VoiceState;
    let mockNewState: VoiceState;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        const mockOldChannel = { id: "old-channel-id" } as VoiceBasedChannel;

        mockOldState = {
            channel: mockOldChannel,
            channelId: mockOldChannel.id,
            member: { id: "member-id" } as GuildMember,
            client: mockClient,
        } as unknown as VoiceState;

        mockNewState = {
            channel: null,
            channelId: null,
            member: mockOldState.member,
            client: mockClient,
        } as unknown as VoiceState;
    });

    it("should not emit an event if the old channel is null", () => {
        // @ts-ignore
        mockOldState.channel = null;
        mockOldState.channelId = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberDisconnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the new state does not have a member", () => {
        // @ts-ignore
        mockNewState.member = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberDisconnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the channel ID did not change", () => {
        mockNewState.channelId = mockOldState.channelId;
        // @ts-ignore
        mockNewState.channel = mockOldState.channel;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberDisconnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'guildMemberDisconnect' when a member disconnects from a channel", () => {
        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberDisconnect(mockOldState, mockNewState);

        expect(emitSpy).toHaveBeenCalledWith(
            "guildMemberDisconnect",
            mockNewState.member,
            mockOldState.channel,
            mockNewState.channel
        );
    });

    it("should correctly emit when the member moves to a new channel", () => {
        const newChannel = { id: "new-channel-id" } as VoiceBasedChannel;
        // @ts-ignore
        mockNewState.channel = newChannel;
        mockNewState.channelId = newChannel.id;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberDisconnect(mockOldState, mockNewState);

        expect(emitSpy).toHaveBeenCalledWith(
            "guildMemberDisconnect",
            mockNewState.member,
            mockOldState.channel,
            mockNewState.channel
        );
    });
});
