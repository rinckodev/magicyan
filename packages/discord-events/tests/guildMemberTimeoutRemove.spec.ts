import { AuditLogEvent, Client, Guild, GuildMember } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { guildMemberTimeoutRemove } from "../src/events/members/guildMemberTimeoutRemove";

describe("guildMemberTimeoutRemove", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockAuditLogEntry: any;
    let mockMember: GuildMember;
    let mockExecutor: GuildMember;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        mockGuild = {
            members: {
                cache: new Map<string, GuildMember>(),
            },
            client: mockClient,
        } as unknown as Guild;

        mockMember = { id: "member-id" } as GuildMember;
        mockExecutor = { id: "executor-id" } as GuildMember;

        mockGuild.members.cache.set(mockMember.id, mockMember);
        mockGuild.members.cache.set(mockExecutor.id, mockExecutor);

        mockAuditLogEntry = {
            action: AuditLogEvent.MemberUpdate,
            changes: [{ key: "communication_disabled_until", old: new Date().toISOString(), new: undefined }],
            targetId: mockMember.id,
            targetType: "User",
            executorId: mockExecutor.id,
        };
    });

    it("should not emit an event if changes key is not 'communication_disabled_until'", () => {
        mockAuditLogEntry.changes[0].key = "nickname";

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if action is not MemberUpdate", () => {
        mockAuditLogEntry.action = AuditLogEvent.MemberBanAdd;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if changes.old is not a string", () => {
        mockAuditLogEntry.changes[0].old = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if changes.new is not undefined", () => {
        mockAuditLogEntry.changes[0].new = "some value";

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if targetType is not 'User'", () => {
        mockAuditLogEntry.targetType = "Role";

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if executorId or targetId is missing", () => {
        mockAuditLogEntry.executorId = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if member or executor is not found in the guild cache", () => {
        mockGuild.members.cache.delete(mockMember.id);

        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'guildMemberTimeoutRemove' with correct parameters", () => {
        const emitSpy = vi.spyOn(mockClient, "emit");

        guildMemberTimeoutRemove([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).toHaveBeenCalledWith("guildMemberTimeoutRemove", mockMember, mockExecutor);
    });
});
