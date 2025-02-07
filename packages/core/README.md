<div align="center">
  <img src="../../assets/images/icon.png" alt="Icon" width="100" height="100">
  <div style="margin-left: 20px;">

  # Magicyan Core
  
  </div>
</div>

Install with
```bash
npm install @magicyan/core
```

This lib provides simple and practical functions to use

## Check

```ts
import { equalsIgnoreCase, includesIgnoreCase } from "@magicyan/core";

console.log(equalsIgnoreCase("Hello World", "hello world")); // true
console.log(includesIgnoreCase("Javascript Program", "program")); // true
```

## Convert


```ts
import { equalsIgnoreCase, includesIgnoreCase } from "@magicyan/core";

console.log(hexToRgb("#3a8cc3")); // 3837123
console.log(rgbToHex(3837123)); // #3a8cc3
```

## Format
```ts
import { toNull, notFound, brBuilder, spaceBuilder, replaceText, captalize, limitText } from "@magicyan/core";

console.log(toNull()); // null
asyncMethod().catch(toNull); // ignore error

// value: number | null
const amount = notFound(value); // number | undefined

const text = brBuilder("Hello world", "This is javascript!");
console.log(text) ;
// Hello world
// This is javascript

const adm = "Rincko";
const action = "promoted";
const text = spaceBuilder("Administrator", adm, "has been", action);
console.log(text); // Administrator Rincko has been promoted

// lang.json
{
    "welcome": {
        "en-US": "Hi var(name), welcome to var(libname) lib",
        "pt-BR": "Olá var(name), seja bem vindo à lib var(libname)"
    }
}
// command.ts
import { replaceText } from "@magicyan/discord";
import lang from "./lang"
// ...

const locale = "en-US";

const text = replaceText(lang.welcome[locale], {
    "var(name)": user.displayName // "Rincko Dev",
    "var(libname)": lib.getName() // "@magicyan/core"
})

console.log(text) // Hi Rincko Dev, welcome to @magicyan/core lib

const captalizedWord = captalize("hello world");
console.log(capitalizedWord); // Output: "Hello world"

const captalizedText = captalize("i love brazil", true);
console.log(capitalizedText); // Output: "I Love Brazil"

const bigText = "Introduction to magicyan/core lib! A lib with many useful functions";
const limitedText = limitText(bigText, 21, "...");
console.log(limitedText) // Introduction to magic...
```

## Math
```ts
import { random, parseIntOr, parseFloatOr } from "@magicyan/core";

console.log(random.int(0, 10)) // 7
console.log(random.int(0, 10)) // 8
console.log(random.int(0, 10)) // 10

console.log(random.float(0, 10)) // 7.157077577891795
console.log(random.float(0, 10)) // 1.0842981808087804
console.log(random.float(0, 10)) // 6.304121080765393

console.log(parseIntOr("nan", 2)) // 2;
console.log(parseFloatOr("nan", -8)) // 08;
console.log(parseIntOr("29.09", 10)) // 29;
console.log(parseFloatOr("0.3", 18)) // 0.3;
```

## Promises
```ts
import { sleep, createInterval } from "@magicyan/core";

await sleep(2000) // ==> wait 2 seconds

let count = 0
const timer = createInterval({
    time: 1000,
    run(stop){
        console.log(count)
        if (count >= 10){
            console.log("end")
            stop()
            return
        }
        count++
    }
}) // 0, 1, 3, 4 ...

if (otherCondition) timer.stop();
```
## Utils

```ts
import { copyObject, mergeObject, toMergeObject } from "@magicyan/core";

const originalUser = { name: "Jhondoe" };
const userCopy = copyObject(originalUser);
originalUser.name = "Victor";
console.log(originalUser.name) // Victor
console.log(userCopy.name) // Jhondoe

const administrator = toMergeObject(userCopy, { perms: [1, 2] })
console.log(JSON.stringify(userCopy)) // {"name":"Jhondoe"}
console.log(JSON.stringify(administrator)) // {"name":"Jhondoe","perms":[1,2]}

mergeObject(administrator, { sector: "A" });
console.log(JSON.stringify(administrator)) // {"name":"Jhondoe","perms":[1,2],"sector":"A"}
```

## Validation

```ts
import { isEmail, isUrl } from "@magicyan/core";

console.log(isEmail("jhondoe@gmail.com")) // true
console.log(isEmail("jhondoeemail.com")) // false
console.log(isEmail("jhondoe@email.org")) // true
console.log(isEmail("@gmail.com")) // false

console.log(isUrl("localhost:3000")) // false
console.log(isUrl("https://npmjs.com")) // true
console.log(isUrl("http://github.com")) // true
console.log(isUrl("github.com")) // false
```