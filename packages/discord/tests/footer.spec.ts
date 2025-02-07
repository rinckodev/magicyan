import { describe, it, expect } from "vitest";
import { createEmbedFooter, chars } from "#package";

describe("createEmbedFooter", () => {
  it("should return undefined when both text and iconURL are not provided", () => {
    const result = createEmbedFooter({});
    expect(result).toBeUndefined();
  });

  it("should return an EmbedFooterData object with default text when only iconURL is provided", () => {
    const result = createEmbedFooter({ iconURL: "https://example.com/icon.png" });
    expect(result).toEqual({
      text: chars.invisible,
      iconURL: "https://example.com/icon.png",
    });
  });

  it("should return an EmbedFooterData object with provided text and no iconURL", () => {
    const result = createEmbedFooter({ text: "Sample Text" });
    expect(result).toEqual({
      text: "Sample Text",
      iconURL: undefined,
    });
  });

  it("should return an EmbedFooterData object with both text and iconURL provided", () => {
    const result = createEmbedFooter({ text: "Footer Text", iconURL: "https://example.com/icon.png" });
    expect(result).toEqual({
      text: "Footer Text",
      iconURL: "https://example.com/icon.png",
    });
  });

  it("should return undefined when both text and iconURL are null", () => {
    const result = createEmbedFooter({ text: null, iconURL: null });
    expect(result).toBeUndefined();

  });

  it("should handle undefined values for text and iconURL", () => {
    const result = createEmbedFooter({ text: undefined, iconURL: undefined });
    expect(result).toBeUndefined();
  });

  it("should iconURL be undefined when the iconURL its empty", () => {
    const result = createEmbedFooter({ text: "Footer", iconURL: "" });
    expect(result).toEqual({
      text: "Footer",
      iconURL: undefined,
    });
  });
});
