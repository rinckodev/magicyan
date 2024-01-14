# Magicyan Discord Events

Install with
```bash
npm install @magicyan/discord-events
```

This lib adds more discord.js specific events

## Setup
Create your bot client normally and pass it to the initDiscordEvents function, so that events can be registered

```ts
import { Client } from "discord.js";
import { initDiscordEvents } from "@magicyan/discord-events";

const client = new Client({
    intents: [/* add your intents ... */]
    // set your client options ...
});

initDiscordEvents(client);
```

## How to use
You can create a listener for the event in the same way you create it for standard discord.js events

```ts
client.on("guildMemberConnect", (member, channel) => {
    console.log(member.displayName, "joined the" channel.name);
})
```

See below the list of all events

| Event | Parameters | Description |
| ----- | --------- |------------ |
| webhookMessageCreate | `message`, `webhook` | Triggered when a webhook message is created. | 
| guildMemberConnect | `member`, `voiceChannel` | Triggered when a member connect to voice channel in a guild. |
| guildMemberDisconnect | `member`, `voiceChannel`  | Triggered when a member disconnect from voice channel in a guild. |
| guildMemberMoved | `member`, `executor`, `oldVoiceChannel`, `newVoiceChannel` | Triggered when a member is moved from one voice channel to another. |
| guildMemberTimeoutAdd | `member`, `executor`, `expireAt`, `reason` | Triggered when a member gets a timeout |
| guildMemberTimeoutAdd | `member`, `executor` | Triggered when a member has a timeout removed |
| userKick | `user`, `executor`, `reason`, `guild` | Triggered when a user is kicked from the guild |
| userBanAdd | `user`, `executor`, `reason`, `guild` | Triggered when a user is banned from the guild |
| userBanRemove | `user`, `executor`, `reason`, `guild` | Triggered when a user's ban is removed |