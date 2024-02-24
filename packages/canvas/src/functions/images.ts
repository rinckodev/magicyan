import { loadImage as napiLoadImage } from "@napi-rs/canvas";

export const loadImage = napiLoadImage;
export type LoadImageFunction = typeof loadImage;
