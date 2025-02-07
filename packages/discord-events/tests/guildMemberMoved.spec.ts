import { VoiceState, Client, GuildMember, VoiceBasedChannel, Guild } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { guildMemberMoved } from "../src/events/members/guildMemberMoved";

describe("guildMemberMoved", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockOldState: VoiceState;
    let mockNewState: VoiceState;
    let mockOldChannel: VoiceBasedChannel;
    let mockNewChannel: VoiceBasedChannel;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;
        mockOldChannel = { id: "old-channel-id" } as VoiceBasedChannel;
        mockNewChannel = { id: "new-channel-id" } as VoiceBasedChannel;
        mockGuild = {
            fetchAuditLogs: vi.fn().mockResolvedValue({
                entries: [
                    {
                        extra: { channel: { id: mockNewChannel.id } },
                        executor: { id: "executor-id" },
                    },
                ],
            }),
            members: {
                cache: new Map([
                    ["executor-id", { id: "executor-id" } as GuildMember],
                ]),
            },
        } as unknown as Guild;

        mockOldState = {
            channel: mockOldChannel,
            channelId: mockOldChannel.id,
            member: { id: "member-id" } as GuildMember,
        } as unknown as VoiceState;

        mockNewState = {
            channel: mockNewChannel,
            channelId: mockNewChannel.id,
            member: mockOldState.member,
            guild: mockGuild,
            client: mockClient,
        } as unknown as VoiceState;
    });

    it("should not emit an event if the old channel is null", () => {
        //@ts-ignore
        mockOldState.channel = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the new channel is null", () => {
        //@ts-ignore
        mockNewState.channel = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the channel ID has not changed", () => {
        mockNewState.channelId = mockOldState.channelId;
        //@ts-ignore
        mockNewState.channel = mockOldState.channel;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the new state does not have a member", () => {
        //@ts-ignore
        mockNewState.member = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the audit log does not contain an entry for the channel", async () => {
        mockGuild.fetchAuditLogs = vi.fn().mockResolvedValue({
            entries: [],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the executor is not found in the guild", async () => {
        mockGuild.members.cache.delete("executor-id");

        const emitSpy = vi.spyOn(mockClient, "emit");

        await guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'guildMemberMoved' with correct parameters", async () => {
        const emitSpy = vi.spyOn(mockClient, "emit");

        await guildMemberMoved(mockOldState, mockNewState);

        expect(emitSpy).toHaveBeenCalledWith(
            "guildMemberMoved",
            mockNewState.member,
            { id: "executor-id" },
            mockOldChannel,
            mockNewChannel
        );
    });
});
