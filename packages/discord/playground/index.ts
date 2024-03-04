import { createEmbed } from "../src";

const embed = createEmbed({
    description: "test",
    fields: [
        { name: "2", value: "b", inline: true },
        { name: "3", value: "b", inline: true },
        {},
        { name: "2", value: "b", inline: true },
        { name: "3", value: "b", inline: true },
        {},
        { name: "2", value: "b", inline: true },
        { name: "3", value: "b", inline: true },
        {},
    ]
});

console.log(embed.toString());