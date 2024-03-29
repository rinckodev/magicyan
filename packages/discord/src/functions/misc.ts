import { DefaultWebSocketManagerOptions } from "discord.js";

export function setMobileStatus(){
    (DefaultWebSocketManagerOptions.identifyProperties.browser as string) = "Discord Android";
}