
import { ApplicationCommandType, AuditLogEvent, Client, ClientEvents, Partials, time } from "discord.js";
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

initDiscordEvents(client)

// client.on("guildMemberVoiceChannelMove", (member, newChannel, mover, oldChannel) => {
//     console.log(
//         member.displayName, 
//         "foi movido de", oldChannel.name, 
//         "por", mover.displayName, 
//         "para", newChannel.name
//     )
// })

client.on("ready", (readyClient) => {
    console.log("Bot online");

    // readyClient.application.commands.set([
    //     {
    //         name: "pop",
    //         description: "pop command",
    //         type: ApplicationCommandType.ChatInput,
    //     },
    // ])
})

client.login(process.env.BOT_TOKEN);


interface Evnt<Key extends keyof ClientEvents>{
    name: Key,
    run(...args: ClientEvents[Key]): void
}

function E<Key extends keyof ClientEvents>(data: Evnt<Key>){

}

E({
    name: "userBanAdd",
    run(user, executor, reason) {
        
    },
})