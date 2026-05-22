import { describe, it, expect } from "vitest";
import { ComponentType } from "discord.js";
import { findMessageComponentById } from "#package";

describe("findComponentById", () => {
    const source = [
        {
            id: 1,
            type: ComponentType.Container,
            components: [
                {
                    id: 2,
                    type: ComponentType.Button
                },
                {
                    id: 3,
                    type: ComponentType.Section,
                    accessory: {
                        id: 4,
                        type: ComponentType.Thumbnail
                    },
                    components: [
                        {
                            id: 5,
                            type: ComponentType.StringSelect
                        }
                    ]
                }
            ]
        }
    ];

    it("should find a component by id", () => {
        const result = findMessageComponentById(
            source as never,
            2
        );

        expect(result).toEqual({
            id: 2,
            type: ComponentType.Button
        });
    });

    it("should find nested components", () => {
        const result = findMessageComponentById(
            source as never,
            5
        );

        expect(result).toEqual({
            id: 5,
            type: ComponentType.StringSelect
        });
    });

    it("should find section accessory components", () => {
        const result = findMessageComponentById(
            source as never,
            4
        );

        expect(result).toEqual({
            id: 4,
            type: ComponentType.Thumbnail
        });
    });

    it("should filter by component type", () => {
        const result = findMessageComponentById(
            source as never,
            2,
            ComponentType.Button
        );

        expect(result).toEqual({
            id: 2,
            type: ComponentType.Button
        });
    });

    it("should return null if id exists but type does not match", () => {
        const result = findMessageComponentById(
            source as never,
            2,
            ComponentType.StringSelect
        );

        expect(result).toBeNull();
    });

    it("should return null when component does not exist", () => {
        const result = findMessageComponentById(
            source as never,
            999
        );

        expect(result).toBeNull();
    });

    it("should return null when source is empty", () => {
        const result = findMessageComponentById(
            [],
            1
        );

        expect(result).toBeNull();
    });
});