import { ButtonBuilder } from "discord.js";

export function isButtonBuilder(value: unknown): value is ButtonBuilder {
    return value instanceof ButtonBuilder;
}