import { ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
import { createRow } from "#package";
import { describe, expect, it } from "vitest";

describe("createRow", () => {
  it("should create a row with a button", () => {
    const button = new ButtonBuilder().setCustomId("btn_1").setLabel("Click me").setStyle(1);
    const row = createRow(button);

    expect(row.components[0]).toBe(button);
  });

  it("should create a row with a select menu", () => {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("menu_1")
      .addOptions({ label: "Option 1", value: "option1" });
    const row = createRow(selectMenu);

    expect(row.components[0]).toBe(selectMenu);
  });

  it("should create a row with multiple components", () => {
    const button1 = new ButtonBuilder().setCustomId("btn_2").setLabel("Another Button 2").setStyle(1);
    const button2 = new ButtonBuilder().setCustomId("btn_3").setLabel("Another Button 3").setStyle(1);

    const row = createRow(button1, button2);

    expect(row.components).toContain(button1);
    expect(row.components).toContain(button2);
  });
});
