import { describe, it, expect } from "vitest";
import { isEmail, isUrl, isNumeric } from "#package";

describe("isEmail", () => {
    it("should return true for valid email addresses", () => {
        expect(isEmail("example@domain.com")).toBe(true);
        expect(isEmail("user.name+tag+sorting@example.com")).toBe(true);
    });

    it("should return false for invalid email addresses", () => {
        expect(isEmail("example@domain")).toBe(false);
        expect(isEmail("example@domain@com")).toBe(false);
        expect(isEmail("example.com")).toBe(false);
    });
});

describe("isUrl", () => {
    it("should return true for valid URLs", () => {
        expect(isUrl("https://example.com")).toBe(true);
        expect(isUrl("http://example.com")).toBe(true);
        expect(isUrl("ftp://example.com")).toBe(true);
    });

    it("should return false for invalid URLs", () => {
        expect(isUrl("example.com")).toBe(false);
        expect(isUrl("http://")).toBe(false);
        expect(isUrl("https://example com")).toBe(false);
    });
});

describe("isNumeric", () => {
    it("should return true for numeric strings", () => {
        expect(isNumeric("12345")).toBe(true);
        expect(isNumeric("0000")).toBe(true);
        expect(isNumeric("9876543210")).toBe(true);
    });

    it("should return false for non-numeric strings", () => {
        expect(isNumeric("123a45")).toBe(false);
        expect(isNumeric("12.34")).toBe(false);
        expect(isNumeric("abc123")).toBe(false);
    });
});
