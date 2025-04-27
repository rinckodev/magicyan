import { describe, it, expect } from "vitest";
import { createTextDisplay } from "#package";
import { TextDisplayBuilder } from "discord.js";

describe("createTextDisplay", () => {
    it("should create a TextDisplayBuilder with the given content", () => {
        const content = "Hello world";
        const display = createTextDisplay(content);

        expect(display).toBeInstanceOf(TextDisplayBuilder);
        expect(display.toJSON().content).toBe(content);
        expect(display.toJSON().id).toBeUndefined();
    });

    it("should create a TextDisplayBuilder with the given content and id", () => {
        const content = "Hello with ID";
        const id = 123;
        const display = createTextDisplay(content, id);

        expect(display).toBeInstanceOf(TextDisplayBuilder);
        expect(display.toJSON().content).toBe(content);
        expect(display.toJSON().id).toBe(id);
    });
});
