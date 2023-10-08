import { InteractionButtonComponentData } from "discord.js";
import { Prettify } from "../utils";

type ButtonPresetData = Partial<Omit<InteractionButtonComponentData, "type">>

export function createButtonPreset(data: Prettify<ButtonPresetData>): ButtonPresetData{
    return data;
}