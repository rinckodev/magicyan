import { describe, it, expect } from "vitest";
import { createMediaGallery } from "#package";
import { MediaGalleryBuilder, AttachmentBuilder } from "discord.js";

describe("createMediaGallery", () => {
  it("should create a MediaGalleryBuilder with a string URL", () => {
    const url = "https://cdn.example.com/image.png";
    const gallery = createMediaGallery(url);

    expect(gallery).toBeInstanceOf(MediaGalleryBuilder);
    expect(gallery.toJSON().items).toHaveLength(1);
    expect(gallery.toJSON().items[0].media.url).toBe(url);
  });

  it("should create a MediaGalleryBuilder with an AttachmentBuilder", () => {
    const attachment = new AttachmentBuilder(
      Buffer.from("test"),
      { name: "file.jpg" }
    );
    const gallery = createMediaGallery(attachment);

    expect(gallery).toBeInstanceOf(MediaGalleryBuilder);
    expect(gallery.toJSON().items).toHaveLength(1);
    expect(gallery.toJSON().items[0].media.url).toBe(`attachment://${attachment.name}`);
  });

  it("should create a MediaGalleryBuilder with a MediaGalleryItemData object", () => {
    const item = {
      media: { url: "https://cdn.example.com/another-image.png" },
      description: "An image",
      spoiler: true
    };
    const gallery = createMediaGallery(item);

    expect(gallery).toBeInstanceOf(MediaGalleryBuilder);
    expect(gallery.toJSON().items).toHaveLength(1);
    expect(gallery.toJSON().items[0].media.url).toBe(item.media.url);
    expect(gallery.toJSON().items[0].description).toBe(item.description);
    expect(gallery.toJSON().items[0].spoiler).toBe(true);
  });

  it("should create a MediaGalleryBuilder with multiple items", () => {
    const url = "https://cdn.example.com/image1.png";
    const attachment = new AttachmentBuilder(
      Buffer.from("test"),
      { name: "file2.jpg" }
    );
    const item = {
      media: { url: "https://cdn.example.com/image3.png" }
    };
    const gallery = createMediaGallery(url, attachment, item);

    expect(gallery).toBeInstanceOf(MediaGalleryBuilder);
    expect(gallery.toJSON().items).toHaveLength(3);
    expect(gallery.toJSON().items[0].media.url).toBe(url);
    expect(gallery.toJSON().items[1].media.url).toBe(`attachment://${attachment.name}`);
    expect(gallery.toJSON().items[2].media.url).toBe(item.media.url);
  });
});
