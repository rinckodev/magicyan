enum Template {
    TestA,
    TestB,
    TestC
}

export function main(template: Template){
    console.log(template);
}
main(Template.TestA);