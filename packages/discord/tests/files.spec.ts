import { createEmbedFiles } from "#package";
import { EmbedBuilder } from "discord.js";
import { describe, expect, it } from "vitest";

describe("createEmbedFiles", () => {
  it("should create attachments for all image properties in the embed", () => {
    const embed = new EmbedBuilder()
      .setThumbnail("https://example.com/thumbnail.png")
      .setImage("https://example.com/image.png")
      .setAuthor({ name: "Author", iconURL: "https://example.com/author.png" })
      .setFooter({ text: "Footer", iconURL: "https://example.com/footer.png" });

    const files = createEmbedFiles(embed);

    expect(files).toHaveLength(4);
    expect(files.map((file) => file.name)).toEqual([
      "thumbnail.png",
      "image.png",
      "author.png",
      "footer.png",
    ]);

    expect(embed.data.thumbnail?.url).toBe("attachment://thumbnail.png");
    expect(embed.data.image?.url).toBe("attachment://image.png");
    expect(embed.data.author?.icon_url).toBe("attachment://author.png");
    expect(embed.data.footer?.icon_url).toBe("attachment://footer.png");
  });

  it("should ignore specified properties", () => {
    const embed = new EmbedBuilder()
      .setThumbnail("https://example.com/thumbnail.png")
      .setImage("https://example.com/image.png");

    const files = createEmbedFiles(embed, { ignore: ["thumbnail"] });

    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("image.png");
    expect(embed.data.thumbnail?.url).toBe("https://example.com/thumbnail.png");
  });

  it("should use custom file extensions", () => {
    const embed = new EmbedBuilder().setImage("https://example.com/image.png");

    const files = createEmbedFiles(embed, { extentions: { image: "jpg" } });

    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("image.jpg");
    expect(embed.data.image?.url).toBe("attachment://image.jpg");
  });

  it("should use custom file names", () => {
    const embed = new EmbedBuilder().setFooter({ text: "Footer", iconURL: "https://example.com/footer.png" });

    const files = createEmbedFiles(embed, { names: { footer: "custom-footer" } });

    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("custom-footer.png");
    expect(embed.data.footer?.icon_url).toBe("attachment://custom-footer.png");
  });

  it("should handle embeds with no image properties", () => {
    const embed = new EmbedBuilder().setDescription("No images here");

    const files = createEmbedFiles(embed);

    expect(files).toHaveLength(0);
  });

  it("should handle properties without extensions", () => {
    const embed = new EmbedBuilder()
      .setAuthor({ name: "Author", iconURL: "https://example.com/author" });

    const files = createEmbedFiles(embed);

    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("author.png");
    expect(embed.data.author?.icon_url).toBe("attachment://author.png");
  });

  it("should not modify embed properties that were ignored", () => {
    const embed = new EmbedBuilder().setThumbnail("https://example.com/thumbnail.png");

    createEmbedFiles(embed, { ignore: ["thumbnail"] });

    expect(embed.data.thumbnail?.url).toBe("https://example.com/thumbnail.png");
  });
});
