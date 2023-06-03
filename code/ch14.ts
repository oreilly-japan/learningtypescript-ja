// ======================================================================
class Engineer {
    readonly area: string;

    constructor(area: string) {
        this.area = area;
        console.log(`I work in the ${area} area.`);
    }
}

// 型：string
new Engineer("mechanical").area;

// ======================================================================
class Engineer {
    constructor(readonly area: string) {
        console.log(`I work in the ${area} area.`);
    }
}

// 型：string
new Engineer("mechanical").area;

// ======================================================================
class NamedEngineer {
    fullName: string;

    constructor(
        name: string,
        public area: string,
    ) {
        this.fullName = `${name}, ${area} engineer`;
    }
}

// ======================================================================
class NamedEngineer {
    fullName: string;
    area: string;

    constructor(
        name: string,
        area: string,
    ) {
        this.area = area;
        this.fullName = `${name}, ${area} engineer`;
    }
}

// ======================================================================
@myDecorator
class MyClass { /* ... */ }

// ======================================================================
function logOnCall(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    console.log("[logOnCall] I am decorating", target.constructor.name);

    descriptor.value = function (...args: unknown[]) {
        console.log(`[descriptor.value] Calling '${key}' with:`, ...args);
        return original.call(this, ...args);
    }
}

class Greeter {
    @logOnCall
    greet(message: string) {
        console.log(`[greet] Hello, ${message}!`);
    }
}

new Greeter().greet("you");
// 出力ログ：
// "[logOnCall] I am decorating", "Greeter"
// "[descriptor.value] Calling 'greet' with:", "you"
// "[greet] Hello, you!"

// ======================================================================
const StatusCodes = {
    InternalServerError: 500,
    NotFound: 404,
    Ok: 200,
    // ...
} as const;

StatusCodes.InternalServerError; // 500

// ======================================================================
// 型：200 | 404 | 500
type StatusCodeValue = (typeof StatusCodes)[keyof typeof StatusCodes];

let statusCodeValue: StatusCodeValue;

statusCodeValue = 200; // Ok

statusCodeValue = -1;
// Error: Type '-1' is not assignable to type 'StatusCodeValue'.
// 型 '-1' を型 'StatusCodeValue' に割り当てることはできません。

// ======================================================================
enum StatusCode {
    InternalServerError = 500,
    NotFound = 404,
    Ok = 200,
}

StatusCode.InternalServerError; // 500

// ======================================================================
let statusCode: StatusCode;

statusCode = StatusCode.Ok; // Ok
statusCode = 200; // Ok

// ======================================================================
enum VisualTheme {
    Dark, // 0
    Light, // 1
    System, // 2
}

// ======================================================================
enum Direction {
  Top = 1,
  Right,
  Bottom,
  Left,
}

// ======================================================================
enum LoadStyle {
    AsNeeded = "as-needed",
    Eager = "eager",
}

// ======================================================================
enum Wat {
    FirstString = "first",
    SomeNumber = 9000,
    ImplicitNumber, // Ok（値は9001）
    AnotherString = "another",

    NotAllowed,
    // Error: Enum member must have initializer.
    // 列挙型メンバーには初期化子が必要です。
}

// ======================================================================
const enum DisplayHint {
    Opaque = 0,
    Semitransparent,
    Transparent,
}

let displayHint = DisplayHint.Transparent;

// ======================================================================
namespace Randomized {
    const value = Math.random();
    console.log(`My value is ${value}`);
}

// ======================================================================
namespace Settings {
  export const name = "My Application";
  export const version = "1.2.3";

  export function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  }

  console.log("Initializing", describe());
}

console.log("Initialized", Settings.describe());

// ======================================================================
// settings/constants.ts
namespace Settings {
  export const name = "My Application";
  export const version = "1.2.3";
}

// settings/describe.ts
namespace Settings {
    export function describe() {
        return `${Settings.name} at version ${Settings.version}`;
    }

    console.log("Initializing", describe());
}

// index.ts
console.log("Initialized", Settings.describe());

// ======================================================================
const Settings = {
    describe: function describe() {
        return `${Settings.name} at version ${Settings.version}`;
    },
    name: "My Application",
    version: "1.2.3",
};

// ======================================================================
namespace Root.Nested {
    export const value1 = true;
}

namespace Root {
    export namespace Nested {
        export const value2 = true;
    }
}

// ======================================================================
// node_modules/@types/my-example-lib/index.d.ts
export const value: number;
export as namespace libExample;

// ======================================================================
// src/index.ts
import * as libExample from "my-example-lib"; // Ok
const value = window.libExample.value; // Ok

// ======================================================================
// settings/constants.ts
export const name = "My Application";
export const version = "1.2.3";

// settings/describe.ts
import { name, version } from "./constants";

export function describe() {
    return `${name} at version ${version}`;
}

console.log("Initializing", describe());

// index.ts
import { describe } from "./settings/describe";

console.log("Initialized", describe());

// ======================================================================
// index.ts
const action = { area: "people", name: "Bella Abzug", role: "politician" };

type ActivistArea = "nature" | "people";

export { action, ActivistArea };

// index.js
const action = { area: "people", name: "Bella Abzug", role: "politician" };

export { action };

// ======================================================================
// index.ts
import { type TypeOne, value } from "my-example-types";
import type { TypeTwo } from "my-example-types";
import type DefaultType from "my-example-types";

export { type TypeOne, value };
export type { DefaultType, TypeTwo };

// index.js
import { value } from "my-example-types";

export { value };

// ======================================================================
import { ClassOne, type ClassTwo } from "my-example-types";

new ClassOne(); // Ok

new ClassTwo();
//  ~~~~~~~~
// Error: 'ClassTwo' cannot be used as a value
// because it was imported using 'import type'.
// 'import type' を使用してインポートされたため、
// 'ClassTwo' は値として使用できません。