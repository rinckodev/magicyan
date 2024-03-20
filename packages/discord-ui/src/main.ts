import { MultimenuMenu, MultimenuMenuButtons, MultimenuMenuSelect, MultiMenuViewType } from "./menus/multimenuManager";
import { PaginationMenu, PaginationMenuButtons } from "./menus/paginationManager";
import { ConfirmPrompt, ConfirmPromptButtons } from "./prompts/confirmManager";

interface DiscordUiDefaults {
    prompts?: {
        confirm?: {
            buttons?: ConfirmPromptButtons
        }
    },
    menus?: {
        pagination?: {
            buttons?: PaginationMenuButtons
        },
        multimenu?: {
            viewType?: MultiMenuViewType
            buttons?: MultimenuMenuButtons,
            selectMenu?: MultimenuMenuSelect
        }
    }
}

export function discordUi(defaults?: DiscordUiDefaults){
    ConfirmPrompt.setDefaultButtons(defaults?.prompts?.confirm?.buttons);
    PaginationMenu.setDefaultButtons(defaults?.menus?.pagination?.buttons);

    MultimenuMenu.setDefaultButtons(defaults?.menus?.multimenu?.buttons);
    MultimenuMenu.setDefaultViewType(defaults?.menus?.multimenu?.viewType);
    MultimenuMenu.setDefaultSelectMenu(defaults?.menus?.multimenu?.selectMenu);
}