import { randomNumber, random, parseIntOrDefault, parseFloatOrDefault } from "#package";
import { describe, it, expect } from "vitest";

describe("randomNumber", () => {
    it("should return a number between the min and max values (inclusive)", () => {
      const min = 1;
      const max = 10;
      const result = randomNumber(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  
    it("should return the same number if min and max are equal", () => {
      const minMax = 5;
      const result = randomNumber(minMax, minMax);
      expect(result).toBe(minMax);
    });
  });
  
  describe("random", () => {
    describe("random.int", () => {
      it("should return an integer between min and max (inclusive)", () => {
        const min = 1;
        const max = 10;
        const result = random.int(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
      });
    });
  
    describe("random.float", () => {
      it("should return a float between min and max", () => {
        const min = 1.5;
        const max = 5.5;
        const result = random.float(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThan(max);
      });
  
      it("should return a positive number if min and max are both positive", () => {
        const min = 1;
        const max = 100;
        const result = random.float(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThan(max);
      });
    });
  });
  
  describe("parseIntOrDefault", () => {
    it("should parse a valid string to an integer", () => {
      const result = parseIntOrDefault("42", 0);
      expect(result).toBe(42);
    });
  
    it("should return default value when the string is not a valid integer", () => {
      const result = parseIntOrDefault("invalid", 10);
      expect(result).toBe(10);
    });
  
    it("should handle custom radix values", () => {
      const result = parseIntOrDefault("1010", 0, 2);
      expect(result).toBe(10);
    });
  });
  
  describe("parseFloatOrDefault", () => {
    it("should parse a valid string to a float", () => {
      const result = parseFloatOrDefault("42.42", 0);
      expect(result).toBeCloseTo(42.42);
    });
  
    it("should return default value when the string is not a valid float", () => {
      const result = parseFloatOrDefault("invalid", 10.5);
      expect(result).toBe(10.5);
    });
  });