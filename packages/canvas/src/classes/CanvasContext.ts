import { ContextAttributes, Canvas as NapiCanvas, SKRSContext2D as NapiContext } from "@napi-rs/canvas";
import { CanvasContextCreateGradient, CanvasDirection, DrawImageProps, GlobalCompositeOperation, Image } from "../types/CanvasContext";
import { ContextTextMetrics } from "../types/CanvasFont";
import { CanvasContextFilter } from "./CanvasContextFilter";
import { CanvasContextFont } from "./CanvasContextFont";
import { CanvasContextLine } from "./CanvasContextLine";
import { CanvasContextStyle } from "./CanvasContextStyle";

export class CanvasContext {
    private readonly napiContext: NapiContext;
    public readonly font: CanvasContextFont;
    public readonly filter: CanvasContextFilter;
    public readonly style: CanvasContextStyle;
    public readonly line: CanvasContextLine;
    constructor(options: { napiCanvas: NapiCanvas, attributes?: ContextAttributes, context?: CanvasContext }){
        this.napiContext = options.napiCanvas.getContext("2d", options.attributes);
        
        this.font = options.context?.font ?? new CanvasContextFont(this);
        this.filter = options.context?.filter ?? new CanvasContextFilter(this);
        this.style = options.context?.style ?? new CanvasContextStyle(this);
        this.line = options.context?.line ?? new CanvasContextLine(this);

        this.clearRect = this.napiContext.clearRect.bind(this.napiContext);
        this.roundRect = this.napiContext.roundRect.bind(this.napiContext);
        this.fill = this.napiContext.fill.bind(this.napiContext);
        this.stroke = this.napiContext.stroke.bind(this.napiContext);
        this.beginPath = this.napiContext.beginPath.bind(this.napiContext);
        this.closePath = this.napiContext.closePath.bind(this.napiContext);
        this.clip = this.napiContext.clip.bind(this.napiContext);
        this.save = this.napiContext.save.bind(this.napiContext);
        this.restore = this.napiContext.restore.bind(this.napiContext);
        this.moveTo = this.napiContext.moveTo.bind(this.napiContext);
        this.lineTo = this.napiContext.lineTo.bind(this.napiContext);
        this.arc = this.napiContext.arc.bind(this.napiContext);
        this.arcTo = this.napiContext.arcTo.bind(this.napiContext);
        this.bezierCurveTo = this.napiContext.bezierCurveTo.bind(this.napiContext);
        this.quadraticCurveTo = this.napiContext.quadraticCurveTo.bind(this.napiContext);
        this.ellipse = this.napiContext.ellipse.bind(this.napiContext);
        this.transform = this.napiContext.transform.bind(this.napiContext);
        this.translate = this.napiContext.translate.bind(this.napiContext);
        this.scale = this.napiContext.scale.bind(this.napiContext);
        this.rotate = this.napiContext.rotate.bind(this.napiContext);
        this.isPointInPath = this.napiContext.isPointInPath.bind(this.napiContext);
        this.isPointInStroke = this.napiContext.isPointInStroke.bind(this.napiContext);
        this.getAttributes = this.napiContext.getContextAttributes.bind(this.napiContext);
        this.createPattern = this.napiContext.createPattern.bind(this.napiContext);
    }
    public fill;
    public stroke;
    public fillRect(x: number, y: number, width: number, height: number, radii?: number | number[]){
        if (radii){
            this.save();
            this.beginPath();
            this.roundRect(x, y, width, height, radii);
            this.fill();
            this.closePath();
            this.restore();
            return;
        }
        this.napiContext.fillRect(x, y, width, height);
    }
    public strokeRect(x: number, y: number, width: number, height: number, radii?: number | number[]){
        if (radii){
            this.save();
            this.beginPath();
            this.roundRect(x, y, width, height, radii);
            this.stroke();
            this.closePath();
            this.restore();
            return;
        }
        this.napiContext.strokeRect(x, y, width, height);
    }
    public fillText(text: string, x: number, y: number, maxWidth?: number){
        this.applyFont();
        this.napiContext.fillText(text, x, y, maxWidth);
    }
    public strokeText(text: string, x: number, y: number, maxWidth?: number){
        this.applyFont();
        this.napiContext.strokeText(text, x, y, maxWidth);
    }
    public clearRect;
    public roundRect;
    public measureText(text: string): ContextTextMetrics {
        return {
            ...this.napiContext.measureText(text),
            height: this.font.size
        };
    }
    public beginPath;
    public closePath;
    public clip;
    public save;
    public restore;
    public moveTo;
    public lineTo;
    public arc;
    public arcTo;
    public bezierCurveTo;
    public quadraticCurveTo;
    public ellipse;
    public transform;
    public translate;
    public scale;
    public rotate;

    public get direction(){
        return this.napiContext.direction;
    }
    public setDirection(direction: CanvasDirection){
        this.napiContext.direction = direction;
    }

    public setGlobalCompositeOperation(option: GlobalCompositeOperation){
        this.napiContext.globalCompositeOperation = option;
    }
    public get globalCompositeOperation(){
        return this.napiContext.globalCompositeOperation;
    }

    public setAlpha(value: number){
        this.napiContext.globalAlpha = value; 
    }
    public get globalAlpha(){
        return this.napiContext.globalAlpha;
    }

    public isPointInPath;
    public isPointInStroke;

    public applyLine(){
        const { width, cap, dashOffset, join, dash } = this.line;
        if (width) this.napiContext.lineWidth = width;
        if (cap) this.napiContext.lineCap = cap;
        if (dashOffset) this.napiContext.lineDashOffset = dashOffset;
        if (join) this.napiContext.lineJoin = join;
        if (dash) this.napiContext.setLineDash(dash);
    }
    public applyFont(){
        const { family, size, style, weight, align, baseline, kerning } = this.font;

        const base = `${size}px ${family}`;

        this.napiContext.font = style && weight ? `${style} ${weight} ${base}` :
        style ? `${style} ${base}` :
        weight ? `${weight} ${base}` : base;

        this.napiContext.textAlign = align;
        this.napiContext.textBaseline = baseline;

        this.napiContext.fontKerning = kerning;
    }
    public applyFilters(){
        this.napiContext.filter = this.filter.current.join(" ");
    }
    public applyStyle(){
        this.napiContext.fillStyle = this.style.fill;
        this.napiContext.strokeStyle = this.style.stroke;
    }
    public getAttributes;
    public createGradient: CanvasContextCreateGradient = (props) => {
        const { type, colorStop } = props;
        let gradient = this.napiContext.createConicGradient(0, 0, 0);
        switch(type){
            case "linear":{
                const { x0, x1, y0, y1 } = props;
                gradient = this.napiContext.createLinearGradient(x0, x1, y0, y1);
                break;
            }
            case "radial":{
                const { x0, x1, r0, y0, y1, r1 } = props;
                gradient = this.napiContext.createRadialGradient(x0, x1, r0, y0, y1, r1);
                break;
            }
            case "conic":{
                const { startAngle, x, y } = props;
                gradient = this.napiContext.createConicGradient(startAngle, x, y);
                break;
            }
        }
        if (colorStop) for(const key in colorStop){
            const pos = Number.parseFloat(key);
            if (Number.isNaN(pos)) continue;
            gradient.addColorStop(pos, colorStop[key]);
        }
        return gradient;
    };

    public createPattern;
    public drawImage(image: Image, props: DrawImageProps){
        const { dx, dy, dimensions, sub, roundRadius } = props;

        if (roundRadius) this.save();

        if (dimensions && sub){
            const { width, heigth } = dimensions;
            const { sx, sy, sWidth: sw, sHeigth: sh } = sub;

            if (roundRadius){
                this.roundRect(dx, dy, width, heigth, roundRadius);
                this.clip();
            }

            this.napiContext.drawImage(image, sx, sy, sw, sh, dx, dy, width, heigth);
            return;
        }
        if (dimensions){
            const { width, heigth } = dimensions;

            if (roundRadius){
                this.roundRect(dx, dy, width, heigth, roundRadius);
                this.clip();
            }

            this.napiContext.drawImage(image, dx, dy, width, heigth);
            return;
        }

        if (roundRadius){
            this.roundRect(dx, dy, image.width, image.height, roundRadius);
            this.clip();
        }

        this.napiContext.drawImage(image, dx, dy);
        if (roundRadius) this.restore();
        return;
    }
}