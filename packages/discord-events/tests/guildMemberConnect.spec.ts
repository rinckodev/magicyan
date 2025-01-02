import { VoiceState, Client, GuildMember, VoiceBasedChannel } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { guildMemberConnect } from "../src/events/members/guildMemberConnect";

describe("guildMemberConnect", () => {
    let mockClient: Client;
    let mockOldState: VoiceState;
    let mockNewState: VoiceState;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        const mockChannel = { id: "new-channel-id" } as VoiceBasedChannel;

        mockOldState = {
            channel: null,
            channelId: null,
            member: { id: "member-id" } as GuildMember,
            client: mockClient,
        } as unknown as VoiceState;

        mockNewState = {
            channel: mockChannel,
            channelId: mockChannel.id,
            member: mockOldState.member,
            client: mockClient,
        } as unknown as VoiceState;
    });

    it("should not emit an event if the new channel is null", () => {
        // @ts-ignore
        mockNewState.channel = null;
        mockNewState.channelId = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberConnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the channel ID did not change", () => {
        mockOldState.channelId = mockNewState.channelId;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberConnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the new state does not have a member", () => {
        // @ts-ignore
        mockNewState.member = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberConnect(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'guildMemberConnect' when a member joins a new channel", () => {
        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberConnect(mockOldState, mockNewState);

        expect(emitSpy).toHaveBeenCalledWith(
            "guildMemberConnect",
            mockNewState.member,
            mockNewState.channel,
            mockOldState.channel
        );
    });

    it("should correctly emit when the old channel is not null", () => {
        const oldChannel = { id: "old-channel-id" } as VoiceBasedChannel;
        // @ts-ignore
        mockOldState.channel = oldChannel;
        mockOldState.channelId = oldChannel.id;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberConnect(mockOldState, mockNewState);

        expect(emitSpy).toHaveBeenCalledWith(
            "guildMemberConnect",
            mockNewState.member,
            mockNewState.channel,
            mockOldState.channel
        );
    });
});
