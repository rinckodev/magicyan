import { Client, Guild, GuildAuditLogsEntry, Role, GuildMember } from "discord.js";
import { vi, Mock, describe, it, expect, beforeEach } from "vitest";
import { extendedRoleUpdate } from "../src/events/roles/extendedRoleUpdate";

describe("extendedRoleUpdate", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockOldRole: Role;
    let mockNewRole: Role;
    let mockMember: GuildMember;

    beforeEach(() => {
        mockClient = new Client({ intents: [] }) as unknown as Client;

        mockGuild = {
            members: {
                cache: new Map<string, GuildMember>(),
            },
            fetchAuditLogs: vi.fn(),
            client: mockClient,
        } as unknown as Guild;

        mockMember = {
            id: "executor-id",
        } as GuildMember;

        mockGuild.members.cache.set(mockMember.id, mockMember);

        mockOldRole = {
            id: "old-role-id",
            guild: mockGuild,
        } as Role;

        mockNewRole = {
            id: "new-role-id",
            guild: mockGuild,
        } as Role;
    });

    it("should not emit an event if no audit log entry matches the new role ID", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleUpdate(mockOldRole, mockNewRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the audit log entry lacks an executor ID", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockNewRole.id, executorId: null } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleUpdate(mockOldRole, mockNewRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the executor is not found in the member cache", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockNewRole.id, executorId: "unknown-id" } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleUpdate(mockOldRole, mockNewRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'extendedRoleUpdate' with correct parameters", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockNewRole.id, executorId: mockMember.id } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleUpdate(mockOldRole, mockNewRole);

        expect(emitSpy).toHaveBeenCalledWith("extendedRoleUpdate", mockOldRole, mockNewRole, mockMember);
    });

    it("should handle errors gracefully", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockRejectedValue(new Error("Audit log fetch failed"));

        const emitSpy = vi.spyOn(mockClient, "emit");

        await expect(extendedRoleUpdate(mockOldRole, mockNewRole)).resolves.toBeUndefined();
        expect(emitSpy).not.toHaveBeenCalled();
    });
});
