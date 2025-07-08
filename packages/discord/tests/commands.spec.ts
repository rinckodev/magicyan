import { commandMention } from "#package";
import { describe, expect, it } from "vitest";

describe("commandMention", () => {
    const command = { id: "123", name: "ping" };

    it("should generate mention with command only", () => {
        const result = commandMention(command);
        expect(result).toEqual("</ping:123>");
    });

    it("should generate mention with command and group", () => {
        const result = commandMention(command, "group");
        expect(result).toEqual("</ping group:123>");
    });

    it("should generate mention with command, group, and subcommand", () => {
        const result = commandMention(command, "group", "subcommand");
        expect(result).toEqual("</ping group subcommand:123>");
    });
});
