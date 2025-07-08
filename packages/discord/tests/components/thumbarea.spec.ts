import { describe, it, expect } from "vitest";
import { createThumbArea } from "#package";
import { SectionBuilder, TextDisplayBuilder } from "discord.js";
import { ThumbnailBuilder } from "discord.js";

describe("createThumbArea", () => {
    const sampleContent: string = "Sample content";
    const sampleThumbnail = new ThumbnailBuilder().setURL("https://example.com/image.png");

    it("should create a SectionBuilder when called with content and thumbnail", () => {
        const result = createThumbArea(sampleContent, sampleThumbnail);
        expect(result).toBeInstanceOf(SectionBuilder);
    });

    it("should create a TextDisplayBuilder when called with content only", () => {
        const result = createThumbArea(sampleContent);
        expect(result).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a SectionBuilder when called with data object with thumbnail", () => {
        const result = createThumbArea({
            content: sampleContent,
            thumbnail: sampleThumbnail
        });
        expect(result).toBeInstanceOf(SectionBuilder);
    });

    it("should create a TextDisplayBuilder when called with data object without thumbnail", () => {
        const result = createThumbArea({
            content: sampleContent
        });
        expect(result).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a TextDisplayBuilder when thumbnail is null", () => {
        const result = createThumbArea(sampleContent, null);
        expect(result).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a TextDisplayBuilder when thumbnail is undefined", () => {
        const result = createThumbArea(sampleContent, undefined);
        expect(result).toBeInstanceOf(TextDisplayBuilder);
    });
});