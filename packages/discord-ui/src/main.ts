import { PaginationMenu, PaginationMenuButtons } from "./menus/paginationManager";
import { ConfirmPrompt, ConfirmPromptButtons } from "./prompts/confirmManager";

interface DiscordUiOptions {
    prompts?: {
        confirm?: {
            buttons?: ConfirmPromptButtons
        }
    },
    menus?: {
        pagination?: {
            buttons?: PaginationMenuButtons
        }
    }
}

export function discordUi(options?: DiscordUiOptions){
    ConfirmPrompt.setDefaultButtons(options?.prompts?.confirm?.buttons);
    PaginationMenu.setDefaultButtons(options?.menus?.pagination?.buttons);
}