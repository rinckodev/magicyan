import { Canvas, createCanvas, type Image } from "@napi-rs/canvas";

export function createAvatar(image: Image): Canvas;
export function createAvatar(image: Image, radius: number): Canvas;
export function createAvatar(image: Image, radius: [number, number]): Canvas;
export function createAvatar(image: Image, radius: [number, number, number, number]): Canvas;
export function createAvatar(
    image: Image,
    radius?: number | [number, number] | [number, number, number, number]
): Canvas {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    let topLeft: number, topRight: number, bottomRight: number, bottomLeft: number;

    if (radius === undefined) {
        const r = Math.min(image.width, image.height) / 2;
        topLeft = topRight = bottomRight = bottomLeft = r;
    } else if (typeof radius === "number") {
        topLeft = topRight = bottomRight = bottomLeft = radius;
    } else if (Array.isArray(radius) && radius.length === 2) {
        [topLeft, bottomRight] = radius;
        topRight = topLeft;
        bottomLeft = bottomRight;
    } else if (Array.isArray(radius) && radius.length === 4) {
        [topLeft, topRight, bottomRight, bottomLeft] = radius;
    } else {
        topLeft = topRight = bottomRight = bottomLeft = 0;
    }

    ctx.beginPath();
    ctx.moveTo(topLeft, 0);
    ctx.lineTo(image.width - topRight, 0);
    ctx.quadraticCurveTo(image.width, 0, image.width, topRight);
    ctx.lineTo(image.width, image.height - bottomRight);
    ctx.quadraticCurveTo(image.width, image.height, image.width - bottomRight, image.height);
    ctx.lineTo(bottomLeft, image.height);
    ctx.quadraticCurveTo(0, image.height, 0, image.height - bottomLeft);
    ctx.lineTo(0, topLeft);
    ctx.quadraticCurveTo(0, 0, topLeft, 0);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(image, 0, 0, image.width, image.height);
    return canvas;
}
