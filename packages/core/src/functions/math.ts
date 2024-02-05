export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const random = {
    float(min: number, max: number){
        return Math.random() * (max - min) + min
    },
    int(min: number, max: number){
        return Math.floor(this.float(min, max + 1));
    }
}

export function parseIntOr(value: string, orValue: number, radix?: number){
    const parsed = Number.parseInt(value, radix);
    return Number.isNaN(parsed) ? orValue : parsed;
}

export function parseFloatOr(value: string, orValue: number){
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? orValue : parsed;
}