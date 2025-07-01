import { equalsIgnoreCase, includesIgnoreCase } from "@magicyan/core";
import type { Client, Guild, GuildTextBasedChannel, Message } from "discord.js";

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

type MessageURLInfo = 
| {
    channelId: string;
    guildId: string;
    messageId: string; 
}
| {
    messageId?: undefined; 
    channelId?: string;
    guildId?: string;
}

export function getMessageURLInfo(url: string): MessageURLInfo {
  const match = url.match(/^https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)$/);
  if (!match) return {};

  const [_, guildId, channelId, messageId] = match;
  return { guildId, channelId, messageId };
}

export async function fetchMessageFromURL(guild: Guild, url: string): Promise<Message<true> | null>
export async function fetchMessageFromURL(client: Client | Client, url: string): Promise<Message | null>
export async function fetchMessageFromURL(gc: Guild | Client, url: string): Promise<Message | null> {
    const { messageId, channelId } = getMessageURLInfo(url);
    
    if (!messageId) return null;
    
    const channel = await gc.channels
        .fetch(channelId)
        .catch(() => null);

    if (!channel || !("messages" in channel)) return null;

    return channel.messages
        .fetch(messageId)
        .catch(() => null);
}