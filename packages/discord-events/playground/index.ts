import { initDiscordEvents } from "#package";
import { Client, IntentsBitField, GatewayIntentBits, Events } from "discord.js";

const client = new Client({
    intents: Object.values(IntentsBitField.Flags).map(f => f) as GatewayIntentBits[],
});

initDiscordEvents(client);

client.login(process.env.BOT_TOKEN);

client.on("ready", (client) => {
    console.log(client.user.username, "Bot is ready");
});


client.on("extendedRoleDelete", (role, executor) => {
    console.log("Role Deleted", role.name, executor.user.username);
});

client.on("guildMemberMoved", (member, executor, oldc, newc) => {
    console.log(member.displayName)
    console.log(executor.displayName)
    console.log(oldc.name)
    console.log(newc.name)
})

// client.on(Events.GuildAuditLogEntryCreate, entry => {
//     console.log(entry);
// })