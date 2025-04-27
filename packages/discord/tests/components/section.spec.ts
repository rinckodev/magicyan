import { describe, it, expect } from "vitest";
import { createSection } from "#package";
import { SectionBuilder, ButtonBuilder, AttachmentBuilder, ComponentType } from "discord.js";

describe("createSection", () => {
  it("should create a SectionBuilder with a button accessory and single string content", () => {
    const button = new ButtonBuilder()
      .setLabel("Click me")
      .setCustomId("click_me")
      .setStyle(1);

    const content = "Button content";
    const section = createSection({ content, button });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(ComponentType.Button); // Button = type 2
    expect(section.toJSON().components).toHaveLength(1);
    expect(section.toJSON().components[0].content).toBe(content);
  });

  it("should create a SectionBuilder with a button accessory and multiple string contents", () => {
    const button = new ButtonBuilder()
      .setLabel("More")
      .setCustomId("more")
      .setStyle(1);

    const contents = ["Line 1", "Line 2"];
    const section = createSection({ content: contents, button });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(2);
    expect(section.toJSON().components).toHaveLength(contents.length);
    expect(section.toJSON().components.map(c => c.content)).toEqual(contents);
  });

  it("should create a SectionBuilder with a thumbnail accessory from string URL", () => {
    const thumbnail = "https://cdn.example.com/image.png";
    const content = "Thumbnail with URL";
    const section = createSection({ content, thumbnail });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(ComponentType.Thumbnail);
    //@ts-ignore
    expect(section.toJSON().accessory?.media.url).toBe(thumbnail);
    expect(section.toJSON().components[0].content).toBe(content);
  });

  it("should create a SectionBuilder with a thumbnail accessory from AttachmentBuilder", () => {
    const attachment = new AttachmentBuilder(
      Buffer.from("test"),
      { name: "testfile.png" }
    );
    const content = "Thumbnail from attachment";
    const section = createSection({ content, thumbnail: attachment });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(ComponentType.Thumbnail);
    //@ts-ignore
    expect(section.toJSON().accessory?.media.url).toBe(`attachment://${attachment.name}`);
    expect(section.toJSON().components[0].content).toBe(content);
  });

  it("should create a SectionBuilder with a thumbnail accessory from media object", () => {
    const media = { url: "https://cdn.example.com/media.png" };
    const content = "Thumbnail from media object";
    const section = createSection({ content, thumbnail: { media } });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(ComponentType.Thumbnail);
    //@ts-ignore
    expect(section.toJSON().accessory?.media.url).toBe(media.url);
    expect(section.toJSON().components[0].content).toBe(content);
  });

  it("should create a SectionBuilder with a thumbnail accessory from ThumbnailComponentData", () => {
    const thumbnailData = { 
      media: { url: "https://cdn.example.com/thumbnail.png" }, 
      description: "A cool thumbnail" 
    };
    const content = "Thumbnail from ThumbnailComponentData";
    const section = createSection({ content, thumbnail: thumbnailData });

    expect(section).toBeInstanceOf(SectionBuilder);
    expect(section.toJSON().accessory).toBeDefined();
    expect(section.toJSON().accessory?.type).toBe(ComponentType.Thumbnail);
    //@ts-ignore
    expect(section.toJSON().accessory?.media.url).toBe(thumbnailData.media.url);
    //@ts-ignore
    expect(section.toJSON().accessory?.description).toBe(thumbnailData.description);
    expect(section.toJSON().components[0].content).toBe(content);
  });
});
