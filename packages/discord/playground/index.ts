import { extractMentionId } from "../src";

const user = "<@264620632644255745>";
const channel = "<#1068689068256403457>";
const role = "<@&929925182796226632>";

console.log(extractMentionId(user));
console.log(extractMentionId(channel));
console.log(extractMentionId(role));