import { definePreset } from "unbuild";

export default definePreset({
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
        output: {
            preserveModules: true,
            preserveModulesRoot: "./src"
        }
    }
});