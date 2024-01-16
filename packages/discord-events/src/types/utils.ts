import { Role } from "discord.js";

export type NestedPartial<T> = {
    [K in keyof T]?: NestedPartial<T[K]>;
}

export type DeletedRole = { id: string };
export type RoleChanges = { -readonly[K in keyof Role]?: { old?: Role[K], new?: Role[K] } }