import { ComponentType } from "discord.js";

export interface Unstable_RadioGroupData {
    type: ComponentType.RadioGroup,
    id?: number;
    customId: string;
    required?: boolean;
    options: {
        label: string;
        value: string;
        description?: string;
        default?: boolean;
    }[]
}