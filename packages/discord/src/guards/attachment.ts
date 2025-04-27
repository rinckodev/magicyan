import { Attachment, AttachmentBuilder } from "discord.js";

export function isAttachment(value: unknown): value is Attachment | AttachmentBuilder {
    return value instanceof Attachment || value instanceof AttachmentBuilder
}