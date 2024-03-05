import { equalsIgnoreCase, includesIgnoreCase } from "@magicyan/core";
import type { GuildTextBasedChannel, Message } from "discord.js";

type FindMessageFilter = (role: Message<true>) => boolean;

export function findMessage(channel: GuildTextBasedChannel){
    const messages = channel.messages.cache;
    return {
        async all(limit: number = Infinity){
            const messages: Message[] = [];
            let lastMessageId: string | undefined;
        
            while(true){
                const fetched = await channel.messages.fetch({ limit: 100, before: lastMessageId });
                
                messages.push(...fetched.values());
                lastMessageId = fetched.lastKey();
                if (fetched.size < 100 || messages.length >= limit) break;
            }
        
            if (limit < messages.length) {
                const sliced = messages.slice(0, limit);
                messages.length = 0;
                messages.push(...sliced);
            }
            return messages;
        },
        byId(id: string){
            return messages.get(id);
        },
        byContent(){
            return {
                equals(content: string, ignoreCase: boolean = false){
                    return ignoreCase 
                    ? messages.find(m => m.content === content)
                    : messages.find(m => equalsIgnoreCase(m.content, content));
                },
                include(content: string, ignoreCase: boolean = false){
                    return ignoreCase 
                    ? messages.find(m => m.content.includes(content))
                    : messages.find(m => includesIgnoreCase(m.content, content));
                }
            };
        },
        byFilter(filter: FindMessageFilter){
            return messages.find(filter);
        }
    };   
}