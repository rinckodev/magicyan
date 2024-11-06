import { brBuilder, notFound } from "#package";
import { expect, it, describe } from "vitest";

describe("Test format functions", () => {


    it("Should set to undefined if value is nullish", () => {

        expect(notFound(null)).toBeTypeOf("undefined");

        expect(notFound(null)).toEqual(undefined);
        expect(notFound(undefined)).toEqual(undefined);
        
        expect(notFound(1)).not.toEqual(undefined);
        expect(notFound({})).not.toEqual(undefined);
        expect(notFound("")).not.toEqual(undefined);
        expect(notFound(true)).not.toEqual(undefined);
        
        expect(notFound(Math.random())).not.toEqual(undefined);

    });

    it("Should create a text with line breaks", () => {

        const text = ["hello", "world", null, "typescript", undefined, "bye"];
        const brText = brBuilder(text);

        expect(brText).toBeTypeOf("string");

        expect(brText).toEqual(text.filter(Boolean).join("\n"));

        expect(brText).length.greaterThanOrEqual(26);

    });

});