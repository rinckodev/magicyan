import { createModalFields, createModalInput, modalFieldsToRecord } from "#package";
import { ActionRowBuilder, ModalSubmitFields, TextInputBuilder, TextInputStyle } from "discord.js";
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
    it("should create multiple ActionRowBuilders with TextInputBuilders", () => {
        const modalData = {
            field1: { customId: "field1", label: "Field 1" },
            field2: { customId: "field2", label: "Field 2" }
        };

        const rows = createModalFields(modalData);

        expect(rows).toHaveLength(2);
        expect(rows[0].components[0].data.custom_id).toEqual("field1");
        expect(rows[1].components[0].data.custom_id).toEqual("field2");
    });
});

describe("modalFieldsToRecord", () => {

    it("should handle ModalSubmitFields correctly", () => {
        const mockFields = {
            fields: [
                { customId: "field1", value: "value1" },
                { customId: "field2", value: "value2" }
            ]
        };

        const result = modalFieldsToRecord(mockFields as unknown as ModalSubmitFields);

        expect(result).toEqual({ field1: "value1", field2: "value2" });
    });
});
