import { describe, it, expect } from "vitest";
import { createRow, createLinkButton } from "#package";
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

describe("createRow", () => {
  it("should create an ActionRowBuilder with components", () => {
    const mockButton1 = new ButtonBuilder({ label: "Button 1", style: ButtonStyle.Primary });
    const mockButton2 = new ButtonBuilder({ label: "Button 2", style: ButtonStyle.Secondary });

    const row = createRow(mockButton1, mockButton2);

    expect(row).toBeInstanceOf(ActionRowBuilder);
    expect(row.components).toHaveLength(2);
    expect(row.components[0]).toEqual(mockButton1);
    expect(row.components[1]).toEqual(mockButton2);
  });

  it("should handle a single component", () => {
    const mockButton = new ButtonBuilder({ label: "Single Button", style: ButtonStyle.Primary });

    const row = createRow(mockButton);

    expect(row).toBeInstanceOf(ActionRowBuilder);
    expect(row.components).toHaveLength(1);
    expect(row.components[0]).toEqual(mockButton);
  });
});

describe("createLinkButton", () => {
  it("should create a link button with the provided data", () => {
    const buttonData = { url: "https://example.com", label: "Go to Example" };
    const button = createLinkButton(buttonData);

    expect(button).toBeInstanceOf(ButtonBuilder);
    expect(button.data.style).toEqual(ButtonStyle.Link);
    expect(button.data).haveOwnProperty("url").equal(buttonData.url)
    expect(button.data).haveOwnProperty("label").equal(buttonData.label);
  });

  it("should use url as label if label is not provided", () => {
    const buttonData = { url: "https://example.com" };
    const button = createLinkButton(buttonData);

    expect(button.data).haveOwnProperty("label").equal(buttonData.url);
  });
});
