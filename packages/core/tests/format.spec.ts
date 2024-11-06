import { brBuilder, spaceBuilder } from "#package";
import { expect, test } from "vitest";

test("brBuilder function", () => {
    const text = brBuilder("1", "2", null, "3", ["a", "b", undefined, "c"]);

    const compare = ["1", "2", "3", "a", "b", "c"].join("\n");

    expect(text).toEqual(compare);
});

test("spaceBuilder function", () => {
    const text = spaceBuilder("1", "2", null, "3", ["a", "b", undefined, "c"]);

    const compare = ["1", "2", "3", "a", "b", "c"].join(" ");

    expect(text).toEqual(compare);
});