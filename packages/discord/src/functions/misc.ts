import { DefaultWebSocketManagerOptions } from "discord.js";

export function setMobileStatus(){
    Object.assign(DefaultWebSocketManagerOptions.identifyProperties, {
        browser: "Discord Android"
    });
}