import { createDate } from "#package";

const date = createDate();

console.log(date.toLocaleString("pt-BR"));

date.add("months", 12);
date.setHours(12, 0, 0, 0);

console.log(date.toLocaleString("pt-BR"));

