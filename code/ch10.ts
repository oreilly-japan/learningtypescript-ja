// ======================================================================
function identity(input: any) {
    return input;
}

let value = identity(42); // valueの型：any

// ======================================================================
function identity<T>(input: T) {
    return input;
}

const stringy = identity("me"); // 型："me"
const numeric = identity(123); // 型：123

// ======================================================================
const identity = <T>(input: T) => input;

identity(123); // 型：123

// ======================================================================
function logWrapper<Input>(callback: (input: Input) => void) {
    return (input: Input) => {
        console.log("Input:", input);
        callback(input);
    };
}

// 型：(input: string) => void
logWrapper((input: string) => {
    console.log(input.length);
});

// 型：(input: unknown) => void
logWrapper((input) => {
    console.log(input.length);
    //          ~~~~~
    // Error: 'input' is of type 'unknown'.
    // 'input' は 'unknown' 型です。
});

// ======================================================================
// 型：(input: string) => void
logWrapper<string>((input) => {
    console.log(input.length);
});

logWrapper<string>((input: boolean) => {
    //             ~~~~~~~~~~~~~~~~~~~~~~~
    // Argument of type '(input: boolean) => void' is not
    // assignable to parameter of type '(input: string) => void'.
    //   Types of parameters 'input' and 'input' are incompatible.
    //     Type 'string' is not assignable to type 'boolean'.
    // 型 '(input: boolean) => void' の引数を型 '(input: string) => void' の
    // パラメーターに割り当てることはできません。
    //   パラメーター 'input' および 'input' は型に互換性がありません。
    //     型 'string' を型 'boolean' に割り当てることはできません。
});

// ======================================================================
// 型：(input: string) => void
logWrapper<string>((input: string) => { /* ... */ });

// ======================================================================
function makeTuple<First, Second>(first: First, second: Second) {
    return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // tupleの型：readonly [boolean, string]

// ======================================================================
function makePair<Key, Value>(key: Key, value: Value) {
    return { key, value };
}

// Ok：どちらの型引数も指定していないので
makePair("abc", 123); // 型：{ key: string; value: number }

// Ok：どちらの型引数も指定しているので
makePair<string, number>("abc", 123); // 型：{ key: string; value: number }
makePair<"abc", 123>("abc", 123); // 型：{ key: "abc"; value: 123 }

makePair<string>("abc", 123);
//       ~~~~~~
// Error: Expected 2 type arguments, but got 1.
// 2 個の型引数が必要ですが、1 個が指定されました。

// ======================================================================
interface Box<T> {
    inside: T;
}

let stringyBox: Box<string> = {
    inside: "abc",
};

let numberBox: Box<number> = {
    inside: 123,
}

let incorrectBox: Box<number> = {
    inside: false,
    // Error: Type 'boolean' is not assignable to type 'number'.
    // 型 'boolean' を型 'number' に割り当てることはできません。
}

// ======================================================================
interface Array<T> {
    // ...

    /**
     * 配列から最後の要素を削除し、それを返す。
     * 配列が空の場合は、undefinedを返し、配列は変更しない。
     */
    pop(): T | undefined;

    /**
     * 配列の最後に新しい要素を追加し、配列の新しい長さを返す。
     * @param items 配列に追加する新しい要素
     */
    push(...items: T[]): number;

    // ...
}

// ======================================================================
interface LinkedNode<Value> {
    next?: LinkedNode<Value>;
    value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
    return node.next ? getLast(node.next) : node.value;
}

// 推論されるValueの型引数：Date
let lastDate = getLast({
    value: new Date("09-13-1993"),
});

// 推論されるValueの型引数：string
let lastFruit = getLast({
    next: {
        value: "banana",
    },
    value: "apple",
});

// 推論されるValueの型引数：number
let lastMismatch = getLast({
    next: {
        value: 123
    },
    value: false,
//  ~~~~~
// Error: type 'boolean' is not assignable to type 'number'.
// 型 'boolean' を型 'number' に割り当てることはできません。
});

// ======================================================================
interface CrateLike<T> {
    contents: T;
}

let missingGeneric: CrateLike = {
    //              ~~~~~~~~~
    // Error: Generic type 'CrateLike<T>' requires 1 type argument(s).
    // ジェネリック型 'CrateLike<T>' には 1 個の型引数が必要です。
    contents: "??"
};

// ======================================================================
class Secret<Key, Value> {
    key: Key;
    value: Value;

    constructor(key: Key, value: Value) {
        this.key = key;
        this.value = value;
    }

    getValue(key: Key): Value | undefined {
        return this.key === key
            ? this.value
            : undefined;
    }
}

const storage = new Secret(12345, "luggage"); // 型：Secret<number, string>

storage.getValue(1987); // 型：string | undefined

// ======================================================================
class CurriedCallback<Input> {
    #callback: (input: Input) => void;

    constructor(callback: (input: Input) => void) {
        this.#callback = (input: Input) => {
            console.log("Input:", input);
            callback(input);
        };
    }

    call(input: Input) {
        this.#callback(input);
    }
}

// 型：CurriedCallback<string>
new CurriedCallback((input: string) => {
    console.log(input.length);
});

// 型：CurriedCallback<unknown>
new CurriedCallback((input) => {
    console.log(input.length);
    //          ~~~~~
    // Error: 'input' is of type 'unknown'.
    // 'input' は 'unknown' 型です。
});

// ======================================================================
// 型：CurriedCallback<string>
new CurriedCallback<string>((input) => {
    console.log(input.length);
});

new CurriedCallback<string>((input: boolean) => {
    //                      ~~~~~~~~~~~~~~~~~~~~~
    // Argument of type '(input: boolean) => void' is not
    // assignable to parameter of type '(input: string) => void'.
    //   Types of parameters 'input' and 'input' are incompatible.
    //     Type 'string' is not assignable to type 'boolean'.
    // 型 '(input: boolean) => void' の引数を型 '(input: string) => void' の
    // パラメーターに割り当てることはできません。
    //   パラメーター 'input' および 'input' は型に互換性がありません。
    //     型 'string' を型 'boolean' に割り当てることはできません。
});

// ======================================================================
class Quote<T> {
    lines: T;

    constructor(lines: T) {
        this.lines = lines;
    }
}

class SpokenQuote extends Quote<string[]> {
    speak() {
        console.log(this.lines.join("\n"));
    }
}

new Quote("The only real failure is the failure to try.").lines; // 型：string
new Quote([4, 8, 15, 16, 23, 42]).lines; // 型：number[]

new SpokenQuote([
    "Greed is so destructive.",
    "It destroys everything",
]).lines; // 型：string[]

new SpokenQuote([4, 8, 15, 16, 23, 42]);
//              ~~~~~~~~~~~~~~~~~~~~~~
// Error: Type 'number' is not assignable to type 'string'.
// 型 'number' を型 'string' に割り当てることはできません。

// ======================================================================
class AttributedQuote<Value> extends Quote<Value> {
    speaker: string

    constructor(value: Value, speaker: string) {
        super(value);
        this.speaker = speaker;
    }
}

// 型：AttributedQuote<string>
// （Quote<string>を拡張）
new AttributedQuote(
    "The road to success is always under construction.",
    "Lily Tomlin",
);

// ======================================================================
interface ActingCredit<Role> {
    role: Role;
}

class MoviePart implements ActingCredit<string> {
    role: string;
    speaking: boolean;

    constructor(role: string, speaking: boolean) {
        this.role = role;
        this.speaking = speaking;
    }
}

const part = new MoviePart("Miranda Priestly", true);

part.role; // 型：string

class IncorrectExtension implements ActingCredit<string> {
    role: boolean;
 // ~~~~
 // Error: Property 'role' in type 'IncorrectExtension' is not
 // assignable to the same property in base type 'ActingCredit<string>'.
 //   Type 'boolean' is not assignable to type 'string'.
 // 型 'IncorrectExtension' のプロパティ 'role' を
 // 基本データ型 'ActingCredit<string>' の同じプロパティに
 // 割り当てることはできません。
 //   型 'boolean' を型 'string' に割り当てることはできません。
}

// ======================================================================
class CreatePairFactory<Key> {
    key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    createPair<Value>(value: Value) {
        return { key: this.key, value };
    }
}

// 型：CreatePairFactory<string>
const factory = new CreatePairFactory("role");

// 型：{ key: string, value: number }
const numberPair = factory.createPair(10);

// 型：{ key: string, value: string }
const stringPair = factory.createPair("Sophie");

// ======================================================================
class BothLogger<OnInstance> {
    instanceLog(value: OnInstance) {
        console.log(value);
        return value;
    }

    static staticLog<OnStatic>(value: OnStatic) {
        let fromInstance: OnInstance;
        //                ~~~~~~~~~~
        // Error: Static members cannot reference class type parameters.
        // 静的メンバーはクラスの型パラメーターを参照できません。

        console.log(value);
        return value;
    }
}

const logger = new BothLogger<number[]>;
logger.instanceLog([1, 2, 3]); // 型：number[]

// 推論されるOnStaticの型引数：boolean[]
BothLogger.staticLog([false, true]);

// 明示的なOnStaticの型引数：string
BothLogger.staticLog<string>("You can't change the music of your soul.");

// ======================================================================
type Nullish<T> = T | null | undefined;

// ======================================================================
type CreatesValue<Input, Output> = (input: Input) => Output;

// 型：(input: string) => number
let creator: CreatesValue<string, number>;

creator = text => text.length; // Ok

creator = text => text.toUpperCase();
//                ~~~~~~~~~~~~~~~~~~
// Error: Type 'string' is not assignable to type 'number'.
// 型 'string' を型 'number' に割り当てることはできません。

// ======================================================================
type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
    error: Error;
    succeeded: false;
}

interface SuccessfulResult<Data> {
    data: Data;
    succeeded: true;
}

function handleResult(result: Result<string>) {
    if (result.succeeded) {
        // resultの型：SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
    } else {
        // resultの型：FailureResult
        console.error(`Awww... ${result.error}`);
    }

    result.data;
    //     ~~~~
    // Error: Property 'data' does not exist on type 'Result<string>'.
    //   Property 'data' does not exist on type 'FailureResult'.
    // プロパティ 'data' は型 'Result<string>' に存在しません。
    //   プロパティ 'data' は型 'FailureResult' に存在しません。
}

// ======================================================================
interface Quote<T = string> {
    value: T;
}

let explicit: Quote<number> = { value: 123 };

let implicit: Quote = { value: "Be yourself. The world worships the original." };

let mismatch: Quote = { value: 123 };
//                      ~~~~~
// Error: Type 'number' is not assignable to type 'string'.
// 型 'number' を型 'string' に割り当てることはできません。

// ======================================================================
interface KeyValuePair<Key, Value = Key> {
    key: Key;
    value: Value;
}

// 型：KeyValuePair<string, number>
let allExplicit: KeyValuePair<string, number> = {
    key: "rating",
    value: 10,
};

// 型：KeyValuePair<string, string>
let oneDefaulting: KeyValuePair<string> = {
    key: "rating",
    value: "ten",
};

let firstMissing: KeyValuePair = {
    //            ~~~~~~~~~~~~
    // Error: Generic type 'KeyValuePair<Key, Value>'
    // requires between 1 and 2 type arguments.
    // ジェネリック型 'KeyValuePair<Key, Value>' には、
    // 1 個から 2 個までの型引数が必要です。
    key: "rating",
    value: 10,
};

// ======================================================================
function inTheEnd<First, Second, Third = number, Fourth = string>() {} // Ok

function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}
//                                                         // ~~~~~~
// Error: Required type parameters may not follow optional type parameters.
// オプションの型パラメーターの後に、必須の型パラメーターを続けることは
// できません。@<fn>{fnj1001}

// ======================================================================
interface WithLength {
    length: number;
}

function logWithLength<T extends WithLength>(input: T) {
    console.log(`Length: ${input.length}`);
    return input;
}

logWithLength("No one can figure out your worth but you."); // 型：string
logWithLength([false, true]); // 型：boolean[]
logWithLength({ length: 123 }); // 型：{ length: number }

logWithLength(new Date());
//            ~~~~~~~~~~
// Error: Argument of type 'Date' is not
// assignable to parameter of type 'WithLength'.
//   Property 'length' is missing in type
//   'Date' but required in type 'WithLength'.
// 型 'Date' の引数を型 'WithLength' のパラメーターに
// 割り当てることはできません。
//   プロパティ 'length' は型 'Date' にありませんが、
//   型 'WithLength' では必須です。

// ======================================================================
function get<T, Key extends keyof T>(container: T, key: Key) {
    return container[key];
}

const roles = {
    favorite: "Fargo",
    others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const favorite = get(roles, "favorite"); // 型：string
const others = get(roles, "others"); // 型：string[]

const missing = get(roles, "extras");
//                         ~~~~~~~~
// Error: Argument of type '"extras"' is not assignable
// to parameter of type '"favorite" | "others"'.
// 型 '"extras"' の引数を型 '"favorite" | "others"' のパラメーターに
// 割り当てることはできません。

// ======================================================================
function get<T>(container: T, key: keyof T) {
    return container[key];
}

const roles = {
    favorite: "Fargo",
    others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const found = get(roles, "favorite"); // 型：string | string[]

// ======================================================================
class PromiseLike<Value> {
    constructor(
        executor: (
            resolve: (value: Value) => void,
            reject: (reason: unknown) => void,
        ) => void,
    ) { /* ... */ }
}

// ======================================================================
// 型：Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// 型：Promise<string>
const resolvesString = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// ======================================================================
// 型：Promise<string>
const textEventually = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// 型：Promise<number>
const lengthEventually = textEventually.then((text) => text.length)

// ======================================================================
// 型：(text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return text.length;
}

// 型：(text: string) => Promise<number>
async function lengthImmediately(text: string) {
    return text.length;
}

// ======================================================================
// Ok
async function givesPromiseForString(): Promise<string> {
    return "Done!";
}

async function givesString(): string {
    //                        ~~~~~~
    // Error: The return type of an async function or method must be the global 
    // Promise<T> type. Did you mean to write 'Promise<string>'?
    // 非同期関数または非同期メソッドの戻り値の型は、グローバル Promise<T> 型
    // である必要があります。'Promise<string>' と書き込むつもりでしたか?
    return "Done!";
}

// ======================================================================
function logInput<Input extends string>(input: Input) {
    console.log("Hi!", input);
}

// ======================================================================
function logInput(input: unknown) {
    console.log("Hi!", input);
}

// ======================================================================
// LとかVとか、いったい何のことだ？！
function labelBox<L, V>(l: L, v: V) { /* ... */ }

// ======================================================================
// はるかに明快です
function labelBox<Label, Value>(label: Label, value: Value) { /* ... */ }