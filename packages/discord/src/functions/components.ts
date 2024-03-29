import { ActionRow, ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ChannelSelectMenuComponent, ComponentType, LinkButtonComponentData, MentionableSelectMenuComponent, MessageActionRowComponent, RoleSelectMenuComponent, StringSelectMenuComponent, UserSelectMenuComponent } from "discord.js";

export function createRow<Component extends AnyComponentBuilder>(...components: Component[]){
    return new ActionRowBuilder<Component>({components});
}

interface CreateLinkButtonData extends Omit<LinkButtonComponentData, "style" | "type"> {}
export function createLinkButton(data: CreateLinkButtonData){
    if (!data.label) data.label = data.url;
    return new ButtonBuilder({ style: ButtonStyle.Link, ...data });
}

interface MessageComponentsManager {
    getButton(customId: string): ButtonComponent | undefined;
    getButton(customId: string, required: true): ButtonComponent;

    getStringSelect(customId: string): StringSelectMenuComponent | undefined;
    getStringSelect(customId: string, required: true): StringSelectMenuComponent;

    getUserSelect(customId: string): UserSelectMenuComponent | undefined;
    getUserSelect(customId: string, required: true): UserSelectMenuComponent;
    
    getChannelSelect(customId: string): ChannelSelectMenuComponent | undefined;
    getChannelSelect(customId: string, required: true): ChannelSelectMenuComponent;
    
    getRoleSelect(customId: string): RoleSelectMenuComponent | undefined;
    getRoleSelect(customId: string, required: true): RoleSelectMenuComponent;

    getMentionableSelect(customId: string): MentionableSelectMenuComponent | undefined;
    getMentionableSelect(customId: string, required: true): MentionableSelectMenuComponent;

    resolved: {
        buttons: ButtonComponent[];
        stringSelects: StringSelectMenuComponent[];
        userSelects: UserSelectMenuComponent[];
        channelSelects: ChannelSelectMenuComponent[];
        roleSelects: RoleSelectMenuComponent[];
        mentionableSelects: MentionableSelectMenuComponent[];
    }
}
export function createComponentsManager(components: ActionRow<MessageActionRowComponent>[]): MessageComponentsManager{
    const buttons = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.Button)    
    ) as ButtonComponent[];
    const stringSelects = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.StringSelect)    
    ) as StringSelectMenuComponent[];
    const userSelects = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.UserSelect)    
    ) as UserSelectMenuComponent[];
    const channelSelects = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.ChannelSelect)    
    ) as ChannelSelectMenuComponent[];
    const roleSelects = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.RoleSelect)    
    ) as RoleSelectMenuComponent[];
    const mentionableSelects = components.flatMap(row => 
        row.components.filter(c => c.type === ComponentType.Button)    
    ) as MentionableSelectMenuComponent[];

    return {
        getButton(customId){
            return buttons.find(b => b.customId === customId) as ButtonComponent;
        },
        getStringSelect(customId){
            return stringSelects.find(b => b.customId === customId) as StringSelectMenuComponent;
        },
        getUserSelect(customId){
            return userSelects.find(b => b.customId === customId) as UserSelectMenuComponent;
        },
        getChannelSelect(customId){
            return channelSelects.find(b => b.customId === customId) as ChannelSelectMenuComponent;
        },
        getRoleSelect(customId){
            return roleSelects.find(b => b.customId === customId) as RoleSelectMenuComponent;
        },
        getMentionableSelect(customId){
            return mentionableSelects.find(b => b.customId === customId) as MentionableSelectMenuComponent;
        },
        resolved: {
            buttons,
            stringSelects,
            userSelects,
            channelSelects,
            roleSelects,
            mentionableSelects,
        }
    };
}