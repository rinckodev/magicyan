import { customizeMultimenuMenuButtons, customizeMultimenuMenuOptions, type CustomizeMultimenuMenuButtons, type MultiMenuViewType } from "./menus/multimenu";
import { customizePaginationMenu, type CustomizePaginationMenuButtons } from "./menus/pagination";
import { customizeConfirmPrompt, type CustomizeConfirmPromptButtons } from "./prompts/confirm";

interface DiscordUIDefaults {
    prompts?: {
        confirm?: {
            buttons?: CustomizeConfirmPromptButtons
        }
    },
    menus?: {
        pagination?: {
            buttons?: CustomizePaginationMenuButtons
        },
        multimenu?: {
            viewType?: MultiMenuViewType
            buttons?: CustomizeMultimenuMenuButtons,
            placeholder?: string
        }
    }
}q

export function discordUI(defaults: DiscordUIDefaults){
    if (defaults.prompts?.confirm?.buttons){
        customizeConfirmPrompt(defaults.prompts.confirm.buttons);
    }
    if (defaults.menus?.pagination?.buttons){
        customizePaginationMenu(defaults.menus.pagination.buttons);
    }
    if (defaults.menus?.multimenu){
        if (defaults.menus.multimenu.buttons){
            customizeMultimenuMenuButtons(defaults.menus.multimenu.buttons);
        }
        customizeMultimenuMenuOptions(defaults.menus.multimenu);
    }
};