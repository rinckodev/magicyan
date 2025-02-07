import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "@magicyan/config/build.preset",
    entries: ["src/index"],
});