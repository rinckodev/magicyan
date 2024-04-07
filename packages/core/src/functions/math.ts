export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export const random = {
    int(min: number, max: number){
        return Math.floor(this.float(min, max + 1));
    },
    float(min: number, max: number){
        return Math.random() * (max - min) + min;
    }
};

export function parseIntOrDefault(value: string, defaultValue: number, radix?: number){
    const parsed = Number.parseInt(value, radix);
    return Number.isNaN(parsed) ? defaultValue : parsed;
}

export function parseFloatOrDefault(value: string, defaultValue: number){
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
}