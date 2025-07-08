import { describe, it, expect } from "vitest";
import { createContainer, ContainerData, Separator } from "#package";
import { ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SeparatorBuilder, ComponentType } from "discord.js";

describe("createContainer", () => {
    it("should create a container with a TextDisplay component", () => {
        const data: ContainerData = {
            components: ["Hello, world!"],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a container with an ActionRow component", () => {
        const data: ContainerData = {
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel("Click me")),
            ],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should handle multiple types of components", () => {
        const data: ContainerData = {
            components: [
                "Hello, world!",
                new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel("Click me")),
            ],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(2);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
        expect(result.components[1]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should set accent color when provided", () => {
        const data: ContainerData = {
            accentColor: "#ff5733",
            components: ["Test container with accent color"],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.data.accent_color).toBe(16734003);
    });

    it("should not set accent color when not provided", () => {
        const data: ContainerData = {
            components: ["Test container without accent color"],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.data.accent_color).toBeUndefined();
    });

    it("should handle null components and skip them", () => {
        const data: ContainerData = {
            components: [null, "Text component", null],
        };
        const result = createContainer(data);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
    });
});

describe("createContainer simple", () => {
    it("should create a container with a TextDisplay component", () => {
        const result = createContainer(
            "Purple",
            "Hello, world!"
        );

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a container with an ActionRow component", () => {
        const result = createContainer("Random",
            new ActionRowBuilder<ButtonBuilder>({
                components: [
                    new ButtonBuilder({
                        customId: "click/me",
                        label: "Click me", 
                        style: ButtonStyle.Success
                    })
                ]
            })
        );

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should handle multiple types of components", () => {
        const result = createContainer("Random",
            "Hello, world!",
            new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel("Click me"))
        );

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(2);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
        expect(result.components[1]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should set accent color when provided", () => {
        const data = {
            accentColor: "#ff5733",
            components: ["Test container with accent color"],
        } satisfies ContainerData;
        const result = createContainer(data.accentColor, ...data.components);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.data.accent_color).toBe(16734003);
    });

    it("should handle null components and skip them", () => {
        const result = createContainer("Random", 
            null, 
            "Text component", 
            null
        );

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(1);
        expect(result.components[0]).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should set a component at a position", () => {
        const result = createContainer("Random", 
            "Text component", 
            Separator.Default,
            "Other text component"
        );

        result.setComponent(1, new ButtonBuilder({
            customId: "test",
            style: ButtonStyle.Success,
            label: "Test"
        }));

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(3);
        expect(result.components[1]).toBeInstanceOf(ActionRowBuilder);
    });

    it("should remove a component at a position", () => {
        const result = createContainer("Random", 
            "Text component", 
            Separator.Default,
            "Other text component"
        );

        result.setComponent(1, null);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(2);
    });

    it("should retrieve a component at a position", () => {
        const result = createContainer("Random", 
            "Text component", 
            Separator.Default,
            "Other text component"
        );

        const component = result.componentAt(1);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(3);
        expect(component).toBeInstanceOf(SeparatorBuilder);
    });

    it("should retrieve a component with specific type at a position", () => {
        const result = createContainer("Random", 
            "Text component", 
            Separator.Default,
            "Other text component"
        );

        const component = result.componentAt(1, ComponentType.TextDisplay);

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(result.components.length).toBe(3);
        expect(component).toBeInstanceOf(TextDisplayBuilder);
    });

    it("should create a container from another", () => {
        const result = createContainer("Random", 
            "Text component", 
            Separator.Default,
            "Other text component"
        );

        const container = createContainer({ from: result });

        expect(result).toBeInstanceOf(ContainerBuilder);
        expect(container).toBeInstanceOf(ContainerBuilder);
        
        expect(result.components.length).toBe(3);
        expect(container.components.length).toBe(3);
    });
});
