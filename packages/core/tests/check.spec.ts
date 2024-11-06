import { equalsIgnoreCase, includesIgnoreCase } from "#package";
import { expect, it, describe } from "vitest";

describe("Test check functions", () => {
    
    it("Strings should be equal ignoring case", () => {
        expect(equalsIgnoreCase("Hello World", "hello world")).toEqual(true);
        expect(equalsIgnoreCase("hello world", "Hello World")).toEqual(true);
        expect(equalsIgnoreCase("Hello World", "World hello")).toEqual(false);
        expect(equalsIgnoreCase("ABC", "abc")).toEqual(true);
        expect(equalsIgnoreCase("XyZ", "xYZ")).toEqual(true);
        
    });

    it("Should compare if one string includes another ignoring case", () => {
        expect(includesIgnoreCase("Hello World", "hello")).toEqual(true);
        expect(includesIgnoreCase("Hello World", "worlds")).toEqual(false);
        expect(includesIgnoreCase("Hello World", "llo wor")).toEqual(true);
        expect(includesIgnoreCase("Hello World", "Typescript")).toEqual(false);
        expect(includesIgnoreCase("hello world", "HELLO")).toEqual(true);
    });
})