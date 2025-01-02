import { canvasFilter, CanvasContextFilters } from "../types/CanvasFilter";
import { CanvasContext } from "./CanvasContext";

type CanvasFilterKeys = keyof typeof canvasFilter
export class CanvasContextFilter {
    private currentFilter: CanvasContextFilters[] = ["none"];
    public get current(){
        return this.currentFilter;
    }
    constructor(private readonly context: CanvasContext){}
    public set(...filters: CanvasContextFilters[]): void{
        this.currentFilter = filters;
        this.context.applyFilters();
    }
    public add(...filters: CanvasContextFilters[]): void{
        this.currentFilter.push(...filters);
        this.context.applyFilters();
    }
    public remove(...filters: CanvasFilterKeys[]): void {
        for(const filterKey of filters){
            const filter = canvasFilter[filterKey];
            this.currentFilter = this.currentFilter.filter(f => !f.startsWith(filter));
        }
        this.context.applyFilters();
    }
    public clear(){
        this.currentFilter = ["none"];
        this.context.applyFilters();
    }
}