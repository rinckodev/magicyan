import { AvifConfig, ContextAttributes, Image, Canvas as NapiCanvas } from "@napi-rs/canvas";
import { PathLike } from "node:fs";
import fs, { FileHandle } from "node:fs/promises";
import { loadImage } from "../functions/images";
import { SvgExportFlag } from "../types/Canvas";
import { CanvasContext } from "./CanvasContext";

export class Canvas {
    public static loadImage = loadImage;
    public readonly width: number;
    public readonly height: number;
    private napiCanvas: NapiCanvas;
    private context?: CanvasContext;
    constructor(width: number, height: number, flag?: SvgExportFlag){
        this.napiCanvas = new NapiCanvas(width, height, flag);
        this.width = width;
        this.height = height;

        this.encode = this.napiCanvas.encode.bind(this.napiCanvas);
        this.toDataURL = this.napiCanvas.toDataURLAsync.bind(this.napiCanvas);
    }
    public encode;
    public toDataURL;
    public getContext(attributes?: ContextAttributes){
        this.context = new CanvasContext({
            napiCanvas: this.napiCanvas, attributes,
            context: this.context, 
        });
        return this.context;
        
    }
    public async writeFile(file: PathLike | FileHandle, format: "png"): Promise<void>
    public async writeFile(file: PathLike | FileHandle, format: "webp" | "jpeg", quality?: number): Promise<void>
    public async writeFile(file: PathLike | FileHandle, format: "avif", cfg?: AvifConfig): Promise<void>
    public async writeFile(file: PathLike | FileHandle, format: any, other?: any){
        const buffer = await this.encode(format, other);
        return fs.writeFile(file, buffer);
    }
    public async toImage(): Promise<Image> {
        return loadImage(this.napiCanvas.toDataURL());
    }
}