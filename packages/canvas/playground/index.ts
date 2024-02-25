import { Canvas } from "../src";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.style.set("fill", "darkgray");
context.fillRect(0, 0, canvas.width, canvas.height);

const mini = new Canvas(60, 60);
const miniContext = mini.getContext();

miniContext.style.set("fill", "gold");
miniContext.fillRect(0, 0, canvas.width, canvas.height);

canvas.writeFile("./playground/image.png", "png");