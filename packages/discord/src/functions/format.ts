import { GuildBasedChannel, Role, User, channelMention, roleMention, userMention } from "discord.js";

export function formatedMention(ref: GuildBasedChannel | Role | User | undefined | null, alt: string=""){
    return ref instanceof Role ? roleMention(ref.id)
    : ref instanceof User ? userMention(ref.id)
    : ref ? channelMention(ref.id) : alt;
}