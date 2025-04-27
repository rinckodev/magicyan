import { describe, it, expect } from "vitest";
import { createFile } from "#package";
import { FileBuilder, AttachmentBuilder } from "discord.js";

describe("createFile", () => {
    it("should create a FileBuilder from a string URL", () => {
        const url = "attachment://image.png";
        const file = createFile(url);

        expect(file).toBeInstanceOf(FileBuilder);
        expect(file.toJSON().file.url).toBe(url);
        expect(file.toJSON().spoiler).toBeUndefined();
    });

    it("should create a FileBuilder from a string URL with spoiler", () => {
        const url = "attachment://video.mp4";
        const file = createFile(url, { spoiler: true });

        expect(file).toBeInstanceOf(FileBuilder);
        expect(file.toJSON().file.url).toBe(url);
        expect(file.toJSON().spoiler).toBe(true);
    });

    it("should create a FileBuilder from an Attachment", () => {
        const attachment = new AttachmentBuilder(
            Buffer.from("test"),
            { name: "file.txt" }
        );
        const file = createFile(attachment);

        expect(file).toBeInstanceOf(FileBuilder);
        expect(file.toJSON().file.url).toBe(`attachment://${attachment.name}`);
        expect(file.toJSON().spoiler).toBeUndefined();
    });

    it("should create a FileBuilder from an Attachment with spoiler", () => {
        const attachment = new AttachmentBuilder(
            Buffer.from("secret"),
            { name: "secret.txt" }
        );
        const file = createFile(attachment, { spoiler: true });

        expect(file).toBeInstanceOf(FileBuilder);
        expect(file.toJSON().file.url).toBe(`attachment://${attachment.name}`);
        expect(file.toJSON().spoiler).toBe(true);
    });
});
