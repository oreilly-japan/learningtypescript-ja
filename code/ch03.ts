// ======================================================================
let mathematician = Math.random() > 0.5
    ? undefined
    : "Mark Goldberg";

// ======================================================================
let thinker: string | null = null;

if (Math.random() > 0.5) {
    thinker = "Susanne Langer"; // Ok
}

// ======================================================================
let physicist = Math.random() > 0.5
    ? "Marie Curie"
    : 84;

physicist.toString(); // Ok

physicist.toUpperCase();
//        ~~~~~~~~~~~
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
// プロパティ 'toUpperCase' は型 'string | number' に存在しません。
//   プロパティ 'toUpperCase' は型 'number' に存在しません。

physicist.toFixed();
//        ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string | number'.
//   Property 'toFixed' does not exist on type 'string'.
// プロパティ 'toFixed' は型 'string | number' に存在しません。
//   プロパティ 'toFixed' は型 'string' に存在しません。

// ======================================================================
let admiral: number | string;

admiral = "Grace Hopper";

admiral.toUpperCase(); // Ok: string

admiral.toFixed();
//      ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string'.
// プロパティ 'toFixed' は型 'string' に存在していません。

// ======================================================================
let inventor: number | string = "Hedy Lamarr";

inventor.toUpperCase(); // Ok: string

inventor.toFixed();
//       ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string'.
// プロパティ 'toFixed' は型 'string' に存在していません。

// ======================================================================
// scientistの型：number | string
let scientist = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;

if (scientist === "Rosalind Franklin") {
    // scientistの型：string
    scientist.toUpperCase(); // Ok
}

// scientistの型：number | string
scientist.toUpperCase();
//        ~~~~~~~~~~~
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
// プロパティ 'toUpperCase' は型 'string | number' に存在しません。
//   プロパティ 'toUpperCase' は型 'number' に存在しません。

// ======================================================================
let researcher = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;

if (typeof researcher === "string") {
    researcher.toUpperCase(); // Ok: string
}

// ======================================================================
if (!(typeof researcher === "string")) {
    researcher.toFixed(); // Ok: number
} else {
    researcher.toUpperCase(); // Ok: string
}

// ======================================================================
typeof researcher === "string"
    ? researcher.toUpperCase() // Ok: string
    : researcher.toFixed(); // Ok: number

// ======================================================================
const philosopher = "Hypatia";

// ======================================================================
let lifespan: number | "ongoing" | "uncertain";

lifespan = 89; // Ok
lifespan = "ongoing"; // Ok

lifespan = true;
// Error: Type 'true' is not assignable to
// type 'number | "ongoing" | "uncertain"'
// 型 'true' を型 'number | "ongoing" | "uncertain"' に
// 割り当てることはできません。

// ======================================================================
let specificallyAda: "Ada";

specificallyAda = "Ada"; // Ok

specificallyAda = "Byron";
// Error: Type '"Byron"' is not assignable to type '"Ada"'.
// 型 '"Byron"' を型 '"Ada"' に割り当てることはできません。

let someString = ""; // 型：string

specificallyAda = someString;
// Error: Type 'string' is not assignable to type '"Ada"'.
// 型 'string' を型 '"Ada"' に割り当てることはできません。

// ======================================================================
someString = ":)";

// ======================================================================
const firstName: string = null;

// ======================================================================
let nameMaybe = Math.random() > 0.5
    ? "Tony Hoare"
    : undefined;

nameMaybe.toLowerCase();
// 起こり得る実行時エラー：Cannot read property 'toLowerCase' of undefined.
// undefinedの 'toLowerCase' プロパティを読み取れません。

// ======================================================================
let nameMaybe = Math.random() > 0.5
    ? "Tony Hoare"
    : undefined;

nameMaybe.toLowerCase();
// Error: Object is possibly 'undefined'.
// オブジェクトは 'undefined' である可能性があります。

// ======================================================================
let geneticist = Math.random() > 0.5
    ? "Barbara McClintock"
    : undefined;

if (geneticist) {
    geneticist.toUpperCase(); // Ok: string
}

geneticist.toUpperCase();
// Error: 'geneticist' is possibly 'undefined'.
// 'geneticist' は 'undefined' の可能性があります。

// ======================================================================
geneticist && geneticist.toUpperCase(); // Ok: string | undefined
geneticist?.toUpperCase(); // Ok: string | undefined

// ======================================================================
let biologist = Math.random() > 0.5 && "Rachel Carson";

if (biologist) {
    biologist; // 型：string
} else {
    biologist; // 型：false | string
}

// ======================================================================
let mathematician: string;

mathematician?.length;
// Error: Variable 'mathematician' is used before being assigned.
// 変数 'mathematician' は割り当てられる前に使用されています。

mathematician = "Mark Goldberg";
mathematician.length; // Ok

// ======================================================================
let mathematician: string | undefined;

mathematician?.length; // Ok

mathematician = "Mark Goldberg";
mathematician.length; // Ok

// ======================================================================
let rawDataFirst: boolean | number | string | null | undefined;
let rawDataSecond: boolean | number | string | null | undefined;
let rawDataThird: boolean | number | string | null | undefined;

// ======================================================================
type MyName = ...;

// ======================================================================
type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;

// ======================================================================
type SomeType = string | undefined;

console.log(SomeType);
//          ~~~~~~~~
// Error: 'SomeType' only refers to a type, but is being used as a value here.
// 'SomeType' は型のみを指しますが、ここで値として使用されています。

// ======================================================================
type Id = number | string;

// number | string | undefined | null と同じ
type IdMaybe = Id | undefined | null;

// ======================================================================
type IdMaybe = Id | undefined | null; // Ok
type Id = number | string;