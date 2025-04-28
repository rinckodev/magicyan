import { describe, it, expect } from "vitest";
import { createSeparator } from "#package";
import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

describe("createSeparator", () => {
    it("should create a SeparatorBuilder with default values", () => {
        const separator = createSeparator();

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("should create a SeparatorBuilder with divider disabled", () => {
        const separator = createSeparator({ divider: false });

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("should create a SeparatorBuilder with large spacing", () => {
        const separator = createSeparator({ large: true });

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });

    it("should create a SeparatorBuilder with divider disabled and large spacing", () => {
        const separator = createSeparator({ divider: false, large: true });

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });
});
