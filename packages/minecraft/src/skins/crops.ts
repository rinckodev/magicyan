export type SkinRenderCrop =
    | "full"
    | "bust"
    | "face"
    | "head"
    | "processed"
    | "barebones";

export const skinRenderTypeCrops = {
    default: ["full", "bust", "face"],
    marching: ["full", "bust", "face"],
    walking: ["full", "bust", "face"],
    crouching: ["full", "bust", "face"],
    crossed: ["full", "bust", "face"],
    criss_cross: ["full", "bust", "face"],
    ultimate: ["full", "bust", "face"],
    isometric: ["full", "bust", "face", "head"],
    head: ["full"],
    custom: ["full", "bust", "face"],
    cheering: ["full", "bust", "face"],
    relaxing: ["full", "bust", "face"],
    trudging: ["full", "bust", "face"],
    cowering: ["full", "bust", "face"],
    pointing: ["full", "bust", "face"],
    lunging: ["full", "bust", "face"],
    dungeons: ["full", "bust", "face"],
    facepalm: ["full", "bust", "face"],
    sleeping: ["full", "bust"],
    dead: ["full", "bust", "face"],
    archer: ["full", "bust", "face"],
    kicking: ["full", "bust", "face"],
    mojavatar: ["full", "bust"],
    reading: ["full", "bust", "face"],
    high_ground: ["full", "bust", "face"],
    clown: ["full", "bust", "face"],
    bitzel: ["full", "bust", "face"],
    pixel: ["full", "bust", "face"],
    ornament: ["full"],
    skin: ["default", "processed", "barebones"],
    profile: ["full", "bust", "face"]
} as const;

type SkinRenderTypeCrops = typeof skinRenderTypeCrops

export type SkinRenderTypeCrop = {
    -readonly [K in keyof SkinRenderTypeCrops]: SkinRenderTypeCrops[K][number]
}