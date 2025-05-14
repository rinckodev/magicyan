import { describe, it, expect } from "vitest";
import { createSeparator, Separator } from "#package";
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
        const separator = createSeparator({ large: true, divider: false });

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });

    it("positional arguments should create a SeparatorBuilder with default values", () => {
        const separator = createSeparator();

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("positional arguments should create a SeparatorBuilder with divider disabled", () => {
        const separator = createSeparator(false, false);

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("positional arguments should create a SeparatorBuilder with large spacing", () => {
        const separator = createSeparator(true);

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });

    it("positional arguments should create a SeparatorBuilder with divider disabled and large spacing", () => {
        const separator = createSeparator(true, false);

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });
});


describe("Separator", () => {
    it("should create a SeparatorBuilder with default values", () => {
        const separator = Separator.Default;

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("should create a SeparatorBuilder with divider disabled", () => {
        const separator = Separator.Hidden;

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Small);
    });

    it("should create a SeparatorBuilder with large spacing", () => {
        const separator = Separator.Large;

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(undefined);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });

    it("should create a SeparatorBuilder with divider disabled and large spacing", () => {
        const separator = Separator.LargeHidden;

        expect(separator).toBeInstanceOf(SeparatorBuilder);
        expect(separator.toJSON().divider).toBe(false);
        expect(separator.toJSON().spacing).toBe(SeparatorSpacingSize.Large);
    });
});