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

// client.on("extendedRoleCreate", (role, executor) => {
//     console.log(role);
//     console.log(executor.displayName);
// });

client.on("ready", () => {
    console.log("Bot online");
});

client.on("messageCreate", a => {
    const g = a.guild?.members.fetch("test");
    console.log(g);
});

client.login(process.env.BOT_TOKEN);

process.on("SIGINT", () => process.exit(0));


interface Evnt<Key extends keyof ClientEvents>{
    name: Key,
    run(...args: ClientEvents[Key]): void
}

function E<Key extends keyof ClientEvents>(data: Evnt<Key>){
    data;
}

E;