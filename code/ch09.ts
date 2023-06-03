// ======================================================================
let anyValue: any;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok

console.log(anyValue); // Ok

// ======================================================================
function greetComedian(name: any) {
    // 型エラーはなし...
    console.log(`Announcing ${name.toUpperCase()}!`);
}

greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function
// 実行時エラー：name.toUpperCase は関数ではありません

// ======================================================================
function greetComedian(name: unknown) {
    console.log(`Announcing ${name.toUpperCase()}!`);
    //                        ~~~~
    // Error: Object is of type 'unknown'.
    // オブジェクト型は 'unknown' です。
}

// ======================================================================
function greetComedianSafety(name: unknown) {
    if (typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}!`); // Ok
    } else {
        console.log("Well, I'm off.");
    }
}

greetComedianSafety("Betty White"); // "Announcing BETTY WHITE!" が出力されます
greetComedianSafety({}); // "Well, I'm off." が出力されます

// ======================================================================
function isNumberOrString(value: unknown) {
    return ['number', 'string'].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
    if (isNumberOrString(value)) {
        // valueの型：number | string | null | undefined
        value.toString();
        // Error: Object is possibly 'null' or 'undefined'.
        // オブジェクトは 'null' か 'undefined' である可能性があります。
    } else {
        console.log("Value does not exist:", value);
    }
}

// ======================================================================
function typePredicate(input: WideType): input is NarrowType;

// ======================================================================
function isNumberOrString(value: unknown): value is number | string {
    return ['number', 'string'].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
    if (isNumberOrString(value)) {
        // valueの型：number | string
        value.toString(); // Ok
    } else {
        // valueの型：null | undefined
        console.log("value does not exist:", value);
    }
}

// ======================================================================
interface Comedian {
    funny: boolean;
}

interface StandupComedian extends Comedian {
    routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
    return 'routine' in value;
}

function workWithComedian(value: Comedian) {
    if (isStandupComedian(value)) {
        // valueの型：StandupComedian
        console.log(value.routine); // Ok
    }

    // valueの型：Comedian
    console.log(value.routine);
    //                ~~~~~~~
    // Error: Property 'routine' does not exist on type 'Comedian'.
    // プロパティ 'routine' は型 'Comedian' に存在しません。
}

// ======================================================================
function isLongString(input: string | undefined): input is string {
    return !!(input && input.length >= 7);
}

function workWithText(text: string | undefined) {
    if (isLongString(text)) {
        // textの型：string
        console.log("Long text:", text.length);
    } else {
        // textの型：undefined
        console.log("Short text:", text?.length);
        //                               ~~~~~~
        // Error: Property 'length' does not exist on type 'never'.
        // プロパティ 'length' は型 'never' に存在しません。
    }
}

// ======================================================================
interface Ratings {
    audience: number;
    critics: number;
}

function getRating(ratings: Ratings, key: string): number {
    return ratings[key];
    //     ~~~~~~~~~~~
    // Error: Element implicitly has an 'any' type because expression
    // of type 'string' can't be used to index type 'Ratings'.
    //   No index signature with a parameter of
    //   type 'string' was found on type 'Ratings'.
    // 型 'string' の式を使用して型 'Ratings' にインデックスを付ける
    // ことはできないため、要素は暗黙的に 'any' 型になります。
    //   型 'string' のパラメーターを持つインデックス シグネチャが
    //   型 'Ratings' に見つかりませんでした。
}

const ratings: Ratings = { audience: 66, critics: 84 };

getRating(ratings, 'audience'); // Ok

getRating(ratings, 'not valid'); // コンパイルは通りますが、不正です

// ======================================================================
function getRating(ratings: Ratings, key: 'audience' | 'critics'): number {
    return ratings[key]; // Ok
}

const ratings: Ratings = { audience: 66, critics: 84 };

getRating(ratings, 'audience'); // Ok

getRating(ratings, 'not valid');
//                 ~~~~~~~~~~~
// Error: Argument of type '"not valid"' is not
// assignable to parameter of type '"audience" | "critics"'.
// 型 '"not valid"' の引数を型 '"audience" | "critics"' のパラメーターに
// 割り当てることはできません。

// ======================================================================
function getRatingKeyof(ratings: Ratings, key: keyof Ratings): number {
    return ratings[key]; // Ok
}

const ratings: Ratings = { audience: 66, critics: 84 };

getRatingKeyof(ratings, 'audience'); // Ok

getRatingKeyof(ratings, 'not valid');
//                      ~~~~~~~~~~~
// Error: Argument of type '"not valid"' is not
// assignable to parameter of type 'keyof Ratings'.
// 型 '"not valid"' の引数を型 'keyof Ratings' のパラメーターに
// 割り当てることはできません。

// ======================================================================
const original = {
    medium: "movie",
    title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
    adaptation = { ...original, medium: "play" }; // Ok
} else {
    adaptation = { ...original, medium: 2 };
    //                          ~~~~~~
    // Error: Type 'number' is not assignable to type 'string'.
    // 型 'number' を型 'string' に割り当てることはできません。
}

// ======================================================================
const ratings = {
    imdb: 8.4,
    metacritic: 82,
};

function logRating(key: keyof typeof ratings) {
    console.log(ratings[key]);
}

logRating("imdb"); // Ok

logRating("invalid");
//        ~~~~~~~~~
// Error: Argument of type '"invalid"' is not assignable
// to parameter of type '"imdb" | "metacritic"'.
// 型 '"invalid"' の引数を型 '"imdb" | "metacritic"' のパラメーターに
// 割り当てることはできません。

// ======================================================================
const rawData = `["grace", "frankie"]`;

// 型：any
JSON.parse(rawData);

// 型：string[]
JSON.parse(rawData) as string[];

// 型：[string, string]
JSON.parse(rawData) as [string, string];

// 型：["grace", "frankie"]
JSON.parse(rawData) as ["grace", "frankie"];

// ======================================================================
try {
    //（エラーをスローする可能性のあるコード）
} catch (error) {
    console.warn("Oh no!", (error as Error).message);
}

// ======================================================================
try {
    //（エラーをスローする可能性のあるコード）
} catch (error) {
    console.warn("Oh no!", error instanceof Error ? error.message : error);
}

// ======================================================================
// 推論される型：Date | undefined
let maybeDate = Math.random() > 0.5
    ? undefined
    : new Date();

// 型アサーションによって断言される型：Date
maybeDate as Date;

// 非nullアサーションによって断言される型：Date
maybeDate!;

// ======================================================================
const seasonCounts = new Map([
    ["I Love Lucy", 6],
    ["The Golden Girls", 7],
]);

// 型：number | undefined
const maybeValue = seasonCounts.get("I Love Lucy");

console.log(maybeValue.toString());
//          ~~~~~~~~~~
// Error: Object is possibly 'undefined'.
// オブジェクトは 'undefined' である可能性があります。

// 型：number
const knownValue = seasonCounts.get("I Love Lucy")!;

console.log(knownValue.toString()); // Ok

// ======================================================================
const seasonCounts = new Map([
    ["Broad City", 5],
    ["Community", 6],
]);

// 型：number
const knownValue = seasonCounts.get("I Love Lucy")!;

console.log(knownValue.toString()); // 型エラーはありませんが...
// Runtime TypeError: Cannot read properties of undefined (reading 'toString') 
// 実行時の型エラー：undefinedのプロパティを読み取れません（'toString' の読み取り）

// ======================================================================
interface Entertainer {
    acts: string[];
    name: string;
}

const declared: Entertainer = {
    name: "Moms Mabley",
};
// Error: Property 'acts' is missing in type
// '{ name: string; }' but required in type 'Entertainer'.
// プロパティ 'acts' は型 '{ name: string; }' にありませんが、
// 型 'Entertainer' では必須です。

const asserted = {
    name: "Moms Mabley",
} as Entertainer; // Okですが...

// 次の2つの文はどちらも、次のエラーメッセージとともに実行時に失敗します
// Runtime TypeError: Cannot read properties of undefined (reading 'join')
// 実行時の型エラー：undefinedのプロパティを読み取れません（'join' の読み取り）

console.log(declared.acts.join(", "));
console.log(asserted.acts.join(", "));

// ======================================================================
let myValue = "Stella!" as number;
//            ~~~~~~~~~~~~~~~~~~~
// Error: Conversion of type 'string' to type 'number'
// may be a mistake because neither type sufficiently
// overlaps with the other. If this was intentional,
// convert the expression to 'unknown' first.
// 型 'string' から型 'number' への変換は、互いに十分に
// 重複できないため間違っている可能性があります。意図的に
// そうする場合は、まず式を 'unknown' に変換してください。

// ======================================================================
let myValueDouble = "1337" as unknown as number; // Okですが...うわー！

// ======================================================================
// 型：(number | string)[]
[0, ''];

// 型：readonly [0, '']
[0, ''] as const;

// ======================================================================
// 型：() => string
const getName = () => "Maria Bamford";

// 型：() => "Maria Bamford"
const getNameConst = () => "Maria Bamford" as const;

// ======================================================================
interface Joke {
    quote: string;
    style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
    if (joke.style === "one-liner") {
        console.log(joke.quote);
    } else {
        console.log(joke.quote.split("\n"));
    }
}

// 型：{ quote: string; style: "one-liner" }
const narrowJoke = {
    quote: "If you stay alive for no other reason do it for spite.",
    style: "one-liner" as const,
};

tellJoke(narrowJoke); // Ok

// 型：{ quote: string; style: string }
const wideObject = {
    quote: "Time flies when you are anxious!",
    style: "one-liner",
};

tellJoke(wideObject);
// Error: Argument of type '{ quote: string; style: string; }'
// is not assignable to parameter of type 'Joke'.
//   Types of property 'style' are incompatible.
//     Type 'string' is not assignable to type '"story" | "one-liner"'.
// 型 '{ quote: string; style: string; }' の引数を
// 型 'Joke' のパラメーターに割り当てることはできません。
//   プロパティ 'style' の型に互換性がありません。
//     型 'string' を型 '"story" | "one-liner"' に割り当てることはできません。

// ======================================================================
function describePreference(preference: "maybe" | "no" | "yes") {
    switch (preference) {
        case "maybe":
            return "I suppose...";
        case "no":
            return "No thanks.";
        case "yes":
            return "Yes please!";
    }
}

// 型：{ movie: string, standup: string }
const preferencesMutable = {
    movie: "maybe",
    standup: "yes",
};

describePreference(preferencesMutable.movie);
//                 ~~~~~~~~~~~~~~~~~~~~~~~~
// Error: Argument of type 'string' is not assignable
// to parameter of type '"maybe" | "no" | "yes"'.
// 型 'string' の引数を型 '"maybe" | "no" | "yes"' のパラメーターに
// 割り当てることはできません。

preferencesMutable.movie = "no"; // Ok

// 型：readonly { readonly movie: "maybe", readonly standup: "yes" }
const preferencesReadonly = {
    movie: "maybe",
    standup: "yes",
} as const;

describePreference(preferencesReadonly.movie); // Ok

preferencesReadonly.movie = "no";
//                  ~~~~~
// Error: Cannot assign to 'movie' because it is a read-only property.
// 読み取り専用プロパティであるため、'movie' に代入することはできません。