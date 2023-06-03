// ======================================================================
const poet = {
    born: 1935,
    name: "Mary Oliver",
};

poet['born']; // 型：number
poet.name; // 型：string

poet.end;
//   ~~~
// Error: Property 'end' does not exist on
// type '{ born: number; name: string; }'.
// プロパティ 'end' は型 '{ born: number; name: string; }' に存在しません。

// ======================================================================
let poetLater: {
    born: number;
    name: string;
};

// Ok
poetLater = {
    born: 1935,
    name: "Mary Oliver",
};

poetLater = "Sappho";
// Error: Type 'string' is not assignable to
// type '{ born: number; name: string; }'
// 型 'string' を型 '{ born: number; name: string; }' に
// 割り当てることはできません。

// ======================================================================
type Poet = {
    born: number;
    name: string;
};

let poetLater: Poet;

// Ok
poetLater = {
    born: 1935,
    name: "Sara Teasdale",
};

poetLater = "Emily Dickinson";
// Error: Type 'string' is not assignable to type 'Poet'.
// 型 'string' を型 'Poet' に割り当てることはできません。

// ======================================================================
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

// Ok: hasBothは、string型のfirstNameプロパティを含んでいるので
let withFirstName: WithFirstName = hasBoth;

// Ok: hasBothは、string型のlastNameプロパティを含んでいるので
let withLastName: WithLastName = hasBoth;

// ======================================================================
type FirstAndLastNames = {
  first: string;
  last: string;
};

// Ok
const hasBoth: FirstAndLastNames = {
  first: "Sarojini",
  last: "Naidu",
};

const hasOnlyOne: FirstAndLastNames = {
  first: "Sappho"
};
// Property 'last' is missing in type '{ first: string; }'
// but required in type 'FirstAndLastNames'.
// プロパティ 'last' は型 '{ first: string; }' にありませんが、
// 型 'FirstAndLastNames' では必須です。

// ======================================================================
type TimeRange = {
  start: Date;
};

const hasStartString: TimeRange = {
  start: "1879-02-13",
  // Error: Type 'string' is not assignable to type 'Date'.
  // 型 'string' を型 'Date' に割り当てることはできません。
};

// ======================================================================
type Poet = {
    born: number;
    name: string;
}

// Ok: すべてのフィールドが、Poetで期待されるものと一致しているので
const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou"
};

const extraProperty: Poet = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};
// Error: Type '{ activity: string; born: number; name: string; }'
// is not assignable to type 'Poet'.
//   Object literal may only specify known properties,
//   and 'activity' does not exist in type 'Poet'.
// 型 '{ activity: string; born: number; name: string; }' を
// 型 'Poet' に割り当てることはできません。
//   オブジェクト リテラルは既知のプロパティのみ指定できます。'activity' は
//   型 'Poet' に存在しません。

// ======================================================================
// Ok: すべてのフィールドが、Poetで期待されるものと一致しているので
const poetMatch = {
    born: 1928,
    name: "Maya Angelou"
} satisfies Poet;

const extraProperty = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
} satisfies Poet;
// Error: Type '{ activity: string; born: number; name: string; }'
// does not satisfy the expected type 'Poet'.
//   Object literal may only specify known properties,
//   and 'activity' does not exist in type 'Poet'.
// 型 '{ activity: string; born: number; name: string; }' は
// 想定された型 'Poet' を満たしていません。
//   オブジェクト リテラルは既知のプロパティのみ指定できます。'activity' は
//   型 'Poet' に存在しません。

// ======================================================================
type Ingredient = {
    name: string;
    amount: string | number;
};

// '{ name: string; amount: string; }'型と推論される
const soySauce = {
    name: '醤油',
    amount: '大さじ1'
};

// '{ name: string; amount: string; }'型と推論される
const soySauceWithSatisfies = {
    name: '醤油',
    amount: '大さじ1'
} satisfies Ingredient;

// 型アノテーションにより'{ name: string; amount: string | number; }'型が強制される
const soySauceWithTypeAnnotation: Ingredient = {
    name: '醤油',
    amount: '大さじ1'
};

soySauce.amount.length; // Ok
soySauceWithSatisfies.amount.length; // Ok
soySauceWithTypeAnnotation.amount.length;
// Error: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// プロパティ 'length' は型 'string | number' に存在しません。
//   プロパティ 'length' は型 'number' に存在しません。

// ======================================================================
const existingObject = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};

const extraPropertyButOk: Poet = existingObject; // Ok

// ======================================================================
type Poem = {
    author: {
        firstName: string;
        lastName: string;
    };
    name: string;
};

// Ok
const poemMatch: Poem = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};

const poemMismatch: Poem = {
    author: {
        name: "Sylvia Plath",
    },
    // Error: Type '{ name: string; }' is not assignable
    // to type '{ firstName: string; lastName: string; }'.
    //   Object literal may only specify known properties, and 'name'
    //   does not exist in type '{ firstName: string; lastName: string; }'.
    // 型 '{ name: string; }' を型 '{ firstName: string; lastName: string; }' 
    // に割り当てることはできません。
    //   オブジェクト リテラルは既知のプロパティのみ指定できます。'name' は
    //   型 '{ firstName: string; lastName: string; }' に存在しません。
    name: "Tulips",
};

// ======================================================================
type Author = {
    firstName: string;
    lastName: string;
};

type Poem = {
    author: Author;
    name: string;
};

const poemMismatch: Poem = {
    author: {
        name: "Sylvia Plath",
    },
    // Error: Type '{ name: string; }' is not assignable to type 'Author'.
    //   Object literal may only specify known properties,
    //   and 'name' does not exist in type 'Author'.
    // 型 '{ name: string; }' を型 'Author' に割り当てることはできません。
    //   オブジェクト リテラルは既知のプロパティのみ指定できます。'name' は
    //   型 'Author' に存在しません。
    name: "Tulips",
};

// ======================================================================
type Book = {
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
type Writers = {
  author: string | undefined;
  editor?: string;
};

// Ok: authorがundefinedとして与えられているので
const hasRequired: Writers = {
  author: undefined,
};

const missingRequired: Writers = {};
//    ~~~~~~~~~~~~~~~
// Error: Property 'author' is missing in type
// '{}' but required in type 'Writers'.
// プロパティ 'author' は型 '{}' にありませんが、型 'Writers' では必須です。

// ======================================================================
const poem = Math.random() > 0.5
  ? { name: "The Double Image", pages: 7 }
  : { name: "Her Kind", rhymes: true };
// 型：
// {
//   name: string;
//   pages: number;
//   rhymes?: undefined;
// }
// |
// {
//   name: string;
//   pages?: undefined;
//   rhymes: boolean;
// }

poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // boolean | undefined

// ======================================================================
type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem = Math.random() > 0.5
  ? { name: "The Double Image", pages: 7 }
  : { name: "Her Kind", rhymes: true };

poem.name; // Ok

poem.pages;
//   ~~~~~
// Property 'pages' does not exist on type 'Poem'.
//   Property 'pages' does not exist on type 'PoemWithRhymes'.
// プロパティ 'pages' は型 'Poem' に存在しません。
//   プロパティ 'pages' は型 'PoemWithRhymes' に存在しません。

poem.rhymes;
//   ~~~~~~
// Property 'rhymes' does not exist on type 'Poem'.
//   Property 'rhymes' does not exist on type 'PoemWithPages'.
// プロパティ 'rhymes' は型 'Poem' に存在しません。
//   プロパティ 'rhymes' は型 'PoemWithPages' に存在しません。

// ======================================================================
if ("pages" in poem) {
    poem.pages; // Ok: poemがPoemWithPagesに絞り込まれるので
} else {
    poem.rhymes; // Ok: poemがPoemWithRhymesに絞り込まれるので
}

// ======================================================================
if (poem.pages) { /* ... */ }
//       ~~~~~
// Property 'pages' does not exist on type 'Poem'.
//   Property 'pages' does not exist on type 'PoemWithRhymes'.
// プロパティ 'pages' は型 'Poem' に存在しません。
//   プロパティ 'pages' は型 'PoemWithRhymes' に存在しません。

// ======================================================================
type PoemWithPages = {
    name: string;
    pages: number;
    type: 'pages';
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
    type: 'rhymes';
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem = Math.random() > 0.5
  ? { name: "The Double Image", pages: 7, type: "pages" }
  : { name: "Her Kind", rhymes: true, type: "rhymes" };

if (poem.type === "pages") {
    console.log(`It's got pages: ${poem.pages}`); // Ok
} else {
    console.log(`It rhymes: ${poem.rhymes}`);
}

poem.type; // 型：'pages' | 'rhymes'

poem.pages;
//   ~~~~~
// Error: Property 'pages' does not exist on type 'Poem'.
//   Property 'pages' does not exist on type 'PoemWithRhymes'.
// プロパティ 'pages' は型 'Poem' に存在しません。
//   プロパティ 'pages' は型 'PoemWithRhymes' に存在しません。

// ======================================================================
type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork & Writing;
// これは次と同じ
// {
//   genre: string;
//   name: string;
//   pages: number;
// }

// ======================================================================
type ShortPoem = { author: string } & (
    | { kigo: string; type: "haiku"; }
    | { meter: number; type: "villanelle"; }
);

// Ok
const morningGlory: ShortPoem = {
    author: "Fukuda Chiyo-ni",
    kigo: "Morning Glory",
    type: "haiku",
};

const oneArt: ShortPoem = {
    author: "Elizabeth Bishop",
    type: "villanelle",
};
// Error: Type '{ author: string; type: "villanelle"; }'
// is not assignable to type 'ShortPoem'.
//   Type '{ author: string; type: "villanelle"; }' is not assignable to
//   type '{ author: string; } & { meter: number; type: "villanelle"; }'.
//     Property 'meter' is missing in type '{ author: string; type: "villanelle"; }'
//     but required in type '{ meter: number; type: "villanelle"; }'.
// 型 '{ author: string; type: "villanelle"; }' を型 'ShortPoem' に
// 割り当てることはできません。
//   型 '{ author: string; type: "villanelle"; }' を型 '{ author: string; } & 
//   { meter: number; type: "villanelle"; }' に割り当てることはできません。
//     プロパティ 'meter' は型 '{ author: string; type: "villanelle"; }' に
//     ありませんが、型 '{ meter: number; type: "villanelle"; }' では必須です。

// ======================================================================
type ShortPoemBase = { author: string };
type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
type ShortPoem = Haiku | Villanelle;

const oneArt: ShortPoem = {
    author: "Elizabeth Bishop",
    type: "villanelle",
};
// Type '{ author: string; type: "villanelle"; }'
// is not assignable to type 'ShortPoem'.
//   Type '{ author: string; type: "villanelle"; }'
//   is not assignable to type 'Villanelle'.
//     Property 'meter' is missing in type
//     '{ author: string; type: "villanelle"; }'
//     but required in type '{ meter: number; type: "villanelle"; }'.
// 型 '{ author: string; type: "villanelle"; }' を型 'ShortPoem' に
// 割り当てることはできません。
//   型 '{ author: string; type: "villanelle"; }' を型 'Villanelle' に
//   割り当てることはできません。
//     プロパティ 'meter' は型 '{ author: string; type: "villanelle"; }' に
//     ありませんが、型 '{ meter: number; type: "villanelle"; }' では必須です。

// ======================================================================
type NotPossible = number & string;
// 型：never

// ======================================================================
let notNumber: NotPossible = 0;
//  ~~~~~~~~~
// Error: Type 'number' is not assignable to type 'never'.
// 型 'number' を型 'never' に割り当てることはできません。

let notString: never = "";
//  ~~~~~~~~~
// Error: Type 'string' is not assignable to type 'never'.
// 型 'string' を型 'never' に割り当てることはできません。