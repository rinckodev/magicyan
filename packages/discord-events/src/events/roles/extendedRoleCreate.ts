import { type GuildMember, AuditLogEvent, ClientEvents, Role} from "discord.js";

export type ExtendedRoleCreateEvent = [role: Role, executor: GuildMember]

export function extendedRoleCreate([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { executorId, action, target, targetType } = auditLogEntry;
    if (action !== AuditLogEvent.RoleCreate) return;
    if (targetType !== "Role") return;
    if (!executorId) return;
    
    const member = guild.members.cache.get(executorId);
    if (!member) return;

    guild.client.emit("extendedRoleCreate", target as Role, member);
}