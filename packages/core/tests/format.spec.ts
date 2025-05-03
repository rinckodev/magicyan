import { brBuilder, capitalize, limitText, notFound, replaceText, spaceBuilder } from "#package";
import { expect, it, describe } from "vitest";

describe("notFound", () => {
    it("should return the value if it is not null", () => {
        expect(notFound("Hello")).toBe("Hello");
        expect(notFound(123)).toBe(123);
    });

    it("should return undefined if the value is null", () => {
        expect(notFound(null)).toBeUndefined();
    });
});

describe("brBuilder", () => {
    it("should join multiple strings and arrays with line breaks", () => {
        expect(brBuilder("Hello", [null, "World"], undefined, "!")).toBe("Hello\nWorld\n!");
        expect(brBuilder("Hello", null, "World")).toBe("Hello\nWorld");
    });

    it("should filter out null and undefined values", () => {
        expect(brBuilder(null, "Hello", undefined, "World")).toBe("Hello\nWorld");
    });

    it("should handle empty input", () => {
        expect(brBuilder()).toBe("");
    });
});

describe("spaceBuilder", () => {
    it("should join multiple strings and arrays with spaces", () => {
        expect(spaceBuilder("Hello", [null, "World"], undefined, "!")).toBe("Hello World !");
        expect(spaceBuilder("Hello", null, "World")).toBe("Hello World");
    });

    it("should filter out null and undefined values", () => {
        expect(spaceBuilder(null, "Hello", undefined, "World")).toBe("Hello World");
    });

    it("should handle empty input", () => {
        expect(spaceBuilder()).toBe("");
    });
});

describe("replaceText", () => {
    it("should replace substrings based on key-value pairs", () => {
        const result = replaceText("Hello var(name), welcome to var(libname) lib", {
            "var(name)": "Alice",
            "var(libname)": "MyLib"
        });
        expect(result).toBe("Hello Alice, welcome to MyLib lib");
    });

    it("should handle missing keys without errors", () => {
        const result = replaceText("Hello var(name)", {
            "var(libname)": "MyLib"
        });
        expect(result).toBe("Hello var(name)");
    });

    it("should return the original text if no replacements are made", () => {
        const result = replaceText("Hello", {});
        expect(result).toBe("Hello");
    });
});

describe("captalize", () => {
    it("should capitalize the first letter of the word", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    it("should capitalize the first letter of each word if allWords is true", () => {
        expect(capitalize("i love brazil", true)).toBe("I Love Brazil");
    });

    it("should handle multiple spaces correctly", () => {
        expect(capitalize("  hello world  ")).toBe("Hello world");
    });

    it("should handle empty strings", () => {
        expect(capitalize("")).toBe("");
    });
});

describe("limitText", () => {
    it("should truncate text to the specified length", () => {
        expect(limitText("Hello World", 5)).toBe("Hello");
    });

    it("should append the endText when the text exceeds the max length", () => {
        expect(limitText("Hello World", 5, "...")).toBe("Hello...");
    });

    it("should return the original text if it is shorter than the max length", () => {
        expect(limitText("Hello", 10)).toBe("Hello");
    });

    it("should handle empty text correctly", () => {
        expect(limitText("", 5)).toBe("");
    });
});