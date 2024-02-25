import { Client, ClientEvents, Partials } from "discord.js";
import "dotenv/config";
import { initDiscordEvents } from "../src/index";

const client = new Client({
    intents: [
        "GuildVoiceStates", "GuildMembers", "Guilds", 
        "MessageContent", "GuildMessages",
        "GuildPresences", "GuildModeration",
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User]
});

initDiscordEvents(client);

client.on("extendedChannelDelete", (channel, executor) => {
    console.log(executor.displayName, channel);
});

client.on("ready", () => {
    console.log("Bot online");
});

client.on("webhookMessageCreate", (message, webhook) => {
    console.log(message.content);
    console.log(webhook.name);
});

client.login(process.env.BOT_TOKEN);

process.on("SIGINT", () => process.exit(0));


interface Evnt<Key extends keyof ClientEvents>{
    name: Key,
    run(...args: ClientEvents[Key]): void
}

function E<Key extends keyof ClientEvents>(data: Evnt<Key>){

}