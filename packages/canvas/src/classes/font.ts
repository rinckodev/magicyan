import type { CanvasFontKerning, CanvasTextAlign, CanvasTextBaseline, SKRSContext2D } from "@napi-rs/canvas";
import { ContextFontStyle, ContextFontWeight } from "../types/font";
import { StrOr } from "../types/utils";

export interface CanvasContextFontProps {
    family?: string;
    style?: StrOr<ContextFontStyle>;
    weight?: StrOr<ContextFontWeight>;
    size?: number;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
    kerning?: CanvasFontKerning;
}

export class CanvasContextFont {
    private fontFamily = "Arial";
    private fontStyle?: string;
    private fontWeight?: string;
    private fontSize = 12;
    private textAlign: CanvasTextAlign = "start";
    private textBaseline: CanvasTextBaseline = "top";
    private fontKerning: CanvasFontKerning = "auto";

    constructor(
        private context: SKRSContext2D, 
        props?: Partial<CanvasContextFontProps>
    ){
        if (props) this.set(props);
        this.updateFont();
    }

    private updateFont() {
        const parts: string[] = [];

        if (this.fontStyle) parts.push(this.fontStyle);
        if (this.fontWeight) parts.push(this.fontWeight);
        parts.push(`${this.fontSize}px`);
        parts.push(this.fontFamily);

        this.context.font = parts.join(" ");
        this.context.textAlign = this.textAlign;
        this.context.textBaseline = this.textBaseline;
        this.context.fontKerning = this.fontKerning;
    }

    public set(props: CanvasContextFontProps) {
        if (props.family) this.fontFamily = props.family;
        if (props.size) this.fontSize = props.size;
        if (props.style) this.fontStyle = props.style;
        if (props.weight) this.fontWeight = props.weight;
        if (props.align) this.textAlign = props.align;
        if (props.baseline) this.textBaseline = props.baseline;
        if (props.kerning) this.fontKerning = props.kerning;

        this.updateFont();
        return this;
    }

    get family() { return this.fontFamily; }
    get style() { return this.fontStyle; }
    get weight() { return this.fontWeight; }
    get size() { return this.fontSize; }
    get align() { return this.textAlign; }
    get baseline() { return this.textBaseline; }
    get kerning() { return this.fontKerning; }

    public setFamily(family: string) {
        this.fontFamily = family;
        this.updateFont();
        return this;
    }
    public setStyle(style: StrOr<ContextFontStyle>) {
        this.fontStyle = style;
        this.updateFont();
        return this;
    }
    public setWeight(weight: StrOr<ContextFontWeight>) {
        this.fontWeight = weight;
        this.updateFont();
        return this;
    }
    public setSize(size: number) {
        this.fontSize = size;
        this.updateFont();
        return this;
    }
    public setAlign(align: CanvasTextAlign) {
        this.textAlign = align;
        this.updateFont();
        return this;
    }
    public setBaseline(baseline: CanvasTextBaseline) {
        this.textBaseline = baseline;
        this.updateFont();
        return this;
    }
    public setKerning(kerning: CanvasFontKerning) {
        this.fontKerning = kerning;
        this.updateFont();
        return this;
    }
}