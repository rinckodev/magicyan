import { definePreset } from "unbuild";

export default definePreset({
	clean: true,
	declaration: true,
	sourcemap: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
		esbuild: {
			minify: true,
		},
	},
});