import { AuditLogEvent, Client, Guild, GuildAuditLogsEntry, GuildMember, NonThreadGuildBasedChannel } from "discord.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { extendedChannelDelete } from "../src/events/channels/extendedChannelDelete";

describe("extendedChannelDelete", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockChannel: NonThreadGuildBasedChannel;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;
        mockGuild = {
            fetchAuditLogs: vi.fn(),
            members: {
                cache: new Map<string, GuildMember>(),
            },
            client: mockClient,
        } as unknown as Guild;

        mockChannel = {
            id: "test-channel-id",
            isDMBased: vi.fn(() => false),
            guild: mockGuild,
        } as unknown as NonThreadGuildBasedChannel;
    });

    it("should return early if the channel is DM-based", () => {
        // @ts-ignore
        mockChannel.isDMBased = vi.fn(() => true);

        extendedChannelDelete(mockChannel);

        expect(mockGuild.fetchAuditLogs).not.toHaveBeenCalled();
    });

    it("should not emit an event if no matching audit log entry is found", async () => {
        mockGuild.fetchAuditLogs = vi.fn().mockResolvedValue({
            entries: {
                find: vi.fn(() => null),
            },
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedChannelDelete(mockChannel);

        expect(mockGuild.fetchAuditLogs).toHaveBeenCalledWith({ type: AuditLogEvent.ChannelDelete });
        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'extendedChannelDelete' if a matching audit log entry is found", async () => {
        const mockMember = { id: "executor-id" } as GuildMember;
        const mockAuditLogEntry = {
            targetId: mockChannel.id,
            executorId: "executor-id",
        } as unknown as GuildAuditLogsEntry;

        mockGuild.fetchAuditLogs = vi.fn().mockResolvedValue({
            entries: {
                find: vi.fn(() => mockAuditLogEntry),
            },
        });
        mockGuild.members.cache.set("executor-id", mockMember);

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedChannelDelete(mockChannel);

        expect(mockGuild.fetchAuditLogs).toHaveBeenCalledWith({ type: AuditLogEvent.ChannelDelete });
        expect(emitSpy).toHaveBeenCalledWith("extendedChannelDelete", mockChannel, mockMember);
    });

    it("should not emit an event if the executor is not found in the member cache", async () => {
        const mockAuditLogEntry = {
            targetId: mockChannel.id,
            executorId: "executor-id",
        } as unknown as GuildAuditLogsEntry;

        mockGuild.fetchAuditLogs = vi.fn().mockResolvedValue({
            entries: {
                find: vi.fn(() => mockAuditLogEntry),
            },
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedChannelDelete(mockChannel);

        expect(mockGuild.fetchAuditLogs).toHaveBeenCalledWith({ type: AuditLogEvent.ChannelDelete });
        expect(emitSpy).not.toHaveBeenCalled();
    });
});
