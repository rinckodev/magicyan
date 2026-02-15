import { ComponentInLabelData, isJSONEncodable, LabelBuilder, LabelBuilderData } from "discord.js";
import { Unstable_CheckboxData, Unstable_CheckboxGroupData } from "./checkbox";
import { Unstable_RadioGroupData } from "./radio";

interface CreateLabelData extends Omit<LabelBuilderData, "type" | "component"> {
    component?: LabelBuilderData["component"] | ComponentInLabelData
        | Unstable_CheckboxData
        | Unstable_CheckboxGroupData
        | Unstable_RadioGroupData
}

export function createLabel(data: CreateLabelData): LabelBuilder 
export function createLabel(label: string, description?: string, component?: CreateLabelData["component"], id?: number): LabelBuilder 
export function createLabel(label: string, component?: CreateLabelData["component"], id?: number): LabelBuilder 
export function createLabel(
    a: string | CreateLabelData,
    b?: string | CreateLabelData["component"],
    c?: CreateLabelData["component"] | number,
    d?: number
): LabelBuilder {
    const label = new LabelBuilder();
    if (typeof a === "object"){
        const { component, ...data } = a;
        Object.assign(label.data, { ...data,
            component: isJSONEncodable(component)
                ? component.toJSON()
                : component
        });
        return label;
    }
    if (typeof b === "string"){
        Object.assign(label.data, {
            label: a, description: b,
            ...(typeof c === "number" 
                ? { id: c } 
                : { 
                    component: isJSONEncodable(c) 
                        ? c.toJSON() : c, 
                    id: d
                })
        });
        return label;
    }
    Object.assign(label.data, {
        label: a,
        component: isJSONEncodable(b) ? b.toJSON() : b,
        ...(typeof c === "number" 
                ? { id: c } 
                : {}
        )
    });
    return label;
}