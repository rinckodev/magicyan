import { describe, it, expect, vi, afterEach } from "vitest";
import { discordUI } from "#package";
import { customizeMultimenuMenuButtons, customizeMultimenuMenuOptions } from "../src/menus/multimenu";
import { customizePaginationMenu } from "../src/menus/pagination";
import { customizeConfirmPrompt } from "../src/prompts/confirm";

vi.mock("../src/menus/multimenu", () => ({
    customizeMultimenuMenuButtons: vi.fn(),
    customizeMultimenuMenuOptions: vi.fn(),
}));

vi.mock("../src/menus/pagination", () => ({
    customizePaginationMenu: vi.fn(),
}));

vi.mock("../src/prompts/confirm", () => ({
    customizeConfirmPrompt: vi.fn(),
}));

describe("discordUI", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should call customizeConfirmPrompt when prompts.confirm.buttons is provided", () => {
        const confirmButtons = { confirm: { label: "Yes" }, cancel: { label: "No" } };

        discordUI({
            prompts: {
                confirm: {
                    buttons: confirmButtons,
                },
            },
        });

        expect(customizeConfirmPrompt).toHaveBeenCalledWith(confirmButtons);
    });

    it("should call customizePaginationMenu when menus.pagination.buttons is provided", () => {
        const paginationButtons = { next: { label: "Next" }, previous: { label: "Back" } };

        discordUI({
            menus: {
                pagination: {
                    buttons: paginationButtons,
                },
            },
        });

        expect(customizePaginationMenu).toHaveBeenCalledWith(paginationButtons);
    });

    it("should call customizeMultimenuMenuButtons and customizeMultimenuMenuOptions when menus.multimenu is provided", () => {
        const multimenuOptions = {
            buttons: { next: { label: "Forward" }, previous: { label: "Reverse" } },
            viewType: "blocks",
            placeholder: "Select an option",
        } as const;

        discordUI({
            menus: {
                multimenu: multimenuOptions,
            },
        });

        expect(customizeMultimenuMenuButtons).toHaveBeenCalledWith(multimenuOptions.buttons);
        expect(customizeMultimenuMenuOptions).toHaveBeenCalledWith(multimenuOptions);
    });

    it("should not call any customization functions if no options are provided", () => {
        discordUI({});
        expect(customizeConfirmPrompt).not.toHaveBeenCalled();
        expect(customizePaginationMenu).not.toHaveBeenCalled();
        expect(customizeMultimenuMenuButtons).not.toHaveBeenCalled();
        expect(customizeMultimenuMenuOptions).not.toHaveBeenCalled();
    });

    it("should call only the provided customization functions when partially configured", () => {
        const paginationButtons = { next: { label: "Continue" } };

        discordUI({
            menus: {
                pagination: {
                    buttons: paginationButtons,
                },
            },
        });

        expect(customizePaginationMenu).toHaveBeenCalledWith(paginationButtons);
        expect(customizeConfirmPrompt).not.toHaveBeenCalled();
        expect(customizeMultimenuMenuButtons).not.toHaveBeenCalled();
        expect(customizeMultimenuMenuOptions).not.toHaveBeenCalled();
    });
});
