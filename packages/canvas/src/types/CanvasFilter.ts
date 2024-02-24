import { Color } from "./CanvasContext";

export type BlurFilter = `blur(${number}px)`;
export type OpacityFilter = `opacity(${number}%)`;
export type HueRotateFilter = `hue-rotate(${number}deg)`;
export type SepiaFilter = `sepia(${number}%)`;
export type BrightnessFilter = `brightness(${number}%)`;
export type ContrastFilter = `contrast(${number}%)`;
export type InvertFilter = `invert(${number}%)`;
export type GrayscaleFilter = `grayscale(${number}%)`;
export type DropShadowFilter = `drop-shadow(${number}px ${number}px ${number}px ${Color})`;
export type NoneFilter = "none";

export const canvasFilter = {
    Blur: "blur",
    Opacity: "opacity",
    HueRotate: "hue-rotate",
    Sepia: "sepia",
    Brightness: "brightness",
    Invert: "invert",
    Grayscale: "grayscale",
    DropShadow: "drop-shadow"
} as const;

export type CanvasFilters = 
| BlurFilter
| OpacityFilter
| HueRotateFilter
| SepiaFilter
| BrightnessFilter
| ContrastFilter
| InvertFilter
| GrayscaleFilter
| DropShadowFilter
| NoneFilter;