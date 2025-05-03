import { describe, it, expect } from "vitest";
import {
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SectionBuilder,
  ThumbnailBuilder
} from "discord.js";
import { createSection } from "#package";

describe("createSection", () => {
  const sampleUrl = "https://cdn.example.com/image.png";

  it("should create section with 'accessory' as ButtonBuilder", () => {
    const button = new ButtonBuilder()
      .setCustomId("test-btn")
      .setLabel("Accessory Button")
      .setStyle(ButtonStyle.Primary);

    const section = createSection({
      content: "With accessory ButtonBuilder",
      accessory: button
    });

    expect(section).toBeInstanceOf(SectionBuilder);
    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Button);
    expect(json.accessory).toHaveProperty("label", "Accessory Button");
  });

  it("should create section with 'accessory' as ThumbnailBuilder", () => {
    const thumbnail = new ThumbnailBuilder({
      media: { url: sampleUrl },
      description: "Thumb desc"
    });

    const section = createSection({
      content: "With accessory ThumbnailBuilder",
      accessory: thumbnail
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Thumbnail);
    expect(json.accessory).toHaveProperty("media", { url: sampleUrl });
    expect(json.accessory).toHaveProperty("description", "Thumb desc");
  });

  it("should create section with 'accessory' as string URL (thumbnail)", () => {
    const section = createSection({
      content: "With accessory string URL",
      accessory: sampleUrl
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Thumbnail);
    expect(json.accessory).toHaveProperty("media", { url: sampleUrl });
  });

  it("should create section with 'accessory' as raw ThumbnailData", () => {
    const section = createSection({
      content: "With accessory as ThumbnailData",
      accessory: {
        media: { url: sampleUrl },
        description: "Raw thumb"
      }
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Thumbnail);
    expect(json.accessory).toHaveProperty("media", { url: sampleUrl });
    expect(json.accessory).toHaveProperty("description", "Raw thumb");
  });

  it("should create section with 'accessory' as raw ButtonComponentData", () => {
    const section = createSection({
      content: "With accessory raw button",
      accessory: {
        customId: "raw-btn",
        label: "Raw Btn",
        style: ButtonStyle.Secondary
      }
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Button);
    expect(json.accessory).toHaveProperty("label", "Raw Btn");
    expect(json.accessory).toHaveProperty("custom_id", "raw-btn");
  });

  it("should create section with 'button'", () => {
    const button = new ButtonBuilder()
      .setCustomId("btn-key")
      .setLabel("Button Key")
      .setStyle(ButtonStyle.Success);

    const section = createSection({
      content: "With button key",
      button
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Button);
    expect(json.accessory).toHaveProperty("label", "Button Key");
  });

  it("should create section with 'thumbnail'", () => {
    const thumbnail = new ThumbnailBuilder({
      media: { url: sampleUrl },
      description: "Key thumb"
    });

    const section = createSection({
      content: "With thumbnail key",
      thumbnail
    });

    const json = section.toJSON();
    expect(json.accessory).toHaveProperty("type", ComponentType.Thumbnail);
    expect(json.accessory).toHaveProperty("media", { url: sampleUrl });
    expect(json.accessory).toHaveProperty("description", "Key thumb");
  });

  it("should create section with multiple content strings", () => {
    const content = ["Line 1", "Line 2"];
    const button = new ButtonBuilder()
      .setCustomId("multi-line")
      .setLabel("Lines")
      .setStyle(ButtonStyle.Primary);

    const section = createSection({
      content,
      button
    });

    const json = section.toJSON();
    expect(json.components).toHaveLength(2);
    expect(json.components.map(c => c.content)).toEqual(content);
    expect(json.accessory).toHaveProperty("label", "Lines");
  });
});
