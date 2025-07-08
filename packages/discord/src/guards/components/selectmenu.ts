import { ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { hasConstructor } from "../utils";

export type AnySelectMenuBuilder =
    | StringSelectMenuBuilder
    | UserSelectMenuBuilder
    | RoleSelectMenuBuilder
    | ChannelSelectMenuBuilder
    | MentionableSelectMenuBuilder

export function isStringSelectMenuBuilder(value: unknown): value is StringSelectMenuBuilder {
  return value instanceof StringSelectMenuBuilder ||
    (hasConstructor(value) && value.constructor.name === StringSelectMenuBuilder.name);
}

export function isUserSelectMenuBuilder(value: unknown): value is UserSelectMenuBuilder {
  return value instanceof UserSelectMenuBuilder ||
    (hasConstructor(value) && value.constructor.name === UserSelectMenuBuilder.name);
}

export function isRoleSelectMenuBuilder(value: unknown): value is RoleSelectMenuBuilder {
  return value instanceof RoleSelectMenuBuilder ||
    (hasConstructor(value) && value.constructor.name === RoleSelectMenuBuilder.name);
}

export function isChannelSelectMenuBuilder(value: unknown): value is ChannelSelectMenuBuilder {
  return value instanceof ChannelSelectMenuBuilder ||
    (hasConstructor(value) && value.constructor.name === ChannelSelectMenuBuilder.name);
}

export function isMentionableSelectMenuBuilder(value: unknown): value is MentionableSelectMenuBuilder {
  return value instanceof MentionableSelectMenuBuilder ||
    (hasConstructor(value) && value.constructor.name === MentionableSelectMenuBuilder.name);
}

export function isAnySelectMenuBuilder(value: unknown): value is AnySelectMenuBuilder {
  return isStringSelectMenuBuilder(value) ||
    isUserSelectMenuBuilder(value) ||
    isRoleSelectMenuBuilder(value) ||
    isChannelSelectMenuBuilder(value) ||
    isMentionableSelectMenuBuilder(value);
}