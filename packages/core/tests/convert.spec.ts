import { rgbToHex, hexToRgb } from "#package";
import { expect, it, describe } from "vitest";

describe("Test convert functions", () => {

    it("It should correctly convert rgb colors to hex code", () => {
        expect(rgbToHex(16711680)).toBe("#ff0000");
        expect(rgbToHex(65297)).toBe("#00ff11");
        expect(rgbToHex(28671)).toBe("#006fff");
        expect(rgbToHex(5097983)).toBe("#4dc9ff");
        expect(rgbToHex(16767232)).toBe("#ffd900");
        expect(rgbToHex(16711820)).toBe("#ff008c");
    });
    
    it("It should correctly convert hex colors to rgb code", () => {
        expect(hexToRgb("#ff0000")).toBe(16711680);
        expect(hexToRgb("#00ff11")).toBe(65297);
        expect(hexToRgb("#006fff")).toBe(28671);
        expect(hexToRgb("#4dc9ff")).toBe(5097983);
        expect(hexToRgb("#ffd900")).toBe(16767232);
        expect(hexToRgb("#ff008c")).toBe(16711820);
    });

});