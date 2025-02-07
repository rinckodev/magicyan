import { GlobalFonts as NapiGlobalFonts } from "@napi-rs/canvas";

interface FontStyle {
    weight: number;
    width: string;
    style: string;
}

interface FontFamily {
    family: string;
    styles: FontStyle[];
}

declare interface NapiGlobalFontsInterface  {
    register(font: Buffer, nameAlias?: string | undefined): boolean;
    registerFromPath(path: string, nameAlias?: string | undefined): boolean;
    loadFontsFromDir(path: string): number;
    getFamilies(): Buffer[];
    loadSystemFonts: string;
    setAlias(fontName: string, nameAlias: string): void
}

const fixedNapiGlobalFonts = NapiGlobalFonts as unknown as NapiGlobalFontsInterface;

interface CanvasGlobalFonts {
    has(name: string): boolean;
    getFamilies(): FontFamily[]
    loadFontsFromDir(path: string): number
    registerFromPath(path: string, nameAlias?: string | undefined): boolean;
    register(font: Buffer, nameAlias?: string | undefined): boolean;
    setAlias(fontName: string, nameAlias: string): void
}

export const GlobalFonts: CanvasGlobalFonts = {
    getFamilies(){
        const fonts = fixedNapiGlobalFonts.getFamilies().toString();
        return JSON.parse(fonts);
    },
    has(name){
        return !!this.getFamilies().find(({ family }) => family === name);
    },
    loadFontsFromDir(path) {
        return fixedNapiGlobalFonts.loadFontsFromDir(path);
    },
    register(font, nameAlias) {
        return fixedNapiGlobalFonts.register(font, nameAlias);
    },
    registerFromPath(path, nameAlias) {
        return fixedNapiGlobalFonts.registerFromPath(path, nameAlias);
    },
    setAlias(fontName, nameAlias) {
        return fixedNapiGlobalFonts.setAlias(fontName, nameAlias);
    },
};
