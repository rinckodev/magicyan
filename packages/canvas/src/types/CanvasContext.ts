import { DOMMatrix2DInit, Image as NapiImage } from "@napi-rs/canvas";
import { CssColors } from "./Colors";

export type Color = (string&{}) | `#${string}` | CssColors; 

export interface ContextAttributes {
    alpha?: boolean
    colorSpace?: ColorSpace
}

export type ColorSpace = "srgb" | "display-p3";

export interface CanvasPointInit {
    w?: number;
    x?: number;
    y?: number;
    z?: number;
}

export type CanvasTextAlign = "center" | "end" | "left" | "right" | "start";
export type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";

export interface CanvasGradient {
    addColorStop(offset: number, color: Color): void;
}

interface ColorStop {
    [pos: number]: Color;
}

interface GradientProps {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

interface LinearGradientProps extends GradientProps {
    type: "linear"
    colorStop?: ColorStop;
}
interface RadialGradientProps extends GradientProps {
    type: "radial";
    r0: number;
    r1: number;
    colorStop?: ColorStop;
}

interface ConicGradientProps {
    type: "conic";
    startAngle: number, 
    x: number, 
    y: number,
    colorStop?: ColorStop;
}

export interface CanvasContextCreateGradient {
    (props: LinearGradientProps): CanvasGradient;
    (props: RadialGradientProps): CanvasGradient;
    (props: ConicGradientProps): CanvasGradient;
}

export type Image = NapiImage;

export interface CanvasPattern {
    setTransform(transform?: DOMMatrix2DInit): void;
}

type DrawImageCoords = {
    dx: number; dy: number;
};
type DrawImageDimensions = {
    width: number, heigth: number;
}
type DrawImageSub = {
    sx: number,
    sy: number,
    sWidth: number,
    sHeigth: number,
};

export type DrawImageProps = DrawImageCoords & {
    dimensions?: DrawImageDimensions
    sub?: DrawImageSub;
    roundRadius?: number | number[];
}

export type CanvasDirection = "inherit" | "ltr" | "rtl";
export type GlobalCompositeOperation = "color" | "color-burn" | "color-dodge" | "copy" | "darken" | "destination-atop" | "destination-in" | "destination-out" | "destination-over" | "difference" | "exclusion" | "hard-light" | "hue" | "lighten" | "lighter" | "luminosity" | "multiply" | "overlay" | "saturation" | "screen" | "soft-light" | "source-atop" | "source-in" | "source-out" | "source-over" | "xor";
