import { describe, it, expect } from "vitest";
import { createDate } from "#package";

describe("DatePlus", () => {
    it("should create a date from now when no args", () => {
        const d = createDate();
        expect(d).toBeInstanceOf(Date);
    });

    it("should add and subtract days", () => {
        const d = createDate("2025-01-01T00:00:00Z");
        d.add("days", 5);
        expect(d.getTime()).toBe(new Date("2025-01-06T00:00:00Z").getTime());

        d.sub("days", 2);
        expect(d.getTime()).toBe(new Date("2025-01-04T00:00:00Z").getTime());
    });

    it("should add and subtract hours", () => {
        const d = createDate("2025-01-01T00:00:00Z");
        d.add("hours", 10);
        expect(d.getTime()).toBe(new Date("2025-01-01T10:00:00Z").getTime());

        d.sub("hours", 5);
        expect(d.getTime()).toBe(new Date("2025-01-01T05:00:00Z").getTime());
    });

    it("should set units correctly (local time)", () => {
        const d = createDate("2025-01-01T00:00:00Z");
        d.set("hours", 15);
        expect(d.getHours()).toBe(15); 

        d.set("days", 10);
        expect(d.getDate()).toBe(10);
    });

    it("should clone a date", () => {
        const d1 = createDate("2025-01-01T12:00:00Z");
        const d2 = d1.clone();

        expect(d2.getTime()).toBe(d1.getTime());
        expect(d2).not.toBe(d1);
    });

    it("should diff in milliseconds", () => {
        const d1 = createDate("2025-01-01T00:00:00Z");
        const d2 = createDate("2025-01-02T00:00:00Z");

        expect(d2.diff(d1)).toBe(24 * 60 * 60 * 1000);
    });

    it("should diff in days", () => {
        const d1 = createDate("2025-01-01T00:00:00Z");
        const d2 = createDate("2025-01-10T00:00:00Z");

        expect(d2.diff(d1, "days")).toBe(9);
    });

    it("should diff in months", () => {
        const d1 = createDate("2025-01-01T00:00:00Z");
        const d2 = createDate("2025-04-01T00:00:00Z");

        expect(d2.diff(d1, "months")).toBe(3);
    });

    it("should diff in years", () => {
        const d1 = createDate("2020-01-01T00:00:00Z");
        const d2 = createDate("2025-01-01T00:00:00Z");

        expect(d2.diff(d1, "years")).toBe(5);
    });
});
