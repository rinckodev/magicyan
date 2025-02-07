import { describe, it, expect } from "vitest";
import { extractMentionId } from "#package";

describe("extractMentionId", () => {
  it("should extract user mention ID correctly", () => {
    const userMention = "<@264620632644255745>";
    const result = extractMentionId(userMention);
    expect(result).toBe("264620632644255745");
  });

  it("should extract channel mention ID correctly", () => {
    const channelMention = "<#1068689068256403457>";
    const result = extractMentionId(channelMention);
    expect(result).toBe("1068689068256403457");
  });

  it("should extract role mention ID correctly", () => {
    const roleMention = "<@&929925182796226632>";
    const result = extractMentionId(roleMention);
    expect(result).toBe("929925182796226632");
  });

  it("should return null for invalid mention", () => {
    const invalidMention = "<#invalid>";
    const result = extractMentionId(invalidMention);
    expect(result).toBeNull();
  });

  it("should return null for an empty string", () => {
    const emptyMention = "";
    const result = extractMentionId(emptyMention);
    expect(result).toBeNull();
  });

  it("should return null for a mention with no ID", () => {
    const noIdMention = "<@>";
    const result = extractMentionId(noIdMention);
    expect(result).toBeNull();
  });
});
