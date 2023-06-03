// ======================================================================
const warriors = ["Artemisia", "Boudica"];

// Ok: "Zenobia"はstringなので
warriors.push("Zenobia");

warriors.push(true);
//            ~~~~
// Argument of type 'boolean' is not assignable to parameter of type 'string'.
// 型 'boolean' の引数を型 'string' のパラメーターに割り当てることはできません。

// ======================================================================
let arrayOfNumbers: number[];

arrayOfNumbers = [4, 8, 15, 16, 23, 42];

// ======================================================================
// 型は、stringの配列を返す関数
let createStrings: () => string[];

// 型は、それぞれがstringを返す関数の配列
let stringCreators: (() => string)[];

// ======================================================================
// 型は、numberの配列またはstring
let stringOrArrayOfNumbers: string | number[];

// 型は、それぞれがstringまたはnumberである要素の配列
let arrayOfStringOrNumbers: (string | number)[];

// ======================================================================
// 型は (string | undefined)[]
const namesMaybe = [
  "Aqualtune",
  "Blenda",
  undefined,
];

// ======================================================================
// 型：any[]
let values = [];

// 型：string[]
values.push('');

// 型：(number | string)[]
values[0] = 0;

// ======================================================================
let arrayOfArraysOfNumbers: number[][];

arrayOfArraysOfNumbers = [
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9],
];

// ======================================================================
// 型：number[][]
let arrayOfArraysOfNumbers: (number[])[];

// ======================================================================
const defenders = ["Clarenza", "Dina"];

// 型：string
const defender = defenders[0];

// ======================================================================
const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];

// 型：string | Date
const soldierOrDate = soldiersOrDates[0];

// ======================================================================
function withElements(elements: string[]) {
  console.log(elements[9001].length); // 型エラーはなし
}

withElements(["It's", "over"]);

// ======================================================================
const chomiryo = ["砂糖", "塩", "酢", "醤油", "味噌"];

// 先頭の要素にアクセス
chomiryo[0]; // "砂糖"
chomiryo.at(0);  // "砂糖"

// 末尾の要素にアクセス
chomiryo[chomiryo.length - 1]; // "味噌"
chomiryo.at(-1); // "味噌"

// 後ろから2番目の要素にアクセス
chomiryo[chomiryo.length - 2]; // "醤油"
chomiryo.at(-2); // "醤油"

// ======================================================================
// 型：string[]
const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];

// 型：number[]
const soldierAges = [90, 19, 45];

// 型：(string | number)[]
const conjoined = [...soldiers, ...soldierAges];

// ======================================================================
function logWarriors(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

const warriors = ["Cathay Williams", "Lozen", "Nzinga"];

logWarriors("Hello", ...warriors);

const birthYears = [1844, 1840, 1583];

logWarriors("Born in", ...birthYears);
//                     ~~~~~~~~~~~~~
// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'.
// 型 'number' の引数を型 'string' のパラメーターに割り当てることはできません。

// ======================================================================
let yearAndWarrior: [number, string];

yearAndWarrior = [530, "Tomyris"]; // Ok

yearAndWarrior = [false, "Tomyris"];
//                ~~~~~
// Error: Type 'boolean' is not assignable to type 'number'.
// 型 'boolean' を型 'number' に割り当てることはできません。

yearAndWarrior = [530];
// Error: Type '[number]' is not assignable to type '[number, string]'.
//   Source has 1 element(s) but target requires 2.
// 型 '[number]' を型 '[number, string]' に割り当てることはできません。
//   ソースには 1 個の要素が含まれていますが、ターゲットには 2 個が必要です。

// ======================================================================
// year 型：number
// warrior 型：string
let [year, warrior] = Math.random() > 0.5
  ? [340, "Archidamia"]
  : [1828, "Rani of Jhansi"];

// ======================================================================
// 型：(boolean | number)[]
const pairLoose = [false, 123];

const pairTupleLoose: [boolean, number] = pairLoose;
//    ~~~~~~~~~~~~~~
// Error: Type '(number | boolean)[]' is not
// assignable to type '[boolean, number]'.
//   Target requires 2 element(s) but source may have fewer.
// 型 '(number | boolean)[]' を型 '[boolean, number]' に
// 割り当てることはできません。
//   ターゲットには 2 個の要素が必要ですが、ソースの要素の数は
//   それより少ないかもしれません。@<fn>{fnj06-2620-message}

// ======================================================================
const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];

const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];

const tupleTwoExtra: [boolean, number] = tupleThree;
//    ~~~~~~~~~~~~~
// Error: Type '[boolean, number, string]' is
// not assignable to type '[boolean, number]'.
//   Source has 3 element(s) but target allows only 2.
// 型 '[boolean, number, string]' を型 '[boolean, number]' に
// 割り当てることはできません。
//   ソースには 3 個の要素がありますが、ターゲットで使用できるのは
//   2 個のみです。

// ======================================================================
function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}

const pairArray = ["Amage", 1];

logPair(...pairArray);
// Error: A spread argument must either have a
// tuple type or be passed to a rest parameter.
// spread 引数には、タプルを指定するか、rest パラメーターに渡す
// 必要があります。@<fn>{fnj0602}

const pairTupleIncorrect: [number, string] = [1, "Amage"];

logPair(...pairTupleIncorrect);
// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'.
// 型 'number' の引数を型 'string' のパラメーターに割り当てることはできません。

const pairTupleCorrect: [string, number] = ["Amage", 1];

logPair(...pairTupleCorrect); // Ok

// ======================================================================
function logTrio(name: string, value: [number, boolean]) {
  console.log(`${name} has ${value[0]} (${value[1]})`);
}

const trios: [string, [number, boolean]][] = [
  ["Amanitore", [1, true]],
  ["Æthelflæd", [2, false]],
  ["Ann E. Dunwoody", [3, false]]
];

trios.forEach(trio => logTrio(...trio)); // Ok

trios.forEach(logTrio);
//            ~~~~~~~
// Argument of type '(name: string, value: [number, boolean]) => void'
// is not assignable to parameter of type
// '(value: [string, [number, boolean]], ...) => void'.
//   Types of parameters 'name' and 'value' are incompatible.
//     Type '[string, [number, boolean]]' is not assignable to type 'string'.
// 型 '(name: string, value: [number, boolean]) => void' の引数を
// 型 '(value: [string, [number, boolean]], ...) => void' の
// パラメーターに割り当てることはできません。
//   パラメーター 'name' および 'value' は型に互換性がありません。
//     型 '[string, [number, boolean]]' を型 'string' に割り当てる
//     ことはできません。

// ======================================================================
// 戻り値の型：(string | number)[]
function firstCharAndSize(input: string) {
  return [input[0], input.length];
}

// firstChar 型：string | number
// size 型：string | number
const [firstChar, size] = firstCharAndSize("Gudit");

// ======================================================================
// 戻り値の型：[string, number]
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}

// firstChar 型：string
// size 型：number
const [firstChar, size] = firstCharAndSizeExplicit("Cathay Williams");

// ======================================================================
// 型：(string | number)[]
const unionArray = [1157, "Tomoe"];

// 型：readonly [1157, "Tomoe"]
const readonlyTuple = [1157, "Tomoe"] as const;

// ======================================================================
const pairMutable: [number, string] = [1157, "Tomoe"];
pairMutable[0] = 1247; // Ok

const pairAlsoMutable: [number, string] = [1157, "Tomoe"] as const;
//    ~~~~~~~~~~~~~~~
// Error: The type 'readonly [1157, "Tomoe"]' is 'readonly'
// and cannot be assigned to the mutable type '[number, string]'.
// 型 'readonly [1157, "Tomoe"]' は 'readonly' であるため、
// 変更可能な型 '[number, string]' に代入することはできません。

const pairConst = [1157, "Tomoe"] as const;
pairConst[0] = 1247;
//        ~
// Error: Cannot assign to '0' because it is a read-only property.
// 読み取り専用プロパティであるため、'0' に代入することはできません。

// ======================================================================
// 戻り値の型：readonly [string, number]
function firstCharAndSizeAsConst(input: string) {
  return [input[0], input.length] as const;
}

// firstChar 型：string
// size 型：number
const [firstChar, size] = firstCharAndSizeAsConst("Ching Shih");