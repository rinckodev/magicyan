import { type EmbedFooterData } from "discord.js";
import { chars } from "../../constants/chars";

export type EmbedPlusFooterData = { text?: string | null; iconURL?: string | null; }

export function createEmbedFooter(options: EmbedPlusFooterData): EmbedFooterData | undefined {
    const { text, iconURL } = options;
    return !text && !iconURL ? undefined 
    : { text: text || chars.invisible, iconURL: iconURL || undefined };
}