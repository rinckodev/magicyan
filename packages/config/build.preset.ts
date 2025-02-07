import { definePreset } from "unbuild";

export default definePreset({
    clean: true,
    declaration: true,
    rollup: {
        inlineDependencies: true,
        emitCJS: true,
        output: {
            preserveModules: true,
            preserveModulesRoot: "./src"
        }
    }
});