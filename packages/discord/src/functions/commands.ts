import { ApplicationCommand, Client, Guild } from "discord.js";

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