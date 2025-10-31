import { createModalFields, createModalInput, modalFieldsToRecord } from "#package";
import { ActionRowBuilder, Attachment, Collection, ComponentType, LabelBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
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


describe("modalFieldsToRecord (FileUpload field)", () => {
    const attachment1 = { url: "https://example.com/file1.png" } as Attachment;
    const attachment2 = { url: "https://example.com/file2.jpg" } as Attachment;

    const attachments = new Collection<string, Attachment>([
        ["file1", attachment1],
        ["file2", attachment2],
    ]);
    
    const modalField = {
        type: ComponentType.FileUpload,
        customId: "uploadedFiles",
        attachments,
    };

    const data = new Collection<string, any>([
        ["uploadedFiles", modalField]
    ]);

    it("should return an array of URLs when the field is a FileUpload component (interaction)", () => {
        const result = modalFieldsToRecord({
            fields: { fields: data }
        });

        expect(result).toEqual({
            uploadedFiles: [
                attachment1.url, 
                attachment2.url
            ]
        });
    });

    it("should return an array of URLs when the field is a FileUpload component", () => {
        const result = modalFieldsToRecord(data);

        expect(result).toEqual({
            uploadedFiles: [
                attachment1.url, 
                attachment2.url
            ]
        });
    });
});