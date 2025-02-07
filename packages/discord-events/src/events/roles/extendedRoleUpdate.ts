import { type GuildMember, type Role, AuditLogEvent } from "discord.js";

export type ExtendedRoleUpdateEvent = [oldRole: Role, newRole: Role, executor: GuildMember]

export async function extendedRoleUpdate(oldRole: Role, newRole: Role) {
    const { guild } = newRole;

    await guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete })
    .then(({ entries }) => {
        const auditLogEntry = entries.find(entry => entry.targetId === newRole.id);

        if (!auditLogEntry || !auditLogEntry.executorId) return;

        const member = guild.members.cache.get(auditLogEntry.executorId);
        if (!member) return;

        guild.client.emit("extendedRoleUpdate", oldRole, newRole, member);
    })
    .catch(() => {});
}