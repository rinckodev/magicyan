import { FileUploadBuilder } from "discord.js";

export interface FileUploadData {
    customId?: string;
    minValues?: number,
    maxValues?: number,
    required?: boolean;
    id?: number;
}

export function createFileUpload(data: FileUploadData): FileUploadBuilder
export function createFileUpload(customId: string): FileUploadBuilder
export function createFileUpload(arg: FileUploadData | string): FileUploadBuilder {
    if (typeof arg === "string") return new FileUploadBuilder({
        custom_id: arg
    });

    const { customId, maxValues, minValues, ...data } = arg;

    return new FileUploadBuilder({
        custom_id: customId,
        max_values: maxValues,
        min_values: minValues,
        ...data,
    });
}