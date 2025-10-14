import type { StrOr } from "../types/utils";
import type { ContextGradient } from "../types/gradient";
import type { CssColors } from "../types/colors";

export type ContextGradientStops = Record<number, StrOr<CssColors>>;

export function setGradientStops<T extends ContextGradient>(gradient: T, stops: ContextGradientStops): ContextGradient {
    for(const [stop, color] of Object.entries(stops)){
        const offset = Number(stop);
        if (Number.isNaN(offset)) continue;
        gradient.addColorStop(offset, color);
    }
    return gradient;
}