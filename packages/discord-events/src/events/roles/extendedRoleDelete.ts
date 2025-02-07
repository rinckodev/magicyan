import { type GuildMember, type Role, AuditLogEvent } from "discord.js";

export type ExtendedRoleDeleteEvent = [role: Role, executor: GuildMember]

export async function extendedRoleDelete(role: Role) {
    const { guild } = role;

    await guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete })
    .then(({ entries }) => {
        const auditLogEntry = entries.find(entry => entry.targetId === role.id);

        if (!auditLogEntry || !auditLogEntry.executorId) return;

        const member = guild.members.cache.get(auditLogEntry.executorId);
        if (!member) return;

        guild.client.emit("extendedRoleCreate", role, member);
    })
    .catch(() => {});
}