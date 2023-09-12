# Magicyan Core

Install with
```bash
npm install @magicyan/core
```

Very simple functions for you to use in your code

```ts
equalsIgnoreCase("MyText", "mytext") // => true

hexToRgb("#6ab2d9") // => 6992601

brBuilder("title", "description", "anytext", "othertext") // => 
// title
// description
// anytext
// othertext

randomNumber(1, 20) // => 8
randomNumber(1, 20) // => 16
randomNumber(1, 20) // => 2
randomNumber(1, 20) // => 12


await sleep(2000) // ==> wait 2 seconds

toNull() // null

// string | null // any lib function
const action = options.getString("action");
notFound(action) // null => undefined | string => string;

// lang.json
{
    "welcome": {
        "en-US": "Hi var(name), welcome to var(libname) lib",
        "pt-BR": "Olá var(name), seja bem vindo à lib var(libname)"
    }
}
// command.ts
import lang from "./lang"
// ...
textReplacer(lang.welcome[locale], {
    "var(name)": user.displayName,
    "var(libname)": lib.getName()
})
```