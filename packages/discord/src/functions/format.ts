import { GuildBasedChannel, Role, User, channelMention, roleMention, userMention } from "discord.js";

type MentionType = "channel" | "role" | "user";
type GetMentionType<T extends MentionType> = string | null | undefined |
(
    T extends "channel" ? GuildBasedChannel : 
    T extends "role" ? Role : 
    T extends "user" ? User : 
    never 
)
export const formated = {
    mention<T extends MentionType>(type: T, ref: GetMentionType<T>, alt:string="") {
        const id = ref?.toString();
        return {
            channel: id ? channelMention(id) : alt,
            user: id ? userMention(id) : alt,
            role: id ? roleMention(id) : alt,
        }[type]
    },
}