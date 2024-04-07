import { EmbedPlusBuilder } from "./embedplus";

export type EmbedPlusFieldData = { name: string; value: string; inline?: boolean }

type FieldPredicate = (field: EmbedPlusFieldData, index: number, obj: EmbedPlusFieldData[]) => boolean;

export class EmbedPlusField {
    private embed: EmbedPlusBuilder;
    private set fields(fields: EmbedPlusFieldData[]){
        this.embed.setFields(fields);
    }
    private get fields(){
        return this.embed.data.fields ?? [];
    }
    constructor(embed: EmbedPlusBuilder){
        this.embed = embed;
    }
    [Symbol.iterator](){
        let pointer = 0;
        const fields = this.fields;

        return {
            next(): IteratorResult<EmbedPlusFieldData> {
                return {
                    done: pointer >= fields.length,
                    value: fields[pointer++] ?? null
                };
            }
        };
    }
    public get length(){
        return this.fields.length;
    }
    public get record(): Record<string, string> {
        return this.fields.reduce(
            (record, { name, value }) => Object.assign(record, { [name]: value }), {}
        );
    }
    /**
     * Get a filed by index
     * @param name Field name
     */
    public get(name: string): EmbedPlusFieldData | undefined
    /**
     * Get a field by name
     * @param index Field index
     */
    public get(index: number): EmbedPlusFieldData | undefined 
    public get(query: string | number): EmbedPlusFieldData | undefined {
        const isIndex = typeof query == "number";
        if (isIndex) return this.fields[query];
        return this.fields.find(f => f.name === query);
    }
    public find(predicate: FieldPredicate): EmbedPlusFieldData | undefined {
        return this.fields.find(predicate);
    }
    public push(...fields: EmbedPlusFieldData[]){
        this.embed.addFields(fields);
    }
    public set(...fields: EmbedPlusFieldData[]){
        this.embed.setFields(fields);
    }
    public update(predicate: string | number | FieldPredicate, field: Partial<EmbedPlusFieldData>): boolean {
        const index = this.getPredicateIndex(predicate);
        if (index == -1) return false;
        const embedField = this.get(index);
        if (!embedField) return false;
        this.embed.spliceFields(index, 1, Object.assign(embedField, field));
        return true;
    }
    public delete(predicate: number | FieldPredicate): boolean {
        const index = this.getPredicateIndex(predicate);
        if (index == -1) return false;
        const embedField = this.get(index);
        if (!embedField) return false;
        this.embed.spliceFields(index, 1);
        return true;
    }
    public toArray(){
        return Array.from(this);
    }
    private getPredicateIndex(predicate: string | number | FieldPredicate){
        switch(typeof predicate){
            case "function": return this.fields.findIndex(predicate);
            case "string": return this.fields.findIndex(f => f.name == predicate);
            case "number": return predicate;
            default: return -1;
        }
    }
}
