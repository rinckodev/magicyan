import { ApplicationCommandType, Client } from "discord.js";
import { initDiscordEvents } from "../src/index";

console.log("test");

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


client.on("guildMemberConnect", (member, channel, _old) => {
    console.log(member.displayName, "entrou em", channel.name);
});
client.on("guildMemberDisconnect", (member, channel, _newc) => {
    console.log(member.displayName, "saiu de", channel.name);
});
client.on("guildMemberMoved", (member, executor, oldC, newC) => {
    console.log(member.displayName, "foi movido por", executor.displayName, "de", oldC.name, "para", newC.name);
});

// client.on("interactionCreate", async (i) => {
//     if (!i.isCommand()) return;
//     await i.reply({ ephemeral: true, fetchReply: true, content: "opa" });
//     i.editReply({ content: "Mudou" });
//     // i.followUp({ ephemeral: true, content: "Olá" });
// });

// client.on("guildMemberTimeoutAdd", (member, executor, expireAt, reason) => {
//     console.log(member.displayName);
//     console.log(executor.displayName);
//     console.log(expireAt);
//     console.log(reason);
// });

// client.on("guildMemberTimeoutRemove", (member, executor) => {
//     console.log(member.displayName);
//     console.log(executor.displayName);
// });

client.login(process.env.BOT_TOKEN);

process.on("SIGINT", () => process.exit(0));


// interface Evnt<Key extends keyof ClientEvents>{
//     name: Key,
//     run(...args: ClientEvents[Key]): void
// }

// function E<Key extends keyof ClientEvents>(data: Evnt<Key>){
//     data;
// }

// E;