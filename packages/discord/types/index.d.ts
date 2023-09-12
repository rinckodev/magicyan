import { 
    EmbedAuthorData,
     ImageURLOptions,
     User,
     ActionRowBuilder,
     AnyComponentBuilder,
     ButtonBuilder,
     LinkButtonComponentData,
     TextInputBuilder,
     TextInputComponentData 
} from "discord.js";

export declare function createEmbedAuthor({ 
    user,property, imageSize: size, iconURL, url, prefix, suffix 
}:{
    user: User;
    property?: keyof Pick<User, "username" | "displayName" | "id">;
    imageSize?: ImageURLOptions["size"];
    iconURL?: string;
    url?: string;
    prefix?: string;
    suffix?: string;
}): EmbedAuthorData;

export declare function createRow<Component extends AnyComponentBuilder = AnyComponentBuilder>(...components: Component[]): ActionRowBuilder<Component>;
export declare function createModalInput(data: Omit<TextInputComponentData, "type">): ActionRowBuilder<TextInputBuilder>;
export declare function createLinkButton(data: Omit<LinkButtonComponentData, "style" | "type">): ButtonBuilder;

// external
export * from "@magicyan/core";