import { ActionRowBuilder, TextInputBuilder, TextInputComponentData } from "discord.js";
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