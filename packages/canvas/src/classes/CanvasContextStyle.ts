import { CanvasGradient, CanvasPattern, Color } from "../types/CanvasContext";
import { CanvasContext } from "./CanvasContext";

export class CanvasContextStyle {
    private fillStyle: Color | CanvasGradient | CanvasPattern = "black";
    private strokeStyle: Color | CanvasGradient | CanvasPattern = "black";

    public get fill(){
        return this.fillStyle;
    }
    public get stroke(){
        return this.strokeStyle;
    }
    constructor(private readonly context: CanvasContext){}
    public set(type: "fill" | "stroke", style: Color | CanvasGradient | CanvasPattern){
        switch(type){
            case "stroke": this.setStroke(style); break;
            default: this.setFill(style);
        }
    }
    public setFill(style: Color | CanvasGradient | CanvasPattern){
        this.fillStyle = style;
        this.context.applyStyle();
    }
    public setStroke(style: Color | CanvasGradient | CanvasPattern){
        this.strokeStyle = style;
        this.context.applyStyle();
    }
}