import { ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";

export type AnySelectMenuBuilder = 
| StringSelectMenuBuilder
| UserSelectMenuBuilder
| RoleSelectMenuBuilder
| ChannelSelectMenuBuilder
| MentionableSelectMenuBuilder

export function isAnySelectMenuBuilder(value: unknown): value is AnySelectMenuBuilder {
    return value instanceof StringSelectMenuBuilder ||
        value instanceof UserSelectMenuBuilder ||
        value instanceof RoleSelectMenuBuilder ||
        value instanceof ChannelSelectMenuBuilder ||
        value instanceof MentionableSelectMenuBuilder;
}