import { Client } from "discord.js";

const client = new Client({
    intents: ["Guilds"]
});

client.login(process.env.BOT_TOKEN);

client.on("ready", () => console.log("ready"));

process.on("SIGINT", () => process.exit(0));