import { CanvasLineCap, CanvasLineJoin } from "../types/CanvasLine";
import { CanvasContext } from "./CanvasContext";

interface CanvasContextLineProps {
    width?: number;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    dashOffset?: number;
    dash?: number[]
}

export class CanvasContextLine {
    private lineWidth: number = 1;
    private lineCap: CanvasLineCap = "square";
    private lineJoin: CanvasLineJoin = "miter";
    private lineDashOffset: number = 0;
    private lineDash: number[] = [];
    public get width(){
        return this.lineWidth;
    }
    public get cap(){
        return this.lineCap;
    }
    public get join(){
        return this.lineJoin;
    }
    public get dashOffset(){
        return this.lineDashOffset;
    }
    public get dash(){
        return this.lineDash;
    }
    constructor(private readonly context: CanvasContext){}
    public set(props: CanvasContextLineProps){
        if (props.width) this.lineWidth = props.width;
        if (props.cap) this.lineCap = props.cap;
        if (props.join) this.lineJoin = props.join;
        if (props.dashOffset) this.lineDashOffset = props.dashOffset;
        if (props.dash) this.lineDash = props.dash;
        this.context.applyLine();
    }
    public setWidth(width: number){
        this.lineWidth = width;
        this.context.applyLine();
    }
    public setCap(cap: CanvasLineCap){
        this.lineCap = cap;
        this.context.applyLine();
    }
    public setJoin(join: CanvasLineJoin){
        this.lineJoin = join;
        this.context.applyLine();
    }
    public setDash(...segments: number[]){
        this.lineDash = segments;
        this.context.applyLine();
    }
    public setDashOffset(dashOffset: number){
        this.lineDashOffset = dashOffset;
        this.context.applyLine();
    }
}