import { CanvasContextGradient, CanvasContextPattern, ContextColor } from "../types/CanvasContext";
import { CanvasContext } from "./CanvasContext";

export class CanvasContextStyle {
    private fillStyle: ContextColor | CanvasContextGradient | CanvasContextPattern = "black";
    private strokeStyle: ContextColor | CanvasContextGradient | CanvasContextPattern = "black";

    public get fill(){
        return this.fillStyle;
    }
    public get stroke(){
        return this.strokeStyle;
    }
    constructor(private readonly context: CanvasContext){}
    public set(type: "fill" | "stroke", style: ContextColor | CanvasContextGradient | CanvasContextPattern){
        switch(type){
            case "stroke": this.setStroke(style); break;
            default: this.setFill(style);
        }
    }
    public setFill(style: ContextColor | CanvasContextGradient | CanvasContextPattern){
        this.fillStyle = style;
        this.context.applyStyle();
    }
    public setStroke(style: ContextColor | CanvasContextGradient | CanvasContextPattern){
        this.strokeStyle = style;
        this.context.applyStyle();
    }
}