import { ComponentType } from "discord.js";

export interface Unstable_CheckboxData {
    type: ComponentType.Checkbox,
    customId: string;
    default?: boolean;
    id?: number;
}

export interface Unstable_CheckboxGroupData {
    type: ComponentType.CheckboxGroup,
    id?: number;
    customId: string;
    required?: boolean;
    minValues?: number;
    maxValues?: number;
    options: {
        label: string;
        value: string;
        description?: string;
        default?: boolean;
    }[]
}