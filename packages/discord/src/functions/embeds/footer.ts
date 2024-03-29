import { notFound } from "@magicyan/core";
import { EmbedFooterData } from "discord.js";
import { chars } from "../../constants/chars";

interface CreateEmbedFooterOptions {
    text?: string | null;
    iconURL?: string | null;
}
export function createEmbedFooter(options: CreateEmbedFooterOptions): EmbedFooterData | undefined {
    const { text, iconURL } = options;
    return !text && !iconURL ? undefined 
    : { text: text ?? chars.invisible, iconURL: notFound(iconURL) };
}