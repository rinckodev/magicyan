import { type Collection, type ModalSubmitFields, type TextInputComponent, type TextInputComponentData, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { createRow } from "./components";

type TextInputData = Omit<TextInputComponentData, "type">;

interface ModalFieldData extends Omit<TextInputData, "customId" | "style"> {
    style?: TextInputStyle
}
export function createModalInput(data: ModalFieldData & { customId: string }): ActionRowBuilder<TextInputBuilder>{
    data.style??=TextInputStyle.Short;
    return createRow(new TextInputBuilder(data));
}
type ModalFieldsData = Record<string, ModalFieldData>;
export function createModalFields(data: ModalFieldsData): ActionRowBuilder<TextInputBuilder>[]{
    return Object.entries(data).map(
        ([customId, data]) => createModalInput(Object.assign({ customId }, data))
    );
}

type ModalFieldsRecord<K extends string> = Record<K, string>;
export function modalFieldsToRecord<K extends string = string>(fields: ModalSubmitFields | Collection<string, TextInputComponent>): ModalFieldsRecord<K> {
    const reduceFunction = (data: ModalFieldsRecord<K>, { customId, value }: TextInputComponent) => 
        Object.assign(data, { [customId]: value }
    );
    const modalFields = "fields" in fields ? fields.fields : fields;
    return modalFields.reduce(reduceFunction, {} as ModalFieldsRecord<K>);
}