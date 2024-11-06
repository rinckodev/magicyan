import { equalsIgnoreCase } from "#package";
import { expect, test } from "vitest";

test("check function", () => {
    const isEqual = equalsIgnoreCase("Hello World", "hello world");

    expect(isEqual).toEqual(true);
});