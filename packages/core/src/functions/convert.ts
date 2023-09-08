type Color = `#${string}` | string;

export function hexToRgb(color: Color){
    if (color.startsWith("#")){
        return parseInt(color.slice(1), 16);
    } 
    return parseInt(color, 16);
}