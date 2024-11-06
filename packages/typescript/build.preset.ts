import { definePreset } from "unbuild";

export default definePreset({
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
        output: {
            dir: "dist",
            format: "esm",
            preserveModules: true,
            preserveModulesRoot: "./src"
        }
    }
});