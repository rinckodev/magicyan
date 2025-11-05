import { createDate } from "#package";

const date = createDate();

console.log(date.toLocaleString("pt-BR"));

date.add("months", 12);
date.setHours(12, 0, 0, 0);

console.log(date.toLocaleString("pt-BR"));

console.log(date.diff(createDate(), "months"));

const cloned = date.add("days", 1).clone();
console.log(cloned.toLocaleString("pt-BR"));
const cloned2 = cloned.add("days", 1).clone();
console.log(cloned2.toLocaleString("pt-BR"));