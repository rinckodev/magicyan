import { createComponents } from "#package";
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, MediaGalleryBuilder, TextDisplayBuilder } from "discord.js";
import { describe, expect, it } from "vitest";

describe("createComponents", () => {
    it("should create a TextDisplayBuilder from a string", () => {
        const input = "Hello, world!";
        const result = createComponents(input);

        expect(result.length).toBe(1);
        expect(result[0]).toBeInstanceOf(TextDisplayBuilder);
        //@ts-ignore
        expect(result[0].data.content).toBe(input);
    });

    it("should create a row of ActionRowBuilder from an array", () => {
        const input = [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel("Click me"))];
        const result = createComponents(...input);

        expect(result.length).toBe(1);
        expect(result[0]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should create a MediaGalleryBuilder from an AttachmentBuilder", () => {
        const input = new AttachmentBuilder("file.jpg");
        const result = createComponents(input);

        expect(result.length).toBe(1);
        // Verifique se o resultado é um MediaGalleryBuilder
        expect(result[0]).toBeInstanceOf(MediaGalleryBuilder);
    });

    it("should ignore null values", () => {
        const result = createComponents(null, "Text", null);

        expect(result.length).toBe(1);
        expect(result[0]).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should handle multiple different component types", () => {
        const input = [
            "Hello, world!",
            new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel("Click me")),
            new AttachmentBuilder("file.jpg"),
        ];
        const result = createComponents(...input);

        expect(result.length).toBe(3);
        expect(result[0]).toBeInstanceOf(TextDisplayBuilder);
        expect(result[1]).toBeInstanceOf(ActionRowBuilder);
        expect(result[2]).toBeInstanceOf(MediaGalleryBuilder);
    });
});
