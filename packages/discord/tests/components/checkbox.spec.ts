import { createCheckbox, createCheckboxGroup } from "#package";
import { CheckboxBuilder, CheckboxGroupBuilder } from "discord.js";
import { describe, it, expect } from "vitest";

describe("createCheckbox", () => {
    it("should create checkbox using object config", () => {
        const checkbox = createCheckbox({
            customId: "accept_terms",
            default: true,
            id: 10
        });

        expect(checkbox).toBeInstanceOf(CheckboxBuilder);
        expect(checkbox.data.custom_id).toBe("accept_terms");
        expect(checkbox.data.default).toBe(true);
        expect(checkbox.data.id).toBe(10);
    });

    it("should create checkbox using parameters", () => {
        const checkbox = createCheckbox("accept_terms", true, 5);

        expect(checkbox).toBeInstanceOf(CheckboxBuilder);
        expect(checkbox.data.custom_id).toBe("accept_terms");
        expect(checkbox.data.default).toBe(true);
        expect(checkbox.data.id).toBe(5);
    });

    it("should create checkbox with only customId", () => {
        const checkbox = createCheckbox("simple");

        expect(checkbox.data.custom_id).toBe("simple");
        expect(checkbox.data.default).toBeUndefined();
        expect(checkbox.data.id).toBeUndefined();
    });

    it("should override customId from object to custom_id", () => {
        const checkbox = createCheckbox({
            customId: "mapped_id"
        });

        expect(checkbox.data.custom_id).toBe("mapped_id");
    });
});

describe("createCheckboxGroup", () => {
    it("should create checkbox group with full config", () => {
        const group = createCheckboxGroup({
            customId: "preferences",
            minValues: 1,
            maxValues: 3,
            options: [
                { label: "A", value: "a" },
                { label: "B", value: "b" }
            ]
        });

        expect(group).toBeInstanceOf(CheckboxGroupBuilder);
        expect(group.data.custom_id).toBe("preferences");
        expect(group.data.min_values).toBe(1);
        expect(group.data.max_values).toBe(3);
        expect(group.data.options).toHaveLength(2);
    });

    it("should handle empty options array", () => {
        const group = createCheckboxGroup({
            customId: "empty",
            options: []
        });

        expect(group.data.custom_id).toBe("empty");
        expect(group.data.options).toHaveLength(0);
    });

    it("should map minValues and maxValues correctly", () => {
        const group = createCheckboxGroup({
            customId: "limits",
            minValues: 2,
            maxValues: 5,
            options: [{ label: "X", value: "x" }]
        });

        expect(group.data.min_values).toBe(2);
        expect(group.data.max_values).toBe(5);
    });
});