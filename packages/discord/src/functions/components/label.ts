import { ComponentInLabelData, isJSONEncodable, LabelBuilder, LabelBuilderData } from "discord.js";

interface CreateLabelData extends Omit<LabelBuilderData, "type" | "component"> {
    component?: LabelBuilderData["component"] | ComponentInLabelData
}

/**
 * Creates a label component using an object configuration.
 * 
 * This overload is useful when you already have your label data
 * structured in an object. Each field maps directly to the
 * {@link LabelBuilderData} properties (except `type`).
 * 
 * The `component` field can be either raw data or a JSON-encodable builder.
 *
 * @param data - The configuration object containing label properties.
 * @returns A new {@link LabelBuilder} instance configured with the provided data.
 *
 * @example
 * ```ts
 * const label = createLabel({
 *   label: "Username",
 *   description: "Enter your username",
 *   component: textInput
 * });
 * ```
 */
export function createLabel(data: CreateLabelData): LabelBuilder 
/**
 * Creates a label component with label, description and optional component.
 * 
 * Use this overload when you want to explicitly define the label text,
 * description and optionally attach a component.
 *
 * @param label - The main label text.
 * @param description - Additional descriptive text for the label.
 * @param component - Optional component associated with the label.
 * @param id - Optional numeric identifier for the component.
 * @returns A new {@link LabelBuilder} instance configured with the provided values.
 *
 * @example
 * ```ts
 * const label = createLabel(
 *   "Username",
 *   "Enter your username",
 *   textInput,
 *   1
 * );
 * ```
 */
export function createLabel(label: string, description?: string, component?: CreateLabelData["component"], id?: number): LabelBuilder 
/**
 * Creates a label component with a label and optional component.
 * 
 * Use this overload when you don't need a description and want
 * a simpler way to attach a component.
 *
 * @param label - The main label text.
 * @param component - Optional component associated with the label.
 * @param id - Optional numeric identifier for the component.
 * @returns A new {@link LabelBuilder} instance configured with the provided values.
 *
 * @example
 * ```ts
 * const label = createLabel("Username", textInput, 1);
 * ```
 */
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