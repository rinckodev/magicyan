import { ActionRowBuilder, TextInputBuilder, TextInputComponentData, TextInputStyle } from "discord.js";
import { createRow } from "./row";

type CreateInputData = Partial<Omit<TextInputComponentData, "type" | "label">>;

export function createTextInput(data: CreateInputData): TextInputBuilder {
    data.style??=TextInputStyle.Short;
    if ("label" in data) delete data.label;
    return new TextInputBuilder(data)
}
/**
 * @deprecated Use {@link createTextInput} instead.
 */
export function createModalInput(data: Omit<TextInputComponentData, "type" | "style"> & { style?: TextInputStyle }): ActionRowBuilder<TextInputBuilder>{
    data.style??=TextInputStyle.Short;
    return createRow(new TextInputBuilder(data));
}