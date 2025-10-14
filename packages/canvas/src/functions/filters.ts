import type { StrOr } from "../types/utils";
import type { CssColors } from "../types/colors";

export const Filter = {
    blur(amount: number): string {
        return `blur(${amount}px)`;
    },
    opacity(percentage: number): string {
        return `opacity(${percentage}%)`;
    },
    hueRotate(deg: number): string {
        return `hue-rotate(${deg}deg)`;
    },
    sepia(percentage: number): string {
        return `sepia(${percentage}%)`;
    },
    brightness(percentage: number): string {
        return `brightness(${percentage}%)`;
    },
    contrast(percentage: number): string {
        return `contrast(${percentage}%)`;
    },
    invert(percentage: number): string {
        return `invert(${percentage}%)`;
    },
    grayscale(percentage: number): string {
        return `grayscale(${percentage}%)`;
    },
    dropShadow(x: number, y: number, blur: number, color: StrOr<CssColors> = "black"): string {
        return `drop-shadow(${x}px ${y}px ${blur}px ${color})`;
    }
} as const;

export const {
    blur,
    opacity,
    hueRotate,
    sepia,
    brightness,
    contrast,
    invert,
    grayscale,
    dropShadow
} = Filter;