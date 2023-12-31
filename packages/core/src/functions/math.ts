export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const random = {
    float(min: number, max: number){
        return (Math.random() * (max - min) + min)
    },
    int(min: number, max: number){
        return Math.floor(this.float(min, max));
    }
}