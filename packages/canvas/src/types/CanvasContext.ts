import { DOMMatrix2DInit, Image as NapiImage } from "@napi-rs/canvas";
import { CssColors } from "./Colors";

export type ContextColor = (string&{}) | `#${string}` | CssColors; 

export interface ContextAttributes {
    alpha?: boolean
    colorSpace?: ColorSpace
}

export type ColorSpace = "srgb" | "display-p3";

export interface CanvasContextPointInit {
    w?: number;
    x?: number;
    y?: number;
    z?: number;
}

export type CanvasContextTextAlign = "center" | "end" | "left" | "right" | "start";
export type CanvasContextTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";

export interface CanvasContextGradient {
    addColorStop(offset: number, color: ContextColor): void;
}

interface ContextColorStop {
    [pos: number]: ContextColor;
}

interface ContextGradientProps {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

interface ContextLinearGradientProps extends ContextGradientProps {
    type: "linear"
    colorStop?: ContextColorStop;
}
interface ContextRadialGradientProps extends ContextGradientProps {
    type: "radial";
    r0: number;
    r1: number;
    colorStop?: ContextColorStop;
}

interface ContextConicGradientProps {
    type: "conic";
    startAngle: number, 
    x: number, 
    y: number,
    colorStop?: ContextColorStop;
}

export interface CanvasContextCreateGradient {
    (props: ContextLinearGradientProps): CanvasContextGradient;
    (props: ContextRadialGradientProps): CanvasContextGradient;
    (props: ContextConicGradientProps): CanvasContextGradient;
}

export type Image = NapiImage;

export interface CanvasContextPattern {
    setTransform(transform?: DOMMatrix2DInit): void;
}

type ContextDrawImageCoords = {
    dx: number; dy: number;
};
type ContextDrawImageDimensions = {
    width: number, heigth: number;
}
type ContextDrawImageSub = {
    sx: number,
    sy: number,
    sWidth: number,
    sHeigth: number,
};

export type ContextDrawImageProps = ContextDrawImageCoords & {
    dimensions?: ContextDrawImageDimensions
    sub?: ContextDrawImageSub;
    roundRadius?: number | number[];
}

export type CanvasContextDirection = "inherit" | "ltr" | "rtl";
export type ContextGlobalCompositeOperation = "color" | "color-burn" | "color-dodge" | "copy" | "darken" | "destination-atop" | "destination-in" | "destination-out" | "destination-over" | "difference" | "exclusion" | "hard-light" | "hue" | "lighten" | "lighter" | "luminosity" | "multiply" | "overlay" | "saturation" | "screen" | "soft-light" | "source-atop" | "source-in" | "source-out" | "source-over" | "xor";
