import { type Collection, type ModalSubmitFields, type TextInputComponent, type TextInputComponentData, ActionRowBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { createRow } from "./components/row";

type TextInputData = Omit<TextInputComponentData, "type">;

interface ModalFieldData extends Omit<TextInputData, "style"> {
    style?: TextInputStyle
}
export function createModalInput(data: ModalFieldData): ActionRowBuilder<TextInputBuilder>{
    data.style??=TextInputStyle.Short;
    return createRow(new TextInputBuilder(data));
}
export type ModalFieldsData = Record<string, Omit<ModalFieldData, "customId">>;
export function createModalFields(data: ModalFieldsData): ActionRowBuilder<TextInputBuilder>[]{
    return Object.entries(data).map(
        ([customId, data]) => createModalInput({ customId, ...data })
    );
}

export type ModalFieldsRecord<K extends string> = Record<K, string>;
export function modalFieldsToRecord<K extends string = string>(fields: ModalSubmitInteraction | ModalSubmitFields | Collection<string, TextInputComponent>): ModalFieldsRecord<K> {
    const reduceFunction = (data: ModalFieldsRecord<K>, { customId, value }: TextInputComponent) => ({ ...data, [customId]: value });
    const modalFields = 
    fields instanceof ModalSubmitInteraction ? fields.fields.fields :
    "fields" in fields ? fields.fields : fields;
    return modalFields.reduce(reduceFunction, {} as ModalFieldsRecord<K>);
}

export interface CreateModalData {
    title?: string;
    customId: string;
    components: ModalFieldsData
}
export function createModal(data: CreateModalData){
    return new ModalBuilder({
        title: data.title ?? data.customId,
        customId: data.customId,
        components: createModalFields(data.components)
    });
}