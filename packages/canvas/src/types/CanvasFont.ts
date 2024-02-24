export type FontWeight = 
| "thin" | "extralight" | "light" | "regular" 
| "medium" | "semibold" | "bold" | "extrabold" | "black"
| "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export type FontStyle = 
| "italic" 
| "italic underline" 
| "italic strikethrough"
| "italic strikethrough underline"
| "strikethrough" 
| "strikethrough underline"
| "underline"
// | "italic" | "italic strikethrough" | "italic strikethrough underline"
// | "strikethrough" | "strikethrough underline" | "strikethrough underline italic"
// | "underline" | "underline italic" | "underline italic strikethrough"
// | "regular";

export interface TextMetrics {
    readonly actualBoundingBoxAscent: number;
    readonly actualBoundingBoxDescent: number;
    readonly actualBoundingBoxLeft: number;
    readonly actualBoundingBoxRight: number;
    readonly fontBoundingBoxAscent: number;
    readonly fontBoundingBoxDescent: number;
    readonly width: number;
    readonly height: number;
}

export type FontKerning = "auto" | "none" | "normal";