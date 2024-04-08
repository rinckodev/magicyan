import { ActionRowBuilder, Collection, ModalSubmitFields, TextInputBuilder, TextInputComponent, TextInputComponentData } from "discord.js";
import { createRow } from "./components";

type TextInputData = Omit<TextInputComponentData, "type">;

type CreateModalInputData = TextInputData;
export function createModalInput(data: CreateModalInputData): ActionRowBuilder<TextInputBuilder>{
    return createRow(new TextInputBuilder(data));
}

type ModalFieldsData = Record<string, Omit<TextInputData, "customId">>;
export function createModalFields(data: ModalFieldsData): ActionRowBuilder<TextInputBuilder>[]{
    return Object.entries(data).map(
        ([customId, data]) => createModalInput(Object.assign({ customId }, data))
    );
}

type ModalFieldsRecord = Record<string, string>;
export function modalFieldsToRecord(fields: ModalSubmitFields | Collection<string, TextInputComponent>): ModalFieldsRecord {
    const reduceFunction = (data: ModalFieldsRecord, { customId, value }: TextInputComponent) => 
        Object.assign(data, { [customId]: value }
    );
    const modalFields = "fields" in fields ? fields.fields : fields;
    return modalFields.reduce(reduceFunction, {});
}