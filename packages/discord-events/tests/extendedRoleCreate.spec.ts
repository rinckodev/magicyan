import { AuditLogEvent, Client, Guild, GuildAuditLogsEntry, Role, GuildMember } from "discord.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { extendedRoleCreate } from "../src/events/roles/extendedRoleCreate";

describe("extendedRoleCreate", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockAuditLogEntry: GuildAuditLogsEntry;
    let mockRole: Role;
    let mockMember: GuildMember;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        mockGuild = {
            members: {
                cache: new Map<string, GuildMember>(),
            },
            client: mockClient,
        } as unknown as Guild;

        mockMember = {
            id: "executor-id",
        } as GuildMember;

        mockGuild.members.cache.set(mockMember.id, mockMember);

        mockRole = {
            id: "role-id",
        } as Role;

        mockAuditLogEntry = {
            executorId: mockMember.id,
            action: AuditLogEvent.RoleCreate,
            targetType: "Role",
            target: mockRole,
        } as GuildAuditLogsEntry;
    });

    it("should not emit an event if the action is not RoleCreate", () => {
        mockAuditLogEntry.action = AuditLogEvent.ChannelCreate;

        const emitSpy = vi.spyOn(mockClient, "emit");

        extendedRoleCreate([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the targetType is not Role", () => {
        mockAuditLogEntry.targetType = "Channel";

        const emitSpy = vi.spyOn(mockClient, "emit");

        extendedRoleCreate([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if executorId is missing", () => {
        mockAuditLogEntry.executorId = null;

        const emitSpy = vi.spyOn(mockClient, "emit");

        extendedRoleCreate([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the executor is not in the member cache", () => {
        mockGuild.members.cache.delete(mockMember.id);

        const emitSpy = vi.spyOn(mockClient, "emit");

        extendedRoleCreate([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'extendedRoleCreate' with correct parameters", () => {
        const emitSpy = vi.spyOn(mockClient, "emit");

        extendedRoleCreate([mockAuditLogEntry, mockGuild]);

        expect(emitSpy).toHaveBeenCalledWith("extendedRoleCreate", mockRole, mockMember);
    });
});
