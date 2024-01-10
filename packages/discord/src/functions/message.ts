import { equalsIgnoreCase, includesIgnoreCase } from "@magicyan/core";
import type { GuildTextBasedChannel, Message } from "discord.js";

type FindMessageFilter = (role: Message<true>) => boolean;

export function findMessage(channel: GuildTextBasedChannel){
    const messages = channel.messages.cache;
    return {
        byId(id: string){
            return messages.get(id);
        },
        byContent(){
            return {
                equals(content: string, ignoreCase: boolean = false){
                    return ignoreCase 
                    ? messages.find(m => m.content === content)
                    : messages.find(m => equalsIgnoreCase(m.content, content))
                },
                include(content: string, ignoreCase: boolean = false){
                    return ignoreCase 
                    ? messages.find(m => m.content.includes(content))
                    : messages.find(m => includesIgnoreCase(m.content, content))
                }
            }
        },
        byFilter(filter: FindMessageFilter){
            return messages.find(filter);
        }
    }   
}