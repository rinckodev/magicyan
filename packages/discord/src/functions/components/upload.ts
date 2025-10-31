import { isDefined } from "@magicyan/core";
import { APIFileUploadComponent, FileUploadBuilder } from "discord.js";

export interface FileUploadData {
    customId?: string;
    minValues?: number;
    maxValues?: number;
    required?: boolean;
    id?: number;
}

/**
 * Creates a file upload component using an object configuration.
 * 
 * This overload is useful when you already have your file upload settings grouped in an object.
 * Each field corresponds directly to the {@link APIFileUploadComponent} properties.
 *
 * @param data - The configuration object containing the upload settings.
 * @returns A new {@link FileUploadBuilder} instance configured with the provided data.
 *
 * @example
 * ```ts
 * const upload = createFileUpload({
 *   customId: "images",
 *   required: true,
 *   maxValues: 5,
 *   minValues: 1
 * });
 * ```
 */
export function createFileUpload(data: FileUploadData): FileUploadBuilder;

/**
 * Creates a file upload component using explicit parameters.
 * 
 * Use this overload when you want to control the required flag and the upload limits separately.
 *
 * @param customId - The custom identifier for the file upload component.
 * @param required - Whether the file upload is required before submitting.
 * @param maxValues - The maximum number of files that can be uploaded.
 * @param minValues - The minimum number of files required to upload.
 * @returns A new {@link FileUploadBuilder} instance configured with the provided values.
 *
 * @example
 * ```ts
 * const upload = createFileUpload("files", true, 5, 1);
 * ```
 */
export function createFileUpload(
    customId: string,
    required?: boolean,
    maxValues?: number,
    minValues?: number
): FileUploadBuilder;
/**
 * Creates a file upload component specifying only numeric limits.
 * 
 * Use this overload when you only need to define upload limits,
 * and the `required` flag should remain optional.
 *
 * @param customId - The custom identifier for the file upload component.
 * @param maxValues - The maximum number of files that can be uploaded.
 * @param minValues - The minimum number of files required to upload.
 * @returns A new {@link FileUploadBuilder} instance configured with the provided values.
 *
 * @example
 * ```ts
 * const upload = createFileUpload("images", 10, 2);
 * ```
 */
export function createFileUpload(
    customId: string,
    maxValues?: number,
    minValues?: number
): FileUploadBuilder;
export function createFileUpload(
    arg: FileUploadData | string,
    argB?: boolean | number,
    argC?: number,
    argD?: number
): FileUploadBuilder {
    if (typeof arg === "object") {
        return new FileUploadBuilder({
            custom_id: arg.customId,
            max_values: arg.maxValues,
            min_values: arg.minValues,
            required: arg.required,
            id: arg.id
        });
    }
    
    let custom_id = arg;
    let required: boolean | undefined;
    let max_values: number | undefined;
    let min_values: number | undefined;
    
    if (typeof argB === "boolean") {
        required = argB;
        max_values = argC;
        min_values = argD;
    }
    else if (typeof argB === "number") {
        max_values = argB;
        min_values = argC;
    }

    const data: Partial<APIFileUploadComponent> = { custom_id };

    if (isDefined(required)) data.required = required;
    if (isDefined(max_values)) data.max_values = max_values;
    if (isDefined(min_values)) data.min_values = min_values;

    return new FileUploadBuilder(data);
}