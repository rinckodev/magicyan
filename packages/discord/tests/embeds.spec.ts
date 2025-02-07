import { EmbedPlusBuilder, createEmbed } from "#package";
import { Embed } from "discord.js";
import { describe, expect, it } from "vitest";

describe("EmbedPlusBuilder", () => {
  it("should create an embed with the provided data", () => {
    const embed = new EmbedPlusBuilder({
      title: "Test Title",
      description: "Test Description",
      color: "Red",
    });

    expect(embed.data).toMatchObject({
      title: "Test Title",
      description: "Test Description",
      color: expect.any(Number), // Color is converted to a number
    });
  });

  it("should merge fields when mergeFields is true", () => {
    const embed = new EmbedPlusBuilder({
      fields: [{ name: "Field 1", value: "Value 1" }],
      mergeFields: true,
      extends: {
        fields: [{ name: "Field 2", value: "Value 2" }],
      },
    });

    expect(embed.data.fields).toEqual([
      { name: "Field 2", value: "Value 2", inline: undefined },
      { name: "Field 1", value: "Value 1", inline: undefined },
    ]);
  });

  it("should set a custom footer", () => {
    const embed = new EmbedPlusBuilder({
      footer: { text: "Footer Text", iconURL: "https://example.com/icon.png" },
    });

    expect(embed.data.footer).toMatchObject({
      text: "Footer Text",
      icon_url: "https://example.com/icon.png",
    });
  });

  it("should update an existing embed with new data", () => {
    const embed = new EmbedPlusBuilder({ title: "Old Title" });
    embed.update({ title: "New Title" });

    expect(embed.data.title).toBe("New Title");
  });

  it("should convert to a JSON string", () => {
    const embed = new EmbedPlusBuilder({ title: "Test Title" });
    const jsonString = embed.toString();

    expect(jsonString).toContain('"title": "Test Title"');
  });

  it("should create an attachment from the embed", () => {
    const embed = new EmbedPlusBuilder({ title: "Attachment Embed" });
    const attachment = embed.toAttachment();

    expect(attachment.name).toBe("embed.json");
    expect(attachment).toHaveProperty("attachment");
  });

  it("should set color correctly with override behavior", () => {
    const embed = new EmbedPlusBuilder({});
    embed.setColor("Blue");

    expect(embed.data.color).toBeDefined();
  });

  it("should handle thumbnail and image setting", () => {
    const embed = new EmbedPlusBuilder({});
    embed.setAsset("thumbnail", "https://example.com/image.png");

    expect(embed.data.thumbnail).toEqual({ url: "https://example.com/image.png" });
  });
});

describe("createEmbed", () => {
  it("should create a single embed by default", () => {
    const embed = createEmbed({ title: "Test Embed" });

    expect(embed).toBeInstanceOf(EmbedPlusBuilder);
    expect(embed.data.title).toBe("Test Embed");
  });

  it("should create multiple embeds when array option is true", () => {
    const embeds = createEmbed({ array: true, fields: [{ name: "Field", value: "Value" }] });

    expect(Array.isArray(embeds)).toBe(true);
    expect(embeds.length).toBe(1);
    expect(embeds[0]).toBeInstanceOf(EmbedPlusBuilder);
  });

  it("should create an embed from existing message embeds", () => {
    const mockEmbed = {
      title: "Existing Embed",
      description: "This is a description",
      color: 0x00ff00,
    } as Embed;

    const embed = createEmbed({
      from: { embeds: [mockEmbed] },
      fromIndex: 0,
    });

    expect(embed).toBeInstanceOf(EmbedPlusBuilder);
    expect(embed.data.title).toBe(mockEmbed.title);
    expect(embed.data.description).toBe(mockEmbed.description);
    expect(embed.data.color).toBe(mockEmbed.color);
  });

  it("should create an embed from existing interaction message embeds", () => {
    const mockEmbed = {
      title: "Existing Embed",
      description: "This is a description",
      color: 0x00ff00,
    } as Embed;

    const embed = createEmbed({
      from: { message: { embeds: [mockEmbed] } },
      fromIndex: 0,
    });

    expect(embed).toBeInstanceOf(EmbedPlusBuilder);
    expect(embed.data.title).toBe(mockEmbed.title);
    expect(embed.data.description).toBe(mockEmbed.description);
    expect(embed.data.color).toBe(mockEmbed.color);
  });
});
