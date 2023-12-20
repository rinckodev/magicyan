export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const random = {
    float(min: number, max: number){
        return (Math.random() * (max - min) + min)
    },
    int(min: number, max: number){
        return Math.floor(this.float(min, max));
    },
    letter(){
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const letters = upper + lower;
        const index = this.int(0, letters.length);
        return letters.charAt(index);
    },
    text(length: number){
        let result = "";
        for (let i = 0; i < length; i++) {
            result += this.letter();
        }
        return result;
    }
}