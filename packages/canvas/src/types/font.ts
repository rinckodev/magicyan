export type ContextFontWeight = 
| "thin" | "extralight" | "light" | "regular" 
| "medium" | "semibold" | "bold" | "extrabold" | "black"
| "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export type ContextFontStyle = 
| "italic" 
| "italic underline" 
| "italic strikethrough"
| "italic strikethrough underline"
| "strikethrough" 
| "strikethrough underline"
| "underline"

export interface ContextTextMetrics {
    readonly actualBoundingBoxAscent: number;
    readonly actualBoundingBoxDescent: number;
    readonly actualBoundingBoxLeft: number;
    readonly actualBoundingBoxRight: number;
    readonly fontBoundingBoxAscent: number;
    readonly fontBoundingBoxDescent: number;
    readonly width: number;
    readonly height: number;
}

export type ContextFontKerning = "auto" | "none" | "normal";
export type ContextFontBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
export type ContextFontAlign = "center" | "end" | "left" | "right" | "start";