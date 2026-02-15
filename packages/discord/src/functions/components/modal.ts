import { isDefined } from "@magicyan/core";
import { Attachment, Collection, ComponentType, LabelBuilder, LabelComponentData, ModalBuilder, ModalData, TextDisplayBuilder, TextDisplayComponentData } from "discord.js";

type ModalComponents =
    | LabelBuilder
    | TextDisplayBuilder
    | string
    | null
    | boolean
    | undefined

type ResolveModalData =
    | { fields: { fields: Collection<string, ModalData> } }
    | { fields: Collection<string, ModalData> }
    | Collection<string, ModalData>;

type ModalFieldsRecord = Record<string, string | string[]>;

/**
 * Converts modal submitted fields into a plain record object, mapping each component `customId` to its value.
 *
 * This function supports multiple modal submission data shapes coming from Discord.js,
 * automatically extracting and normalizing values from:
 * - Text input fields (`ComponentType.TextInput`) → string
 * - Select menus & other multi-value components → string[]
 * - File upload fields (`ComponentType.FileUpload`) → string[] of attachment URLs
 *
 * Optionally, a parser callback may be provided to transform the resulting record before returning it.
 *
 * @template T The expected return type after optional parsing.
 * @param {ResolveModalData} data - The modal submission data, usually from an interaction.
 * @param {(record: ModalFieldsRecord) => T} [parse] - Optional transform function applied to the resulting record.
 * @returns {ModalFieldsRecord | T} The processed fields as a record, or the parser result if provided.
 *
 * @example
 * ```ts
 * const fields = modalFieldsToRecord(interaction.fields);
 * console.log(fields.username); // "JohnDoe"
 * ```
 *
 * @example With parsing
 * ```ts
 * const result = modalFieldsToRecord(interaction.fields, fields => ({
 *   name: fields.username.trim(),
 *   age: Number.parseInt(fields.age),
 * }));
 * ```
 */
export function modalFieldsToRecord<const T = ModalFieldsRecord>(data: ResolveModalData): T
export function modalFieldsToRecord<const T = ModalFieldsRecord>(data: ResolveModalData, parse: (record: ModalFieldsRecord) => T): T
export function modalFieldsToRecord<const T = ModalFieldsRecord>(data: ResolveModalData, parse?: (record: ModalFieldsRecord) => T): ModalFieldsRecord | T {
    const collection = "fields" in data
        ? "fields" in data.fields
            ? data.fields.fields
            : data.fields
        : data;

    const record = collection.reduce((acc, data) => {
        if (data.type === ComponentType.TextInput){
            acc[data.customId] = data.value;
            return acc;
        }
        if (data.type === ComponentType.FileUpload){
            //@ts-ignore
            const attachments = data.attachments as Collection<string, Attachment> | undefined;
            acc[data.customId] = Array
                .from(attachments?.values()??[])
                .map(data => data.url);
            return acc;
        }
        acc[data.customId] = Array.from(data.values ?? []);
        return acc;
    }, {} as ModalFieldsRecord);

    return parse ? parse(record) : record;
}

type ModalFields = (LabelComponentData | TextDisplayComponentData)[];

export function createModalFields(...components: ModalComponents[]): ModalFields {
    return components
        .filter(v => isDefined(v) && typeof v !== "boolean")
        .map(data => {
            if (typeof data === "string") return {
                type: ComponentType.TextDisplay,
                content: data
            } satisfies TextDisplayComponentData;
            return data.data as unknown as LabelComponentData
        });
}

export interface CreateModalOptions {
    customId: string;
    title: string;
    components: ModalComponents[]
}
export function createModal(data: Partial<CreateModalOptions>): ModalBuilder 
export function createModal(customId: string): ModalBuilder
export function createModal(customId: string, title: string): ModalBuilder
export function createModal(customId: string, title: string, ...components: ModalComponents[]): ModalBuilder
export function createModal(
    data: string | Partial<CreateModalOptions>, 
    title?: string,
    ...components: ModalComponents[]
): ModalBuilder {
    if (typeof data === "string"){
        return new ModalBuilder({
            customId: data,
            title,
            components: createModalFields(...components)
        });
    }
    return new ModalBuilder({
        customId: data.title,
        title: data.title,
        components: createModalFields(...data.components??[])
    });
}