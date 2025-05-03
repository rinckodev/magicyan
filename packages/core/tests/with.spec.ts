import { describe, it, expect, vi } from "vitest";
import { withProperties, withTimeout } from "#package";

describe("withProperties", () => {
    it("should assign properties to a function", () => {
        function greet(name: string) {
            return `Hello, ${name}!`;
        }

        const enhanced = withProperties(greet, {
            version: "1.0.0",
            description: "Greets someone",
        });

        expect(enhanced("World")).toBe("Hello, World!");
        expect(enhanced.version).toBe("1.0.0");
        expect(enhanced.description).toBe("Greets someone");
    });

    it("should assign properties to an object", () => {
        const base = {
            sum(a: number, b: number) {
                return a + b;
            },
        };

        const extended = withProperties(base, {
            author: "Dev",
        });

        expect(extended.sum(2, 3)).toBe(5);
        expect(extended.author).toBe("Dev");
    });

    it("should overwrite existing properties", () => {
        const original = {
            name: "Old",
        };

        const result = withProperties(original, {
            name: "New",
        });

        expect(result.name).toBe("New");
    });

    it("should allow dynamic function enhancement", () => {
        const handler = vi.fn((value: number) => value * 2);

        const enhanced = withProperties(handler, {
            type: "multiplier",
        });

        expect(enhanced(5)).toBe(10);
        expect(handler).toHaveBeenCalledWith(5);
        expect(enhanced.type).toBe("multiplier");
    });
});


describe("withTimeout", () => {
    it("should resolve the original promise before timeout", async () => {
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve("ok"), 10)),
            50
        );

        expect(result).toBe("ok");
    });

    it("should return fallback value if timeout is reached first", async () => {
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve("late"), 50)),
            10,
            "fallback"
        );

        expect(result).toBe("fallback");
    });

    it("should return null if no fallback is provided and timeout is reached", async () => {
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve("too late"), 50)),
            10
        );

        expect(result).toBe(null);
    });

    it("should resolve with original promise when both finish nearly together, original wins", async () => {
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve("fast enough"), 15)),
            20,
            "timeout"
        );

        expect(result).toBe("fast enough");
    });

    it("should work with numeric fallback", async () => {
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve(123), 50)),
            10,
            999
        );

        expect(result).toBe(999);
    });

    it("should work with object fallback", async () => {
        const fallback = { status: "timeout" };
        const result = await withTimeout(
            new Promise((resolve) => setTimeout(() => resolve({ status: "ok" }), 50)),
            10,
            fallback
        );

        expect(result).toEqual(fallback);
    });
});