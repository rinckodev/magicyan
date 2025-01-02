import { chars, EmbedPlusBuilder } from "#package";
import { EmbedPlusFields } from "src/functions/embeds/fields";
import { describe, beforeEach, it, expect } from "vitest";


describe("EmbedPlusFields", () => {
  let embed: EmbedPlusBuilder;
  let fields: EmbedPlusFields;

  beforeEach(() => {
    embed = new EmbedPlusBuilder({});
    fields = new EmbedPlusFields(embed);
  });

  it("should initialize with no fields", () => {
    expect(fields.length).toBe(0);
    expect(fields.toArray()).toEqual([]);
    expect(fields.record).toEqual({});
  });

  it("should add fields", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });
    expect(fields.length).toBe(2);
    expect(fields.record).toEqual({ "Field 1": "Value 1", "Field 2": "Value 2" });
  });

  it("should set fields, replacing existing ones", () => {
    fields.push({ name: "Field 1", value: "Value 1" });
    fields.set({ name: "Field 2", value: "Value 2" });
    expect(fields.length).toBe(1);
    expect(fields.record).toEqual({ "Field 2": "Value 2" });
  });

  it("should retrieve a field by index or name", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    expect(fields.get(0)).toEqual({ name: "Field 1", value: "Value 1" });
    expect(fields.get("Field 2")).toEqual({ name: "Field 2", value: "Value 2" });
    expect(fields.get(5)).toBeUndefined();
    expect(fields.get("Nonexistent")).toBeUndefined();
  });

  it("should find a field using a predicate", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    const predicate = (field: { name: string }) => field.name === "Field 2";
    expect(fields.find(predicate)).toEqual({ name: "Field 2", value: "Value 2" });
  });

  it("should delete a field by index, name, or predicate", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    expect(fields.delete("Field 1")).toBe(true);
    expect(fields.length).toBe(1);

    expect(fields.delete(0)).toBe(true);
    expect(fields.length).toBe(0);

    fields.push({ name: "Field 3", value: "Value 3" });
    const predicate = (field: { name: string }) => field.name === "Field 3";
    expect(fields.delete(predicate)).toBe(true);
    expect(fields.length).toBe(0);
  });

  it("should update a field by index, name, or predicate", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    expect(fields.update(0, { value: "Updated Value 1" })).toBe(true);
    expect(fields.get(0)).toEqual({ name: "Field 1", value: "Updated Value 1" });

    expect(fields.update("Field 2", { value: "Updated Value 2" })).toBe(true);
    expect(fields.get("Field 2")).toEqual({ name: "Field 2", value: "Updated Value 2" });

    const predicate = (field: { name: string }) => field.name === "Field 2";
    expect(fields.update(predicate, { inline: true })).toBe(true);
    expect(fields.get(1)).toEqual({ name: "Field 2", value: "Updated Value 2", inline: true });
  });

  it("should clear all fields", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    fields.clear();
    expect(fields.length).toBe(0);
    expect(fields.toArray()).toEqual([]);
  });

  it("should map fields to a new array", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    const names = fields.map((field) => field.name);
    expect(names).toEqual(["Field 1", "Field 2"]);
  });

  it("should insert fields at a specific index", () => {
    fields.push({ name: "Field 1", value: "Value 1" });
    fields.insert(0, { name: "Field 0", value: "Value 0" });

    expect(fields.get(0)).toEqual({ name: "Field 0", value: "Value 0" });
    expect(fields.length).toBe(2);
  });

  it("should return a formatted field when missing required properties", () => {
    fields.push({});
    const formattedField = fields.get(0);
    expect(formattedField).toEqual({ name: chars.invisible, value: chars.invisible });
  });

  it("should iterate through fields", () => {
    fields.push({ name: "Field 1", value: "Value 1" }, { name: "Field 2", value: "Value 2" });

    const iteratedFields = Array.from(fields);
    expect(iteratedFields).toEqual([
      { name: "Field 1", value: "Value 1" },
      { name: "Field 2", value: "Value 2" },
    ]);
  });
});
