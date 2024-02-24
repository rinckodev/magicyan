<div align="center">
  <img src="../../assets/images/icon.png" alt="Icon" width="100" height="100">
  <div style="margin-left: 20px;">

  # Magicyan Canvas
  
  </div>
</div>

Install with
```bash
npm install @magicyan/canvas
pnpm install @magicyan/canvas
yarn add @magicyan/canvas
bun install @magicyan/canvas
```

- This lib is a wrapper of [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)
- It works the same as the original library, but including the features below

## Usage

```ts
import { Canvas } from "@magicyan/canvas";

async function main(){
    const canvas = new Canvas(1000, 1000);
    const context = canvas.getContext();

    context.style.set("fill", "#156490");
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.style.set("fill", "white");

    context.fillRect(175, 496, 650, 430, [0, 0, 32, 32]);
    
    context.beginPath();
    context.moveTo(175, 496);
    context.lineTo(499, 164);
    context.lineTo(824, 496);
    context.closePath();
    context.fill();

    context.style.set("stroke", "white");
    context.line.set({ width: 46, cap: "round" });

    context.beginPath();
    context.moveTo(70.5, 496);
    context.lineTo(499.5, 67);
    context.lineTo(928.5, 496);
    context.stroke();

    context.style.set("fill", "#156490");

    // door
    context.fillRect(303, 646, 160, 280, [32, 32, 0, 0]);

    // window
    context.fillRect(558, 646, 180, 140, 32);

    await canvas.writeFile("./house.png", "png");
    console.log("Done");
}
main();
```
Output:

<img src="assets/images/house.png" alt="Icon" width="200" height="200">

### Context Style
```ts
import { Canvas } from "@magicyan/canvas";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.style.set("fill", "greenyellow");
context.style.set("stroke", "#41b5cc");
context.style.setFill("#dc3d3d");
context.style.setStroke("blueviolet");

console.log(context.style.fill); // #dc3d3d
console.log(context.style.stroke); // blueviolet
```

### Context Filter
```ts
import { Canvas, blurFilter, filter, opacityFilter } from "@magicyan/canvas";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.filter.set(blurFilter(20), filter.sepia(40));
console.log(context.filter.current); // [ 'blur(20px)', 'sepia(40%)' ]

context.filter.add(opacityFilter(68));
console.log(context.filter.current); // [ 'blur(20px)', 'sepia(40%)', 'opacity(68%)' ]

context.filter.remove("Blur");
console.log(context.filter.current); // [ 'sepia(40%)', 'opacity(68%)' ]

context.filter.clear();
console.log(context.filter.current); // [ 'none' ]
```

### Context Line
```ts
import { Canvas } from "@magicyan/canvas";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.line.set({
    cap: "round",
    dash: [5, 15],
    join: "bevel",
    dashOffset: 4,
    width: 12
});

context.line.setCap("square");
context.line.setDash(5, 12, 8);
context.line.setDashOffset(2);
context.line.setJoin("round");
context.line.setWidth(8);

console.log(context.line.cap); // square
console.log(context.line.dash); // [ 5, 12, 8 ]
console.log(context.line.dashOffset); // 2
console.log(context.line.join); //  round
console.log(context.line.width); // 8
```

### Context Font
```ts
import { Canvas } from "@magicyan/canvas";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.font.set({
    size: 40,
    family: "Montserrat",
    style: "italic",
    weight: "semibold",
    baseline: "top",
    align: "start",
    kerning: "auto"
});

context.font.setSize(60);
context.font.setFamily("Poppins");
context.font.setStyle("italic underline");
context.font.setWeight("light");
context.font.setBaseline("bottom");
context.font.setAlign("right");
context.font.setKerning("none");

console.log(context.font.size); // 60
console.log(context.font.family); // Poppins
console.log(context.font.style); // italic underline
console.log(context.font.weight); // light
console.log(context.font.baseline); // bottom
console.log(context.font.align); // right
console.log(context.font.kerning); // none
```

### Context Gradient 
```ts
import { Canvas } from "@magicyan/canvas";

const canvas = new Canvas(600, 300);
const context = canvas.getContext();

context.style.set("fill", context.createGradient({
    type: "linear",
    x0: 0, y0: 0,
    x1: canvas.width, y1: canvas.height,
    colorStop: {
        0.1: "#40ade7",
        0.4: "#2858a1",
        0.9: "#351b6d"
    }
}));
```


