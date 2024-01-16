import { guildMemberConnect } from "./members/guildMemberConnect";
import { guildMemberDisconnect } from "./members/guildMemberDisconnect";
import { guildMemberMoved } from "./members/guildMemberMoved";
import { guildMemberTimeoutAdd } from "./members/guildMemberTimeoutAdd";
import { guildMemberTimeoutRemove } from "./members/guildMemberTimeoutRemove";
import { webhookMessageCreate } from "./messages/webhookMessageCreate";
import { extendedRoleCreate } from "./roles/extendedRoleCreate";
import { extendedRoleDelete } from "./roles/extendedRoleDelete";
import { extendedRoleUpdate } from "./roles/extendedRoleUpdate";
import { userBanAdd } from "./users/userBanAdd";
import { userBanRemove } from "./users/userBanRemove";
import { userKick } from "./users/userKick";

export const listeners = {
    webhookMessageCreate,
    guildMemberConnect,
    guildMemberDisconnect,
    guildMemberMoved,
    guildMemberTimeoutAdd,
    guildMemberTimeoutRemove,
    userBanAdd,
    userBanRemove,
    userKick,
    extendedRoleCreate,
    extendedRoleUpdate,
    extendedRoleDelete,
} as const;