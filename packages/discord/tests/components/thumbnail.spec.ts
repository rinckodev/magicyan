import { describe, it, expect } from "vitest";
import { createThumbnail } from "#package";
import { ThumbnailBuilder, AttachmentBuilder } from "discord.js";

describe("createThumbnail", () => {
    it("should create a ThumbnailBuilder from a string URL", () => {
        const url = "https://cdn.example.com/image.png";
        const thumbnail = createThumbnail(url);

        expect(thumbnail).toBeInstanceOf(ThumbnailBuilder);
        expect(thumbnail.toJSON().media.url).toBe(url);
    });

    it("should create a ThumbnailBuilder from an AttachmentBuilder", () => {
        const attachment = new AttachmentBuilder(
            Buffer.from("test"),
            { name: "file.jpg" }
        );
        const thumbnail = createThumbnail(attachment);

        expect(thumbnail).toBeInstanceOf(ThumbnailBuilder);
        expect(thumbnail.toJSON().media.url).toBe(`attachment://${attachment.name}`);
    });

    it("should create a ThumbnailBuilder from an object with media string", () => {
        const media = { url: "https://cdn.example.com/another-image.png" };
        const thumbnail = createThumbnail({ media });

        expect(thumbnail).toBeInstanceOf(ThumbnailBuilder);
        expect(thumbnail.toJSON().media.url).toBe(media.url);
    });

    it("should create a ThumbnailBuilder from an object with media url", () => {
        const data = { media: { url: "https://cdn.example.com/image-final.png" } };
        const thumbnail = createThumbnail(data);

        expect(thumbnail).toBeInstanceOf(ThumbnailBuilder);
        expect(thumbnail.toJSON().media.url).toBe(data.media.url);
    });
});
