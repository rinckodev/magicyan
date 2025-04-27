import { type AnyComponentBuilder, ActionRowBuilder } from "discord.js";

export function createRow<Component extends AnyComponentBuilder>(...components: Component[]){
    return new ActionRowBuilder<Component>({ components });
}