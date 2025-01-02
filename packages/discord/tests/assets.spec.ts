import { createEmbedAsset } from "#package";
import { AttachmentBuilder } from "discord.js";
import { describe, expect, it } from "vitest";

describe("createEmbedAsset", () => {

  it("should return EmbedAssetData with attachment URL from AttachmentBuilder", () => {
    const attachmentBuilder = new AttachmentBuilder(Buffer.from(JSON.stringify("true"), "utf-8"), { name: "example.png" });

    const result = createEmbedAsset(attachmentBuilder, { height: 100, width: 200 });

    expect(result).toEqual({
      url: "attachment://example.png",
      height: 100,
      width: 200,
    });
  });

  it("should return combined EmbedAssetData when source has a url", () => {
    const source = { url: "https://example.com/image.png", width: 400 };

    const result = createEmbedAsset(source, { height: 200 });

    expect(result).toEqual({
      url: "https://example.com/image.png",
      width: 400,
      height: 200,
    });
  });

  it("should return EmbedAssetData with url from string source", () => {
    const source = "https://example.com/image.png";

    const result = createEmbedAsset(source, { width: 400 });

    expect(result).toEqual({
      url: "https://example.com/image.png",
      width: 400,
    });
  });

  it("should return undefined when source is null", () => {
    const result = createEmbedAsset(null);

    expect(result).toBeUndefined();
  });

  it("should return undefined when source is undefined", () => {
    const result = createEmbedAsset(undefined);

    expect(result).toBeUndefined();
  });
});
