import { CheckboxBuilder, CheckboxGroupBuilder, CheckboxGroupComponentData, type CheckboxComponentData } from "discord.js";

export type CreateCheckboxData = Omit<CheckboxComponentData, "type">;

/**
 * Creates a checkbox component using an object configuration.
 * 
 * This overload is useful when you already have your checkbox data
 * structured in an object. Each field maps directly to the
 * {@link CheckboxComponentData} properties (except `type`).
 *
 * @param data - The configuration object containing checkbox properties.
 * @returns A new {@link CheckboxBuilder} instance configured with the provided data.
 *
 * @example
 * ```ts
 * const checkbox = createCheckbox({
 *   customId: "accept_terms",
 *   default: true
 * });
 * ```
 */
export function createCheckbox(data: CreateCheckboxData): CheckboxBuilder
/**
 * Creates a checkbox component using explicit parameters.
 * 
 * Use this overload when you want a simpler and more direct way
 * to define the checkbox without creating an object.
 *
 * @param customId - The custom identifier for the checkbox component.
 * @param defaultValue - Whether the checkbox should be checked by default.
 * @param id - Optional numeric identifier for the component.
 * @returns A new {@link CheckboxBuilder} instance configured with the provided values.
 *
 * @example
 * ```ts
 * const checkbox = createCheckbox("accept_terms", true, 1);
 * ```
 */
export function createCheckbox(customId: string, defaultValue?: boolean, id?: number): CheckboxBuilder
export function createCheckbox(a: CreateCheckboxData | string, b?: boolean, c?: number) {
    const builder = new CheckboxBuilder();
    if (typeof a === "string") {
        Object.assign(builder.data, {
            custom_id: a,
            default: b,
            id: c
        });
        return builder;
    }
    Object.assign(builder.data, {
        ...a, custom_id: a.customId,
    });
    return builder;
}

export type CreateCheckboxGroupData = Omit<CheckboxGroupComponentData, "type">;

/**
 * Creates a checkbox group component using an object configuration.
 * 
 * This function is used to group multiple checkboxes together.
 * Each field corresponds to the {@link CheckboxGroupComponentData} properties
 * (except `type`), and the options are automatically applied.
 *
 * @param data - The configuration object containing the group settings and options.
 * @returns A new {@link CheckboxGroupBuilder} instance configured with the provided data.
 *
 * @example
 * ```ts
 * const group = createCheckboxGroup({
 *   customId: "preferences",
 *   minValues: 1,
 *   maxValues: 3,
 *   options: [
 *     { label: "Option A", value: "a" },
 *     { label: "Option B", value: "b" }
 *   ]
 * });
 * ```
 */
export function createCheckboxGroup(data: CreateCheckboxGroupData): CheckboxGroupBuilder {    
    const builder = new CheckboxGroupBuilder();

    Object.assign(builder.data, {
        ...data,
        custom_id: data.customId,
        max_values: data.maxValues,
        min_values: data.minValues,
    });
    builder.setOptions(...data.options);
    return builder;
}