import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "@magicyan/typescript/build.preset",
    entries: ["src/index"],
});