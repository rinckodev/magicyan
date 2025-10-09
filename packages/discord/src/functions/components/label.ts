import { LabelBuilder, LabelBuilderData } from "discord.js";

export type CreateLabelData = Omit<LabelBuilderData, "type">

export type ComponentInLabelBuilder = NonNullable<CreateLabelData["component"]>;

export function createLabel(data: CreateLabelData): LabelBuilder 
export function createLabel(label: string, description?: string, component?: ComponentInLabelBuilder, id?: number): LabelBuilder 
export function createLabel(label: string, component?: ComponentInLabelBuilder, id?: number): LabelBuilder 
export function createLabel(
    argA: string | CreateLabelData,
    argB?: string | ComponentInLabelBuilder,
    argC?: ComponentInLabelBuilder | number,
    argD?: number
): LabelBuilder {
    if (typeof argA === "object"){
        const { component, ...data } = argA;
        return new LabelBuilder({
            ...data,  component: component?.toJSON()
        });
    }
    if (typeof argB === "string"){
        return new LabelBuilder({
            label: argA, 
            description: argB,
            ...(typeof argC === "number" 
                ? { id: argC } 
                : { component: argC?.toJSON(), id: argD })
        });
    }
    return new LabelBuilder({
        label: argA,
        component: argB?.toJSON(),
        ...(typeof argC === "number" 
                ? { id: argC } 
                : {}
        )
    }) 
}