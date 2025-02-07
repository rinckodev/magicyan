export { Path2D } from "@napi-rs/canvas";

export type CanvasContextFillRule = "evenodd" | "nonzero";
export type AviConfig = {    
  quality?: number
  alphaQuality?: number
  speed?: number
  threads?: number
  chromaSubsampling?: ChromaSubsampling
};
export enum ChromaSubsampling {
    Yuv444 = 0,
    Yuv422 = 1,
    Yuv420 = 2,
    Yuv400 = 3,
}
export enum SvgExportFlag {
    ConvertTextToPaths = 0x01,
    NoPrettyXML = 0x02,
    RelativePathEncoding = 0x04,
}