<div align="center">
  <img src="../../assets/images/icon.png" alt="Icon" width="100" height="100">
  <div style="margin-left: 20px;">

  # Magicyan Minecraft
  
  </div>
</div>

Install with
```bash
npm install @magicyan/minecraft
pnpm install @magicyan/minecraft
yarn add @magicyan/minecraft
bun install @magicyan/minecraft
```

# Sumary
- [Skins](#skins)
- [Server](#server)
- [Mojang](#mojang)
- [Mush](#mush)

# Skins

This package is a Starlight Skin API wrapper

Oficial Starlight Skin API Documentation : https://docs.lunareclipse.studio/

## Features

- 📋 Fetch player skin information (UUID, skin URL, cape URL, etc.)
- 🎨 Generate customizable 3D renders of player skins
- 🚶 Multiple rendering poses and styles (default, walking, crouching, etc.)
- 📷 Customize camera angle, lighting, and model options
- ✂️ Various cropping options (full, bust, face, head)
- 👤 Support for slim and wide player models
- 🧣 Cape rendering support

## Quick Start

```ts
import { fetchSkinRender, fetchSkinInfo } from "@magicyan/minecraft";

// Fetch skin information for a player
const skinInfo = await fetchSkinInfo("Notch");
console.log(skinInfo);

// Generate a render URL
const result = await fetchSkinRender("Notch", "isometric", "full");
console.log(result.url); // URL to the rendered image
```

## Basic Usage

### Fetching Skin Info

```ts
import { fetchSkinInfo } from "@magicyan/minecraft";

async function getSkinInfo() {
  // You can use either a Minecraft username or UUID
  const result = await fetchSkinInfo("Notch");
  
  if (result.success) {
    console.log("Player UUID:", result.playerUUID);
    console.log("Skin URL:", result.skinUrl);
    console.log("Cape URL:", result.userCape);
    console.log("Skin Type:", result.skinType); // "slim" or "wide"
  } else {
    console.error("Error:", result.error);
  }
}
```

### Fetching Rendered Images

```ts
import { fetchSkinRender } from "@magicyan/minecraft";
import fs from "node:fs";

async function saveSkinRender() {
  const result = await fetchSkinRender("Notch", "default", "full");
  
  if (result.success) {
    // Save the image to a file
    fs.writeFileSync("skin-render.png", result.buffer);
    console.log("Saved render to skin-render.png");
  } else {
    console.error("Error:", result.error);
  }
}
```

## Available Render Types

The library supports numerous render types, including:

- `default`: Standard standing pose
- `walking`: Walking pose
- `crouching`: Sneaking pose
- `isometric`: Isometric view of the player
- `head`: Close-up of the player"s head
- `sleeping`: Player lying down
- `dungeons`: Minecraft Dungeons style pose
- `ultimate`: Dramatic hero pose
- And many more!

Check the `SkinRenderType` type for all available options.

## Crop Options

Each render type supports specific crop options:

- `full`: Full body render
- `bust`: Upper body
- `face`: Face only
- `head`: Head only (available for some render types)
- Special options for `skin` render type:
  - `default`: Original skin texture
  - `processed`: Processed skin texture
  - `barebones`: Basic skin texture

## Customization Options

### Camera Options

```ts
const options = {
  camera: {
    cameraPosition: { x: "15", y: "20", z: "-30" }, // Camera position coordinates
    cameraFocalPoint: { x: "0", y: "18", z: "0" },  // Camera focus point
    cameraWidth: 1200,                               // Image width
    cameraHeight: 1200,                              // Image height
    renderScale: 1.5,                                // Scale of the render
    cameraFOV: 45,                                   // Field of view
    isometric: false,                                // Orthographic camera
    dropShadow: true                                 // Enable drop shadow
  }
};
```

### Lighting Options

```ts
const options = {
  lighting: {
    dirLightPos: { x: "-10", y: "10", z: "-10" },   // Direction light position
    dirLightColor: "ffffff",                         // Directional light color (hex)
    dirLightIntensity: 1,                           // Directional light intensity
    globalLightColor: "ffffff",                      // Global light color (hex)
    globalLightIntensity: 0.5                       // Global light intensity
  }
};
```

### Model Options

```ts
const options = {
  model: {
    skinUrl: "https://example.com/custom-skin.png", // Custom skin URL
    skinType: "slim",                                // "slim" or "wide"
    capeTexture: "https://example.com/cape.png",     // Custom cape texture
    capeEnabled: true,                              // Enable/disable cape
    playerModelShading: true                         // Enable shading on player model
  }
};
```

## Examples

### Different Render Types

```ts
// Default pose
const defaultResult = await fetchSkinRender("RinckoZ_", "default", "full");

// Walking pose
const walkingResult = await fetchSkinRender("RinckoZ_", "walking", "full");

// Isometric view
const isometricResult = await fetchSkinRender("RinckoZ_", "isometric", "full");

// Profile view (good for thumbnails)
const profileResult = await fetchSkinRender("RinckoZ_", "profile", "face");
```

### Custom Lighting

```ts
const dramaticLightResult = await fetchSkinRender("RinckoZ_", "default", "full", {
  lighting: {
    dirLightPos: { x: "10", y: "10", z: "-5" },
    dirLightColor: "ff9900",  // Orange light
    dirLightIntensity: 1.5,
    globalLightColor: "0066ff",  // Blue ambient light
    globalLightIntensity: 0.7
  }
});
```

# Server

A JavaScript/TypeScript library for interacting with Minecraft server information using the mcsrvstat API.

This library provides a simple interface to query Minecraft server status, retrieve server icons, and other relevant information. It's ideal for applications that need to check or display Minecraft server data in real-time.

This library uses the [mcsrvstat.us](https://mcsrvstat.us/) service for server status information.

## Features

- 📊 **Server Status Check**: Query detailed information about any Minecraft server
- 🎮 **Java & Bedrock Support**: Compatible with both Java and Bedrock edition servers
- 🖼️ **Server Icon Retrieval**: Fetch server icons as Buffer or URL
- ✅ **Online Status Verification**: Simple method to check if a server is online

## Usage

### Fetching Server Status

```ts
import { fetchServerStatus } from "@magicyan/minecraft";

// For Java Edition servers
async function checkServer() {
  const serverInfo = await fetchServerStatus("hypixel.net");
  
  if (serverInfo.online) {
    console.log(`Server is online with ${serverInfo.players.online}/${serverInfo.players.max} players`);
    console.log(`Running version: ${serverInfo.version}`);
  } else {
    console.log("Server is offline");
  }
}

// For Bedrock Edition servers
async function checkBedrockServer() {
  const serverInfo = await fetchServerStatus("play.nethergames.org", true);
  // Process the result
}
```

### Checking if Server is Online

```ts
import { isServerOnline } from "@magicyan/minecraft";

async function quickCheck() {
  const online = await isServerOnline("hypixel.net");
  console.log(online ? "Server is online!" : "Server is offline");
  
  // For Bedrock servers
  const bedrockOnline = await isServerOnline("play.nethergames.org", true);
}
```

### Fetching Server Icon

```ts
import { fetchServerIcon } from "@magicyan/minecraft";

async function getServerIcon() {
  const result = await fetchServerIcon("hypixel.net");
  
  if (result.success) {
    // Access the icon as a Buffer
    const iconBuffer = result.data.buffer;
    
    // Or use the direct URL
    const iconUrl = result.data.url;
    
    // Save to file, display in UI, etc.
  } else {
    console.error(`Failed to fetch icon: ${result.error}`);
  }
}
```

# Mojang

Retrieving Minecraft player profiles, sessions, and related information using Mojang's API services.

This library provides functions to access Minecraft player data, including basic profile information, session details, skins, and capes. It's designed for applications that need to access or display Minecraft player information in a simple, type-safe way.

## Features

- 👤 **Profile Lookup**: Get basic profile information by player name
- 🎭 **Session Details**: Retrieve extended profile data including sessions
- 🖼️ **Skin & Cape Access**: Get URLs for player skins and capes
- ⚙️ **TypeScript Support**: Fully typed responses for better development experience

## Usage

### Fetching a Player Profile

```ts
import { fetchMinecraftProfile } from "@magicyan/minecraft";

async function getPlayerProfile() {
  const result = await fetchMinecraftProfile("RinckoZ_");
  
  if (result.success) {
    const profile = result.data;
    console.log(`Player UUID: ${profile.id}`);
    console.log(`Player Name: ${profile.name}`);
    console.log(`Legacy Account: ${profile.legacy ? "Yes" : "No"}`);
    console.log(`Demo Account: ${profile.demo ? "Yes" : "No"}`);
  } else {
    console.error(`Failed to fetch profile: ${result.error}`);
  }
}
```

### Fetching Session Details (Skins & Capes)

```ts
import { fetchMinecraftProfileSession } from "@magicyan/minecraft";

async function getPlayerSession() {
  // First get the player UUID (or use it directly if you have it)
  const profileResult = await fetchMinecraftProfile("RinckoZ_");
  
  if (!profileResult.success) {
    console.error("Could not find player");
    return;
  }
  
  const uuid = profileResult.data.id;
  const sessionResult = await fetchMinecraftProfileSession(uuid);
  
  if (sessionResult.success) {
    const session = sessionResult.data;
    
    // Access skin URL
    const skinUrl = session.properties[0]?.textures.SKIN?.url;
    console.log(`Skin URL: ${skinUrl}`);
    
    // Check if player has a slim skin model
    const hasSlimModel = !!session.properties[0]?.textures.SKIN?.metadata?.model;
    console.log(`Slim skin model: ${hasSlimModel ? 'Yes' : 'No'}`);
    
    // Access cape URL if available
    const capeUrl = session.properties[0]?.textures.CAPE?.url;
    if (capeUrl) {
      console.log(`Cape URL: ${capeUrl}`);
    } else {
      console.log('Player does not have a cape');
    }
  } else {
    console.error(`Failed to fetch session: ${sessionResult.error}`);
  }
}
```

# Mush

Interacting with the Mush API to retrieve player statistics and leaderboard data for various Minecraft mini-games.

This library provides a set of functions to access player information, statistics, and leaderboards for the Mush Minecraft server. It supports various mini-games including BedWars, SkyWars, PvP, Murder, and more. The library is fully typed for a better development experience.

## Features

- 🎮 **Player Information**: Fetch detailed player profiles including account details and statistics
- 📊 **Game Statistics**: Access comprehensive stats for multiple mini-games
- 🏆 **Leaderboards**: Retrieve ranked leaderboards for all supported games
- 👤 **Player Status**: Check if players are currently online
- 🎖️ **Medals & Tags**: View player medals, tags, and ranks
- ⚙️ **TypeScript Support**: Fully typed responses for better development experience

## Usage

### Fetching Player Information

```ts
import { fetchMushPlayerInfo } from "@magicyan/minecraft";

async function getPlayerInfo() {
  // Can use either player name or UUID
  const result = await fetchMushPlayerInfo("RinckoZ_");
  
  if (result.success) {
    const player = result.data;
    
    // Basic player information
    console.log(`Username: ${player.account.username}`);
    console.log(`UUID: ${player.account.uniqueId}`);
    console.log(`Online Status: ${player.connected ? 'Online' : 'Offline'}`);
    console.log(`First Login: ${new Date(player.firstLogin).toLocaleDateString()}`);
    console.log(`Last Login: ${new Date(player.lastLogin).toLocaleDateString()}`);
    
    // Player rank and tags
    console.log(`Rank: ${player.rankTag.name} (${player.rankTag.color})`);
    console.log(`Best Tag: ${player.bestTag.name} (${player.bestTag.color})`);
    console.log(`Profile Tag: ${player.profileTag.name} (${player.profileTag.color})`);
    
    // Accessing game stats (example for BedWars)
    const bedwarsStats = player.stats.bedwars;
    console.log(`BedWars Kills: ${bedwarsStats.kills}`);
    console.log(`BedWars Wins: ${bedwarsStats.wins}`);
    console.log(`BedWars KDR: ${bedwarsStats.fkdr}`);
  } else {
    console.error(`Failed to fetch player: ${result.error}`);
  }
}
```

### Fetching Game Leaderboards

```ts
import { fetchMushLeaderboard } from "@magicyan/minecraft";

async function getLeaderboard() {
  // Available games: "bedwars", "skywars", "pvp", "party", "hg", "murder", "quickbuilders", "ctf"
  const result = await fetchMushLeaderboard("bedwars");

  if (result.success) {
    const leaderboard = result.data;

    // Display top 5 players
    console.log("=== Top 5 BedWars Players ===");
    leaderboard.slice(0, 5).forEach((player, index) => {
      console.log(`#${index + 1}: ${player.account.username} - Kills: ${player.get("kills")}, Wins: ${player.get("wins")}`);
    });
  } else {
    console.error(`Failed to fetch leaderboard: ${result.error}`);
  }
}
```