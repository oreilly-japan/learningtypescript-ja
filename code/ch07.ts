// ======================================================================
type Poet = {
  born: number;
  name: string;
};

// ======================================================================
interface Poet {
  born: number;
  name: string;
}

// ======================================================================
let valueLater: Poet;

// Ok
valueLater = {
  born: 1935,
  name: 'Sara Teasdale',
};

valueLater = "Emily Dickinson";
// Error: Type 'string' is not assignable to type 'Poet'.
// 型 'string' を型 'Poet' に割り当てることはできません。

valueLater = {
  born: true,
  // Error: Type 'boolean' is not assignable to type 'number'.
  // 型 'boolean' を型 'number' に割り当てることはできません。
  name: 'Sappho'
};

// ======================================================================
interface Book {
  author?: string;
  pages: number;
};

// Ok
const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

const missing: Book = {
    author: "Rita Dove",
};
// Error: Property 'pages' is missing in type
// '{ author: string; }' but required in type 'Book'.
// プロパティ 'pages' は型 '{ author: string; }' にありませんが、
// 型 'Book' では必須です。

// ======================================================================
interface Page {
    readonly text: string;
}

function read(page: Page) {
    // Ok: textプロパティの読み取りは、それを変更しようとはしないので
    console.log(page.text);

    page.text += "!";
    //   ~~~~
    // Error: Cannot assign to 'text' because it is a read-only property.
    // 読み取り専用プロパティであるため、'text' に代入することはできません。
}

// ======================================================================
const pageIsh = {
  text: "Hello, world!",
};

// Ok: pageIshはPage型ではなく、書き込み可能なtextプロパティを持つ
// オブジェクト型と推論されます
pageIsh.text += "!";

// Ok: pageIshの型はPage型の要件を満たすため、
// readはpageIshを受け取れます
read(pageIsh);

// ======================================================================
interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}

const hasBoth: HasBothFunctionTypes = {
  property: () => "",
  method() {
    return "";
  }
};

hasBoth.property(); // Ok
hasBoth.method(); // Ok

// ======================================================================
interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}

// ======================================================================
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

// 型：(input: string) => number
const typedFunctionAlias: FunctionAlias = (input) => input.length; // Ok

// 型：(input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // Ok

// ======================================================================
interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1;
  console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}

keepsTrackOfCalls.count = 0;

hasCallCount = keepsTrackOfCalls; // Ok

function doesNotHaveCount() {
  console.log("No idea!");
}

hasCallCount = doesNotHaveCount;
// Error: Property 'count' is missing in type
// '() => void' but required in type 'FunctionWithCalls'
// プロパティ 'count' は型 '() => void' にありませんが、
// 型 'FunctionWithCount' では必須です。

// ======================================================================
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0; // Ok
counts.banana = 1; // Ok

counts.cherry = false;
// Error: Type 'boolean' is not assignable to type 'number'.
// 型 'boolean' を型 'number' に割り当てることはできません。

// ======================================================================
interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 型：Date
console.log(publishDates.Frankenstein.toString()); // Ok

publishDates.Beloved; // 型：Date、しかし実行時の値はundefined！
console.log(publishDates.Beloved.toString()); // 型システムではOkだが...
// Runtime error: Cannot read properties of undefined (reading 'toString')
// 実行時エラー：undefinedのプロパティを読み取れません（'toString' の読み取り）

// ======================================================================
interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

// Ok
const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688,
};

const missingOroonoko: HistoricalNovels = {
  Outlander: 1991,
};
// Error: Property 'Oroonoko' is missing in type
// '{ Outlander: number; }' but required in type 'HistoricalNovels'.
// プロパティ 'Oroonoko' は型 '{ Outlander: number; }' にありませんが、
// 型 'HistoricalNovels' では必須です。

// ======================================================================
interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5
};

const wrongPreface: ChapterStarts = {
  preface: 1,
  // Error: Type '1' is not assignable to type '0'.
  // 型 '1' を型 '0' に割り当てることはできません。
};

// ======================================================================
// Ok
interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}

// Ok
const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: '',
  key1: '',
  key2: undefined,
}

interface MoreNarrowStrings {
  [i: number]: string | undefined;
  // Error: 'number' index type 'string | undefined'
  // is not assignable to 'string' index type 'string'.
  // 'number'インデックス型'string | undefined' を 
  // 'string'インデックス型'string' に割り当てることはできません。
  [i: string]: string;
}

// ======================================================================
interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;

// Ok
myNovel = {
    author: {
        name: 'Jane Austen',
    },
    setting: {
        place: 'England',
        year: 1812,
    }
};

myNovel = {
    author: {
        name: 'Emily Brontë',
    },
    setting: {
        place: 'West Yorkshire',
    },
    // Error: Property 'year' is missing in type
    // '{ place: string; }' but required in type 'Setting'.
    // プロパティ 'year' は型 '{ place: string; }' にありませんが、
    // 型 'Setting' では必須です。
};

// ======================================================================
interface Writing {
    title: string;
}

interface Novella extends Writing {
    pages: number;
}

// Ok
let myNovella: Novella = {
    pages: 195,
    title: "Ethan Frome",
};

let missingPages: Novella = {
 // ~~~~~~~~~~~~
 // Error: Property 'pages' is missing in type
 // '{ title: string; }' but required in type 'Novella'.
 // プロパティ 'pages' は型 '{ title: string; }' にありませんが、
 // 型 'Novella' では必須です。
    title: "The Awakening",
}

let extraProperty: Novella = {
    pages: 300,
    strategy: "baseline",
    // Error: Type '{ pages: number; strategy: string; style: string; }' 
    // is not assignable to type 'Novella'.
    //   Object literal may only specify known properties, 
    //   and 'strategy' does not exist in type 'Novella'.
    // 型 '{ pages: number; strategy: string; style: string; }' を
    // 型 'Novella' に割り当てることはできません。
    //   オブジェクト リテラルは既知のプロパティのみ指定できます。'strategy' は
    //   型 'Novella' に存在しません。
    style: "Naturalism"
};

// ======================================================================
interface WithNullableName {
    name: string | null;
}

interface WithNonNullableName extends WithNullableName {
    name: string;
}

interface WithNumericName extends WithNullableName {
    name: number | string;
}
// Error: Interface 'WithNumericName' incorrectly
// extends interface 'WithNullableName'.
//   Types of property 'name' are incompatible.
//     Type 'string | number' is not assignable to type 'string | null'.
//       Type 'number' is not assignable to type 'string'.
// インターフェイス 'WithNumericName' はインターフェイス 'WithNullableName' を
// 正しく拡張していません。
//   プロパティ 'name' の型に互換性がありません。
//     型 'string | number' を型 'string | null' に割り当てることはできません。
//       型 'number' を型 'string' に割り当てることはできません。

// ======================================================================
interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveEither(); // 型：number | string
  instance.giveNumber(); // 型：number
  instance.giveString(); // 型：string
}

// ======================================================================
interface Merged {
  fromFirst: string;
}

interface Merged {
  fromSecond: number;
}

// これは次と同じ
// interface Merged {
//   fromFirst: string;
//   fromSecond: number;
// }

// ======================================================================
interface Window {
  myEnvironmentVariable: string;
}

window.myEnvironmentVariable; // 型：string

// ======================================================================
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string; // Ok

  different: (input: number) => string;
  // Error: Subsequent property declarations must have the same type.
  // Property 'different' must be of type '(input: string) => string',
  // but here has type '(input: number) => string'.
  // 後続のプロパティ宣言は同じ型でなければなりません。プロパティ 
  // 'different' の型は '(input: string) => string' である必要がありますが、
  // ここでは型が '(input: number) => string' になっています。
}

// ======================================================================
interface MergedMethods {
  different(input: string): string;
}

interface MergedMethods {
  different(input: number): string; // Ok
}