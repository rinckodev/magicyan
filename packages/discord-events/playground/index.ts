import { ApplicationCommandType, Client, ClientEvents } from "discord.js";
import { initDiscordEvents } from "../src/index";

const client = new Client({
    intents: 53608447,
});

initDiscordEvents(client);
client.on("ready", () => {
    console.log("Bot online");
    client.guilds.cache.get(process.env.MAIN_GUILD_ID!)!.commands.set([
        {
            name: "test",
            description: "test",
            type: ApplicationCommandType.ChatInput,
        }
    ]);
});

client.on("interactionCreate", async (i) => {
    if (!i.isCommand()) return;
    await i.reply({ ephemeral: true, fetchReply: true, content: "opa" });
    i.editReply({ content: "Mudou" });
    // i.followUp({ ephemeral: true, content: "Olá" });
});

client.on("guildMemberTimeoutAdd", (member, executor, expireAt, reason) => {
    console.log(member.displayName);
    console.log(executor.displayName);
    console.log(expireAt);
    console.log(reason);
});

client.on("guildMemberTimeoutRemove", (member, executor) => {
    console.log(member.displayName);
    console.log(executor.displayName);
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