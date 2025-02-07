import { CanvasContextTextAlign, CanvasContextTextBaseline } from "../types/CanvasContext";
import { ContextFontKerning, ContextFontStyle, ContextFontWeight } from "../types/CanvasFont";
import { CanvasContext } from "./CanvasContext";

interface CanvasContextFontProps {
    family?: string;
    style?: ContextFontStyle;
    weight?: ContextFontWeight;
    size?: number;
    align?: CanvasContextTextAlign;
    baseline?: CanvasContextTextBaseline;
    kerning?: ContextFontKerning;
}

export class CanvasContextFont {
    private fontFamily: string = "Arial";
    private fontStyle?: ContextFontStyle;
    private fontWeight?: ContextFontWeight;
    private fontSize: number = 12;
    private textAlign: CanvasContextTextAlign = "start";
    private textBaseline: CanvasContextTextBaseline = "top";
    private fontKerning: ContextFontKerning = "auto";

    public get family(){
        return this.fontFamily;
    }
    public get style(){
        return this.fontStyle;
    }
    public get weight(){
        return this.fontWeight;
    }
    public get size(){
        return this.fontSize;
    }
    public get align(){
        return this.textAlign;
    }
    public get baseline(){
        return this.textBaseline;
    }
    public get kerning(){
        return this.fontKerning;
    }
    constructor(private readonly context: CanvasContext){}
    public set(props: CanvasContextFontProps){
        if (props.family) this.fontFamily = props.family;
        if (props.size) this.fontSize = props.size;
        if (props.style) this.fontStyle = props.style;
        if (props.weight) this.fontWeight = props.weight;
        if (props.align) this.textAlign = props.align;
        if (props.baseline) this.textBaseline = props.baseline;
        this.context.applyFont();
    }
    public setFamily(family: string){
        this.fontFamily = family;
        this.context.applyFont();
    }
    public setStyle(style: ContextFontStyle){
        this.fontStyle = style;
        this.context.applyFont();
    }
    public setSize(size: number){
        this.fontSize = size;
        this.context.applyFont();
    }
    public setWeight(weight: ContextFontWeight){
        this.fontWeight = weight;
        this.context.applyFont();
    }
    public setAlign(align: CanvasContextTextAlign){
        this.textAlign = align;
        this.context.applyFont();
    }
    public setBaseline(baseline: CanvasContextTextBaseline){
        this.textBaseline = baseline;
        this.context.applyFont();
    }
    public setKerning(kerning: ContextFontKerning){
        this.fontKerning = kerning;
        this.context.applyFont();
    }
}