import { Client, Guild, GuildAuditLogsEntry, Role, GuildMember } from "discord.js";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import { extendedRoleDelete } from "../src/events/roles/extendedRoleDelete";

describe("extendedRoleDelete", () => {
    let mockClient: Client;
    let mockGuild: Guild;
    let mockRole: Role;
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

        mockRole = {
            id: "role-id",
            guild: mockGuild,
        } as Role;
    });

    it("should not emit an event if no audit log entry matches the role ID", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleDelete(mockRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the audit log entry lacks an executor ID", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockRole.id, executorId: null } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleDelete(mockRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should not emit an event if the executor is not found in the member cache", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockRole.id, executorId: "unknown-id" } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleDelete(mockRole);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it("should emit 'extendedRoleDelete' with correct parameters", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockResolvedValue({
            entries: [
                { targetId: mockRole.id, executorId: mockMember.id } as GuildAuditLogsEntry,
            ],
        });

        const emitSpy = vi.spyOn(mockClient, "emit");

        await extendedRoleDelete(mockRole);

        expect(emitSpy).toHaveBeenCalledWith("extendedRoleDelete", mockRole, mockMember);
    });

    it("should handle errors gracefully", async () => {
        (mockGuild.fetchAuditLogs as Mock).mockRejectedValue(new Error("Audit log fetch failed"));

        const emitSpy = vi.spyOn(mockClient, "emit");

        await expect(extendedRoleDelete(mockRole)).resolves.toBeUndefined();
        expect(emitSpy).not.toHaveBeenCalled();
    });
});
