import { describe, it, expect } from "vitest";
import { ComponentType } from "discord.js";

import { flattenMessageComponents } from "#package";

describe("flattenMessageComponents", () => {
    it("should return simple components unchanged", () => {
        const source = [
            {
                id: 1,
                type: ComponentType.Button
            },
            {
                id: 2,
                type: ComponentType.StringSelect
            }
        ];

        const result = flattenMessageComponents(source as never);

        expect(result).toEqual(source);
    });

    it("should flatten action row components", () => {
        const source = [
            {
                id: 1,
                type: ComponentType.ActionRow,
                components: [
                    {
                        id: 2,
                        type: ComponentType.Button
                    },
                    {
                        id: 3,
                        type: ComponentType.Button
                    }
                ]
            }
        ];

        const result = flattenMessageComponents(source as never);

        expect(result).toEqual([
            source[0],
            source[0].components[0],
            source[0].components[1]
        ]);
    });

    it("should recursively flatten nested containers", () => {
        const source = [
            {
                id: 1,
                type: ComponentType.Container,
                components: [
                    {
                        id: 2,
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                id: 3,
                                type: ComponentType.Button
                            }
                        ]
                    }
                ]
            }
        ];

        const result = flattenMessageComponents(source as never);

        expect(result).toEqual([
            source[0],
            source[0].components[0],
            source[0].components[0].components[0]
        ]);
    });

    it("should include section accessory before nested components", () => {
        const source = [
            {
                id: 1,
                type: ComponentType.Section,
                accessory: {
                    id: 2,
                    type: ComponentType.Thumbnail
                },
                components: [
                    {
                        id: 3,
                        type: ComponentType.Button
                    }
                ]
            }
        ];

        const result = flattenMessageComponents(source as never);

        expect(result).toEqual([
            source[0],
            source[0].accessory,
            source[0].components[0]
        ]);
    });

    it("should return empty array when source is empty", () => {
        const result = flattenMessageComponents([]);

        expect(result).toEqual([]);
    });

    it("should preserve traversal order", () => {
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
                                type: ComponentType.Button
                            }
                        ]
                    }
                ]
            }
        ];

        const result = flattenMessageComponents(source as never);

        expect(result.map(c => c.id)).toEqual([
            1,
            2,
            3,
            4,
            5
        ]);
    });
});