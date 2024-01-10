import { ApplicationCommandType, AuditLogEvent, Client, ClientEvents, Partials } from "discord.js";
import "dotenv/config";
import { discordEvents } from "../src"

const client = new Client({
    intents: [
        "GuildVoiceStates", "GuildMembers", "Guilds", 
        "MessageContent", "GuildMessages",
        "GuildPresences", "GuildModeration",
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User]
});

discordEvents({ client, events: {
    webhookMessageCreate: true,
    guildMemberVoiceChannelMove: true,
    guildMemberVoiceChannelJoin: true,
    guildMemberVoiceChannelLeave: true,
}})

client.on("guildMemberVoiceChannelMove", (member, newChannel, mover, oldChannel) => {
    console.log(
        member.displayName, 
        "foi movido de", oldChannel.name, 
        "por", mover.displayName, 
        "para", newChannel.name
    )
})

client.on("ready", (readyClient) => {
    console.log("Bot online");

    readyClient.application.commands.set([
        {
            name: "pop",
            description: "pop command",
            type: ApplicationCommandType.ChatInput,
        },
    ])
})

client.login(process.env.BOT_TOKEN);

client.on("interactionCreate", async interaction => {
    if (interaction.isButton()){

        return;
    }
    if (!interaction.isChatInputCommand()) return;
    switch(interaction.commandName){
        case "pop":{
            
        }
    }
})

interface Evnt<Key extends keyof ClientEvents>{
    name: Key,
    run(...args: ClientEvents[Key]): void
}

function E<Key extends keyof ClientEvents>(data: Evnt<Key>){

}

E({
    name: "guildMemberVoiceChannelMove",
    run(member, newChannel, mover, oldChannel) {
        
    },
})