import { RadioGroupBuilder, RadioGroupComponentData } from "discord.js";

export type CreateRadioGroup = Omit<RadioGroupComponentData, "type">;

/**
 * Creates a radio group component using an object configuration.
 * 
 * This function is used to define a group of mutually exclusive options,
 * where only one option can be selected at a time.
 * Each field maps directly to the {@link RadioGroupComponentData} properties
 * (except `type`), and the options are automatically applied.
 *
 * @param data - The configuration object containing the group settings and options.
 * @returns A new {@link RadioGroupBuilder} instance configured with the provided data.
 *
 * @example
 * ```ts
 * const group = createRadioGroup({
 *   customId: "plan",
 *   options: [
 *     { label: "Free", value: "free" },
 *     { label: "Pro", value: "pro" }
 *   ]
 * });
 * ```
 */
export function createRadioGroup(data: CreateRadioGroup){
    const builder = new RadioGroupBuilder();
    Object.assign(builder.data, {
        ...data,
        custom_id: data.customId,
    });
    builder.setOptions(...data.options);
    return builder;
}