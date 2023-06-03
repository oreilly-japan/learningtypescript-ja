// ======================================================================
let singer = "Aretha";

// ======================================================================
// 推論される型：string
let bestSong = Math.random() > 0.5
  ? "Chain of Fools"
  : "Respect";

// ======================================================================
let firstName = "Whitney";
firstName.length();
//        ~~~~~~
//  This expression is not callable.
//    Type 'Number' has no call signatures
//  この式は呼び出し可能ではありません。
//    型 'Number' には呼び出しシグネチャがありません。

// ======================================================================
let let wat;
//      ~~~
// Error: ',' expected.
// ',' が必要です。

// ======================================================================
console.blub("Nothing is worth more than laughter.");
//      ~~~~
// Error: Property 'blub' does not exist on type 'Console'.
// プロパティ 'blub' は型 'Console' に存在しません。

// ======================================================================
let firstName = "Carole";
firstName = "Joan";

// ======================================================================
let lastName = "King";
lastName = true;
// Error: Type 'boolean' is not assignable to type 'string'.
// 型 'boolean' を型 'string' に割り当てることはできません。

// ======================================================================
let rocker; // 型：any

rocker = "Joan Jett"; // 型：string
rocker.toUpperCase(); // Ok

rocker = 19.58; // 型：number
rocker.toPrecision(1); // Ok

rocker.toUpperCase();
//     ~~~~~~~~~~~
// Error: 'toUpperCase' does not exist on type 'number'.
// プロパティ 'toUpperCase' は型 'number' に存在しません。

// ======================================================================
let rocker: string;
rocker = "Joan Jett";

// ======================================================================
let rocker: string;
rocker = 19.58;
// Error: Type 'number' is not assignable to type 'string'.
// 型 'number' を型 'string' に割り当てることはできません。

// ======================================================================
let firstName: string = "Tina";
//           ~~~~~~~~ 型システムには何も変更を与えません...

// ======================================================================
let firstName: string = 42;
//  ~~~~~~~~~
// Error: Type 'number' is not assignable to type 'string'.
// 型 'number' を型 'string' に割り当てることはできません。

// ======================================================================
let rapper = "Queen Latifah";
rapper.length; // ok

// ======================================================================
rapper.push('!');
//     ~~~~
// Property 'push' does not exist on type 'string'.
// プロパティ 'push' は型 'string' に存在しません。

// ======================================================================
let cher = {
  firstName: "Cherilyn",
  lastName: "Sarkisian",
};

cher.middleName;
//   ~~~~~~~~~~
//   Property 'middleName' does not exist on type
//   '{ firstName: string; lastName: string; }'.
//   プロパティ 'middleName' は型 '{ firstName: string; lastName: string; }' 
//   に存在しません。

// ======================================================================
import { value } from "./values";

export const doubled = value * 2;

// ======================================================================
// a.ts
export const shared = "Cher";

// b.ts
export const shared = "Cher";

// c.ts
import { shared } from "./a";
//       ~~~~~~
// Error: Import declaration conflicts with local declaration of 'shared'.
// インポート宣言が、'shared' のローカル宣言と競合しています。

export const shared = "Cher";
//           ~~~~~~
// Error: Individual declarations in merged declaration
// 'shared' must be all exported or all local.
// マージされた宣言 'shared' の個々の宣言はすべてエクスポートされるか、
// すべてローカルであるかのどちらかである必要があります。

// ======================================================================
// a.ts
const shared = "Cher";
//    ~~~~~~
// Cannot redeclare block-scoped variable 'shared'.
// ブロック スコープの変数 'shared' を再宣言することはできません。

// b.ts
const shared = "Cher";
//    ~~~~~~
// Cannot redeclare block-scoped variable 'shared'.
// ブロック スコープの変数 'shared' を再宣言することはできません。

// ======================================================================
// a.ts および b.ts
const shared = "Cher"; // Ok

export {};