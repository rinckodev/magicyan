import { isDefined } from "@magicyan/core";
import { Collection, ComponentType, LabelBuilder, LabelComponentData, ModalData, TextDisplayBuilder, TextDisplayComponentData } from "discord.js";

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

export function modalFieldsToRecord<T = ModalFieldsRecord>(data: ResolveModalData): ModalFieldsRecord
export function modalFieldsToRecord<T = ModalFieldsRecord>(data: ResolveModalData, parse: (record: ModalFieldsRecord) => T): T
export function modalFieldsToRecord<T = ModalFieldsRecord>(data: ResolveModalData, parse?: (record: ModalFieldsRecord) => T): ModalFieldsRecord | T {
    const collection = "fields" in data
        ? "fields" in data.fields
            ? data.fields.fields
            : data.fields
        : data;

    const record = collection.reduce((acc, data) => {
        acc[data.customId] = data.type === ComponentType.TextInput
            ? data.value : Array.from(data.values??[]);

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