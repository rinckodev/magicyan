import { type Client } from "discord.js";
import { guildChannelDelete, type GuildChannelDeleteEvent } from "./events/channels/extendedChannelDelete";
import { guildMemberConnect, type GuildMemberConnectEvent } from "./events/members/guildMemberConnect";
import { guildMemberDisconnect, type GuildMemberDisconnectEvent } from "./events/members/guildMemberDisconnect";
import { guildMemberMoved, type GuildMemberMovedEvent } from "./events/members/guildMemberMoved";
import { guildMemberTimeoutAdd, type GuildMemberTimeoutAddEvent } from "./events/members/guildMemberTimeoutAdd";
import { guildMemberTimeoutRemove, type GuildMemberTimeoutRemoveEvent } from "./events/members/guildMemberTimeoutRemove";
import { webhookMessageCreate, type WebhookMessageCreate } from "./events/messages/webhookMessageCreate";
import { extendedRoleCreate, type ExtendedRoleCreateEvent } from "./events/roles/extendedRoleCreate";
import { extendedRoleDelete, type ExtendedRoleDeleteEvent } from "./events/roles/extendedRoleDelete";
import { extendedRoleUpdate, type ExtendedRoleUpdateEvent } from "./events/roles/extendedRoleUpdate";
import { userBanAdd, type UserBanAddEvent } from "./events/users/userBanAdd";
import { userBanRemove, type UserBanRemoveEvent } from "./events/users/userBanRemove";
import { userKick, type UserKickEvent } from "./events/users/userKick";

export function initDiscordEvents(client: Client){
    client.on("guildAuditLogEntryCreate", function(...args){
        extendedRoleCreate(args);
        userBanAdd(args);
        userBanRemove(args);
        userKick(args);
        guildMemberTimeoutAdd(args);
        guildMemberTimeoutRemove(args);
    });
    
    client.on("roleDelete", function(role){
        extendedRoleDelete(role);
    });

    client.on("roleUpdate", function(oldRole, newRole){
        extendedRoleUpdate(oldRole, newRole);
    });

    client.on("channelDelete", function(channel){
        guildChannelDelete(channel);
    });

    client.on("voiceStateUpdate", function(oldState, newState){
        guildMemberConnect(oldState, newState);
        guildMemberDisconnect(oldState, newState);
        guildMemberMoved(oldState, newState);
    });

    client.on("messageCreate", function(message){
        webhookMessageCreate(message);
    });
}
interface MagicyanEvents {
    extendedRoleCreate: ExtendedRoleCreateEvent;
    extendedRoleDelete: ExtendedRoleDeleteEvent;   
    extendedRoleUpdate: ExtendedRoleUpdateEvent;

    guildChannelDelete: GuildChannelDeleteEvent;

    guildMemberConnect: GuildMemberConnectEvent;
    guildMemberDisconnect: GuildMemberDisconnectEvent;
    guildMemberMoved: GuildMemberMovedEvent;
    
    guildMemberTimeoutAdd: GuildMemberTimeoutAddEvent;
    guildMemberTimeoutRemove: GuildMemberTimeoutRemoveEvent;

    webhookMessageCreate: WebhookMessageCreate;
    
    userBanAdd: UserBanAddEvent;
    userBanRemove: UserBanRemoveEvent;
    userKick: UserKickEvent;
}

declare module "discord.js" {
	interface ClientEvents extends MagicyanEvents {}
}
