import { BlurFilter, BrightnessFilter, ContrastFilter, DropShadowFilter, GrayscaleFilter, HueRotateFilter, InvertFilter, OpacityFilter, SepiaFilter } from "../types/CanvasFilter";
import { Color } from "../types/CanvasContext";

export function blurFilter(amount: number): BlurFilter {
    return `blur(${amount}px)`;
}
export function opacityFilter(percentage: number): OpacityFilter {
    return `opacity(${percentage}%)`;
}
export function hueRotateFilter(deg: number): HueRotateFilter {
    return `hue-rotate(${deg}deg)`;
}
export function sepiaFilter(percentage: number): SepiaFilter {
    return `sepia(${percentage}%)`;
}
export function brightnessFilter(percentage: number): BrightnessFilter {
    return `brightness(${percentage}%)`;
}
export function contrastFilter(percentage: number): ContrastFilter {
    return `contrast(${percentage}%)`;
}
export function invertFilter(percentage: number): InvertFilter {
    return `invert(${percentage}%)`;
}
export function grayscaleFilter(percentage: number): GrayscaleFilter {
    return `grayscale(${percentage}%)`;
}
export function dropShadowFilter(x: number, y: number, blur: number, color: Color = "black"): DropShadowFilter {
    return `drop-shadow(${x}px ${y}px ${blur}px ${color})`;
}

export const filter = {
    blur: blurFilter,
    opacity: opacityFilter,
    hueRotate: hueRotateFilter,
    sepia: sepiaFilter,
    brightness: brightnessFilter,
    contrast: contrastFilter,
    invert: invertFilter,
    grayscale: grayscaleFilter,
    drop: dropShadowFilter
};