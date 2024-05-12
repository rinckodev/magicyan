import { type ApplicationCommand, type Guild, type ApplicationCommandOptionData, type ApplicationCommandSubCommandData, type ApplicationCommandSubGroupData, Client, ApplicationCommandOptionType } from "discord.js";

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

type OmitCommandDataProps = "name" | "options" | "autocomplete" | "type";

type CommandOption = Exclude<Omit<ApplicationCommandOptionData, "name">, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>;
type CommandOptions = Record<string, CommandOption>;
/**
 * Creates an array of command options, quickly define command options with a record where the key is the option name and the value is the definitions
 * @param groups 
 * @returns 
 */
export function createCommandOptions(options: CommandOptions): ApplicationCommandOptionData[] {
    return Object.entries(options).map(
        ([name, data]) => Object.assign(data, { name })
    ) as ApplicationCommandOptionData[];
}
type SubCommand = Omit<ApplicationCommandSubCommandData, OmitCommandDataProps> & { options?: Record<string, CommandOption> };
type SubCommands = Record<string, SubCommand>
/**
 * Create an array of command options, quickly define subcommands with a record where the key is the subcommand name and the value is the definitions
 * @param groups 
 * @returns 
 */
export function createSubCommands(subcommands: SubCommands): ApplicationCommandSubCommandData[] {
    return Object.entries(subcommands).map(([name, data]) => {
        if (data.options) Object.assign(data, { 
            options: createCommandOptions(data.options) 
        });
        return Object.assign(data, { name, type: ApplicationCommandOptionType.Subcommand });
    }) as ApplicationCommandSubCommandData[];
}
type SubCommandGroup = Omit<ApplicationCommandSubGroupData, OmitCommandDataProps> & { subcommands: SubCommands };
type SubCommandGroups = Record<string, SubCommandGroup>;
/**
 * Create an array of command options, quickly define groups of subcommands with a record where the key is the group name and the value is the definitions
 * @param groups 
 * @returns 
 */
export function createSubCommandsGroups(groups: SubCommandGroups): ApplicationCommandSubGroupData[]{
    return Object.entries(groups).map(([name, data]) => {
        const options = createSubCommands(data.subcommands);
        return Object.assign(data, { name, type: ApplicationCommandOptionType.SubcommandGroup, options });
    }) as ApplicationCommandSubGroupData[];
}