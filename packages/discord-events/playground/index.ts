import { initDiscordEvents } from "#package";
import { Client, IntentsBitField, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: Object.values(IntentsBitField.Flags).map(f => f) as GatewayIntentBits[]
});

initDiscordEvents(client);

client.login(process.env.BOT_TOKEN);

client.on("ready", (client) => {
    console.log(client.user.username, "Bot is ready");
});


client.on("extendedRoleDelete", (role, executor) => {
    console.log("Role Deleted", role.name, executor.user.username);
});