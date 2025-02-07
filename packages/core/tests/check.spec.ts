import { equalsIgnoreCase, includesIgnoreCase } from "#package";
import { expect, it, describe } from "vitest";

describe("equalsIgnoreCase", () => {
    it("should return true when the strings are equal, ignoring case differences", () => {
        expect(equalsIgnoreCase("Hello", "hello")).toBe(true);
        expect(equalsIgnoreCase("HELLO", "hello")).toBe(true);
        expect(equalsIgnoreCase("hello", "HELLO")).toBe(true);
        expect(equalsIgnoreCase("test", "TEST")).toBe(true);
    });

    it("should return false when the strings are different, ignoring case differences", () => {
        expect(equalsIgnoreCase("Hello", "world")).toBe(false);
        expect(equalsIgnoreCase("Hello", "HELLO!")).toBe(false);
        expect(equalsIgnoreCase("abc", "abC!")).toBe(false);
    });

    it("should return false when one string is empty and the other is not", () => {
        expect(equalsIgnoreCase("", "hello")).toBe(false);
        expect(equalsIgnoreCase("hello", "")).toBe(false);
    });

    it("should return true when both strings are empty", () => {
        expect(equalsIgnoreCase("", "")).toBe(true);
    });
});

describe("includesIgnoreCase", () => {
    it("should return true when the substring is found, ignoring case differences", () => {
        expect(includesIgnoreCase("Hello World", "hello")).toBe(true);
        expect(includesIgnoreCase("Hello World", "HELLO")).toBe(true);
        expect(includesIgnoreCase("Hello World", "world")).toBe(true);
        expect(includesIgnoreCase("Hello World", "WORLD")).toBe(true);
    });

    it("should return false when the substring is not found", () => {
        expect(includesIgnoreCase("Hello World", "bye")).toBe(false);
        expect(includesIgnoreCase("Hello World", "goodbye")).toBe(false);
        expect(includesIgnoreCase("test string", "TESTING")).toBe(false);
    });

    it("should return false when the main text is empty", () => {
        expect(includesIgnoreCase("", "test")).toBe(false);
    });

    it("should return true when both the main text and the substring are empty", () => {
        expect(includesIgnoreCase("", "")).toBe(true);
    });
});