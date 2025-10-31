import { describe, it, expect } from "vitest";
import { createFileUpload } from "#package";
import { ComponentType, FileUploadBuilder } from "discord.js";

describe("createFileUpload", () => {
    it("creates FileUploadBuilder from a complete FileUploadData object", () => {
        const input = {
            customId: "file1",
            minValues: 1,
            maxValues: 5,
            required: true,
            id: 42
        };

        const result = createFileUpload(input);

        expect(result).toBeInstanceOf(FileUploadBuilder);
        expect(result).toHaveProperty("data");
        expect(result.data).toEqual({
            type: ComponentType.FileUpload,
            custom_id: "file1",
            min_values: 1,
            max_values: 5,
            required: true,
            id: 42
        });
    });

    it("creates with string + required + maxValues + minValues", () => {
        const result = createFileUpload("upload1", true, 5, 1);

        expect(result.data).toEqual({
            type: ComponentType.FileUpload,
            custom_id: "upload1",
            required: true,
            max_values: 5,
            min_values: 1
        });

    });

    it("creates with string + maxValues + minValues (without required)", () => {
        const result = createFileUpload("upload2", 10, 2);

        expect(result.data).toEqual({
            type: ComponentType.FileUpload,
            custom_id: "upload2",
            max_values: 10,
            min_values: 2
        });
    });

    it("creates with string and only maxValues", () => {
        const result = createFileUpload("upload3", 3);

        expect(result.data).toEqual({
            type: ComponentType.FileUpload,

            custom_id: "upload3",
            max_values: 3
        });
    });

    it("creates with string and only required", () => {
        const result = createFileUpload("upload4", false);

        expect(result.data).toEqual({
            type: ComponentType.FileUpload,
            custom_id: "upload4",
            required: false
        });
    });

    it("creates with only string (no other values)", () => {
        const result = createFileUpload("upload5");

        expect(result.data).toEqual({
            type: ComponentType.FileUpload,
            custom_id: "upload5"
        });
    });
});
