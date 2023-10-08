import { InteractionButtonComponentData } from "discord.js";
import { Prettify } from "../utils";
type ButtonPresetData = Partial<Omit<InteractionButtonComponentData, "type">>;
export declare function createButtonPreset(data: Prettify<ButtonPresetData>): ButtonPresetData;
export {};
