import { createModalFields, createModalInput } from "#package";
import { ActionRowBuilder, ComponentType, LabelBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { describe, expect, it } from "vitest";

describe("createModalInput", () => {
    it("should create an ActionRowBuilder with a TextInputBuilder", () => {
        const inputData = { customId: "testInput", label: "Test Input" };
        const input = createModalInput(inputData);

        expect(input).toBeInstanceOf(ActionRowBuilder);
        expect(input.components).toHaveLength(1);
        expect(input.components[0]).toBeInstanceOf(TextInputBuilder);
        expect(input.components[0].data.custom_id).toEqual(inputData.customId);
        expect(input.components[0].data.label).toEqual(inputData.label);
    });

    it("should default style to 'short' if not provided", () => {
        const inputData = { customId: "testInput", label: "Test Input" };
        const input = createModalInput(inputData);

        expect(input.components[0].data.style).toEqual(TextInputStyle.Short);
    });

    it("should use provided style if specified", () => {
        const inputData = { customId: "testInput", label: "Test Input", style: TextInputStyle.Paragraph };
        const input = createModalInput(inputData);

        expect(input.components[0].data.style).toEqual(TextInputStyle.Paragraph);
    });
});

describe("createModalFields", () => {
    it("should return an empty array when all inputs are null, undefined, or boolean", () => {
        const result = createModalFields(undefined, null, true, false);
        expect(result).toEqual([]);
    });

    it("should convert a string into a TextDisplay component", () => {
        const result = createModalFields("Hello world");
        expect(result).toEqual([
            { type: ComponentType.TextDisplay, content: "Hello world" }
        ]);
    });

    it("should return the .data property when given a LabelBuilder", () => {
        const label = new LabelBuilder({ label: "Name" });
        const result = createModalFields(label);
        expect(result).toEqual([
            expect.objectContaining({ label: "Name" })
        ]);
    });

    it("should return the .data property when given a TextDisplayBuilder", () => {
        const textDisplay = new TextDisplayBuilder({
            type: ComponentType.TextDisplay,
            content: "Message"
        });
        const result = createModalFields(textDisplay);
        expect(result).toEqual([
            { type: ComponentType.TextDisplay, content: "Message" }
        ]);
    });

    it("should ignore boolean values and mix valid inputs correctly", () => {
        const label = new LabelBuilder({ label: "Label 1" });
        const result = createModalFields("Text", false, label, true, "End");
        expect(result).toEqual([
            expect.objectContaining({ type: ComponentType.TextDisplay, content: "Text" }),
            expect.objectContaining({ label: "Label 1" }),
            expect.objectContaining({ type: ComponentType.TextDisplay, content: "End" })
        ]);
    });

    it("should preserve the original order of valid components", () => {
        const label = new LabelBuilder({ label: "L1" });
        const textDisplay = new TextDisplayBuilder({
            type: ComponentType.TextDisplay,
            content: "Message"
        });
        const result = createModalFields("Start", null, label, undefined, textDisplay);
        expect(result).toEqual([
            expect.objectContaining({ type: ComponentType.TextDisplay, content: "Start" }),
            expect.objectContaining({ label: "L1" }),
            expect.objectContaining({ type: ComponentType.TextDisplay, content: "Message" })
        ]);
    });
});

// describe("modalFieldsToRecord", () => {

//     it("should handle ModalSubmitFields correctly", () => {
//         const mockFields = {
//             fields: [
//                 { customId: "field1", value: "value1" },
//                 { customId: "field2", value: "value2" }
//             ]
//         };

//         const result = modalFieldsToRecord(mockFields as unknown as ModalSubmitFields);

//         expect(result).toEqual({ field1: "value1", field2: "value2" });
//     });
// });
