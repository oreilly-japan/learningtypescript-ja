// ======================================================================
const identity = <T>(input: T) => input;
//               ~~~
// Error: JSX element 'T' has no corresponding closing tag.
// JSX 要素 'T' には対応する終了タグがありません。

// ======================================================================
const identity = <T = unknown>(input: T) => input; // Ok

// ======================================================================
// usesActivist.ts
import { activist } from "./activist.json";

// "Mary Astell" が出力されます
console.log(activist);

// ======================================================================
// useActivist.ts
import data from "./activist.json";

// ======================================================================
// useActivists.ts
import * as activists from "./activists.json";

// "3 activists" と出力されます
console.log(`${activists.length} activists`);

// ======================================================================
function defaultNameAndLog(nameMaybe: string | undefined) {
  const name = nameMaybe ?? "anonymous";
  console.log("From", nameMaybe, "to", name);
  return name;
}

// ======================================================================
const value = "a b c";

value.replaceAll(" ", ", ");
// Uncaught TypeError: value.replaceAll is not a function
// 捕捉されない型エラー：value.replaceAllは関数ではありません

// ======================================================================
const logMessage = (message) => {
  //                ~~~~~~~
  // Error: Parameter 'message' implicitly has an 'any' type.
  // パラメーター 'message' の型は暗黙的に 'any' になります。
  console.log(`Message: ${message}!`);
};

// ======================================================================
const logMessage = (message: string) => { // Ok
  console.log(`Message: ${message}!`);
}

// ======================================================================
type LogsMessage = (message: string) => void;

const logMessage: LogsMessage = (message) => { // Ok
  console.log(`Message: ${message}!`);
}

// ======================================================================
function getLength(text: string, trim?: boolean) {
  return trim ? text.trim().length : text.length;
}

// 関数の型：(thisArg: Function, argArray?: any) => any
getLength.apply;

// 戻り値の型：any
getLength.bind(undefined, "abc123");

// 戻り値の型：any
getLength.call(undefined, "abc123", true);

// ======================================================================
function getLength(text: string, trim?: boolean) {
  return trim ? text.trim().length : text.length;
}

// 関数の型：
// (thisArg: typeof getLength, args: [text: string, trim?: boolean]) => number;
getLength.apply;

// 戻り値の型：(trim?: boolean) => number
getLength.bind(undefined, "abc123");

// 戻り値の型：number
getLength.call(undefined, "abc123", true);

// ======================================================================
function checkOnNumber(containsA: (input: number | string) => boolean) {
  return containsA(1337);
}

function stringContainsA(input: string) {
  return !!input.match(/a/i);
}

checkOnNumber(stringContainsA);

// ======================================================================
// Argument of type '(input: string) => boolean' is not assignable
// to parameter of type '(input: string | number) => boolean'.
//   Types of parameters 'input' and 'input' are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
// 型 '(input: string) => boolean' の引数を
// 型 '(input: string | number) => boolean' のパラメーターに
// 割り当てることはできません。
//   パラメーター 'input' および 'input' は型に互換性がありません。
//     型 'string | number' を型 'string' に割り当てることはできません。
//       型 'number' を型 'string' に割り当てることはできません。
checkOnNumber(stringContainsA);

// ======================================================================
let value: string;

value = "abc123"; // 常にok

value = null;
// strictNullChecksが有効な場合：
// Error: Type 'null' is not assignable to type 'string'.
// 型 'null' を型 'string' に割り当てることはできません。

// ======================================================================
try {
  someExternalFunction();
} catch (error) {
  error; // デフォルトの型：any
}

// ======================================================================
try {
  someExternalFunction();
} catch (error: unknown) {
  error; // 型：unknown
}

// ======================================================================
import { value } from "my-example-lib";

export const logValue = () => console.log(value);

// ======================================================================
const my_example_lib = require("my-example-lib");
exports.logValue = () => console.log(my_example_lib.value);

// ======================================================================
import React from "react";
//     ~~~~~
// Module '"file:///node_modules/@types/react/index"' can
// only be default-imported using the 'esModuleInterop' flag.
// モジュール '"file:///node_modules/@types/react/index"' は、
// 'esModuleInterop' フラグを使用した場合のみ、デフォルトインポートできます@<fn>{fnj13-esModuleInterop-message}

// ======================================================================
import React from "react";
// Module '"file:///node_modules/@types/react/index"' can only be
// default-imported using the 'allowSyntheticDefaultImports' flag`.
// モジュール '"file:///node_modules/@types/react/index"' は、
// 'allowSyntheticDefaultImports' フラグを使用した場合のみ、デフォルトインポートできます@<fn>{fnj13-allowSyntheticDefaultImports-message}

// ======================================================================
// index.ts
import { value } from "./values";

console.log(`Quote: '${value.toUpperCase()}'`);

// values.js
export const value = "We cannot succeed when half of us are held back.";

// ======================================================================
// index.js
let myQuote = "Each person must live their life as a model for others.";

console.log(myquote);
//          ~~~~~~~
// Error: Cannot find name 'myquote'. Did you mean 'myQuote'?
// 'myquote' という名前は見つかりません。'myQuote' ですか?

// ======================================================================
// index.js
// @ts-check
let myQuote = "Each person must live their life as a model for others.";

console.log(myquote);
//          ~~~~~~~
// Error: Cannot find name 'myquote'. Did you mean 'myQuote'?
// 'myquote' という名前は見つかりません。'myQuote' ですか?

// ======================================================================
// index.js

/**
 * @param {string} text
 */
function sentenceCase(text) {
    return `${text[0].toUpperCase()} ${text.slice(1)}.`;
}

sentenceCase("hello world");// Ok

sentenceCase(["hello", "world"]);
//           ~~~~~~~~~~~~~~~~~~
// Error: Argument of type 'string[]' is not
// assignable to parameter of type 'string'.
// 型 'string[]' の引数を型 'string' のパラメーターに
// 割り当てることはできません。