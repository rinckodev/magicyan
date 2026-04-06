import { describe, it, expect } from "vitest";
import { RadioGroupBuilder } from "discord.js";
import { createRadioGroup } from "#package";

describe("createRadioGroup", () => {
    it("should create a radio group with valid data", () => {
        const group = createRadioGroup({
            customId: "plan",
            options: [
                { label: "Free", value: "free" },
                { label: "Pro", value: "pro" }
            ] as const,
            required: true
        });

        expect(group).toBeInstanceOf(RadioGroupBuilder);
        expect(group.data.custom_id).toBe("plan");
        expect(group.data.required).toBe(true);
        expect(group.data.options).toHaveLength(2);
    });

    it("should map customId to custom_id", () => {
        const group = createRadioGroup({
            customId: "mapped_id",
            options: [{ label: "A", value: "a" }] as const
        });

        expect(group.data.custom_id).toBe("mapped_id");
    });

    it("should preserve readonly options", () => {
        const options = [
            { label: "A", value: "a" },
            { label: "B", value: "b" }
        ] as const;

        const group = createRadioGroup({
            customId: "readonly",
            options
        });

        expect(group.data.options).toEqual(options);
    });

    it("should handle single option", () => {
        const group = createRadioGroup({
            customId: "single",
            options: [{ label: "Only", value: "only" }] as const
        });

        expect(group.data.options).toHaveLength(1);
        expect(group.data.options?.[0].value).toBe("only");
    });

    it("should handle empty options array", () => {
        const group = createRadioGroup({
            customId: "empty",
            options: [] as const
        });

        expect(group.data.options).toHaveLength(0);
    });

    it("should not set required when undefined", () => {
        const group = createRadioGroup({
            customId: "no-required",
            options: [{ label: "A", value: "a" }] as const
        });

        expect(group.data.required).toBeUndefined();
    });
});