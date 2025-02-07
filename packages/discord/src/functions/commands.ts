import { type ApplicationCommand, chatInputApplicationCommandMention, Client, type Guild } from "discord.js";

type FindCommandFilter = (command: ApplicationCommand) => boolean

export function findCommand(guildOrClient: Guild | Client<true>){
    const commands = guildOrClient instanceof Client
    ? guildOrClient.application.commands.cache
    : guildOrClient.commands.cache;

    return {
        byName(name: string, and: FindCommandFilter = () => true){
            return commands.find(command => command.name === name && and(command));
        },
        byId(id: string){
            return commands.get(id);
        },
        byFilter(filter: FindCommandFilter){
            return commands.find(filter);
        }
    };
}

interface CommandMentionData { id: string; name: string }
export function commandMention(command: CommandMentionData, group?: string, subcommand?: string): string
export function commandMention(command: CommandMentionData, subcommand?: string): string
export function commandMention(command: CommandMentionData, a?: string, b?: string): string {
    const args = [command.name, command.id];
    if (a && b){
        args.splice(1, 0, a, b);
    }
    if (a && !b){
        args.splice(1, 0, a);
    }
    return chatInputApplicationCommandMention(...args as [string, string]);
}