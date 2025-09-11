import { describe, it, expect } from "vitest";
import { toMs } from "#package";

describe("toMs", () => {
  it("converts seconds to milliseconds", () => {
    expect(toMs(5, "seconds")).toBe(5000);
  });

  it("converts minutes to milliseconds", () => {
    expect(toMs(2, "minutes")).toBe(120000);
  });

  it("converts hours to milliseconds", () => {
    expect(toMs(1.5, "hours")).toBe(5400000);
  });

  it("converts days to milliseconds", () => {
    expect(toMs(1, "days")).toBe(86400000);
  });

  it("defaults to seconds when unit is not provided", () => {
    expect(toMs(30)).toBe(30000);
  });

  it("handles zero correctly", () => {
    expect(toMs(0, "seconds")).toBe(0);
    expect(toMs(0, "minutes")).toBe(0);
    expect(toMs(0, "hours")).toBe(0);
    expect(toMs(0, "days")).toBe(0);
  });

  it("handles fractional values", () => {
    expect(toMs(0.5, "seconds")).toBe(500);
    expect(toMs(0.25, "minutes")).toBe(15000);
  });
});
