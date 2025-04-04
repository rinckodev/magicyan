<div align="center">
  <img src="../../assets/images/icon.png" alt="Icon" width="100" height="100">
  <div style="margin-left: 20px;">

  # Magicyan Discord Events
  
  </div>
</div>

Install with
```bash
npm install @magicyan/discord-events
pnpm install @magicyan/discord-events
yarn add @magicyan/discord-events
bun install @magicyan/discord-events
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
| webhookMessageCreate | `message`, `webhook` | Emitted when a webhook message is created. | 
| guildMemberConnect | `member`, `voiceChannel` | Emitted when a member connect to voice channel in a guild. |
| guildMemberDisconnect | `member`, `voiceChannel`  | Emitted when a member disconnect from voice channel in a guild. |
| guildMemberMoved | `member`, `executor`, `oldVoiceChannel`, `newVoiceChannel` | Emitted when a member is moved from one voice channel to another. |
| guildMemberTimeoutAdd | `member`, `executor`, `expireAt`, `reason` | Emitted when a member gets a timeout |
| guildMemberTimeoutAdd | `member`, `executor` | Emitted when a member has a timeout removed |
| userKick | `user`, `executor`, `reason`, `guild` | Emitted when a user is kicked from the guild |
| userBanAdd | `user`, `executor`, `reason`, `guild` | Emitted when a user is banned from the guild |
| userBanRemove | `user`, `executor`, `reason`, `guild` | Emitted when a user's ban is removed |
| extendedRoleCreate | `role`, `executor` | Emitted when a role is created |
| extendedRoleUpdate | `role`, `changes`, `executor` | Emitted when a role is updated |
| extendedRoleDelete | `deletedRole`, `executor` | Emitted when a role is deleted |