import { isEmail, isUrl } from "../src";

console.log(
    isEmail("test"),
    isEmail("test@"),
    isEmail("testgmail.com"),
    isEmail("test@gmail.com"),
    isEmail("test@gmail.com"),
    isEmail("test@myemail.com"),
    isEmail("tes.testt@myemail.com"),
    isEmail("tes.testtmyemail.com"),
)

console.log(
    isUrl("test.com"),
    isUrl("test.com.br"),
    isUrl("https://test"),
    isUrl("file://test.png"),
    isUrl("http://test.com"),
    isUrl("https://salve.png"),
    isUrl("salve"),
)

function a(b?: string){
    b
}