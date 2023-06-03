// ======================================================================
// types.d.ts
export interface Character {
    catchphrase?: string;
    name: string;
}

// index.ts
import { Character } from "./types";

export const character: Character = {
    catchphrase: "Yee-haw!",
    name: "Sandy Cheeks",
};

// ======================================================================
// types.d.ts
declare let declared: string; // Ok

declare let initializer: string = "Wanda";
//                                ~~~~~~~
// Error: Initializers are not allowed in ambient contexts.
// 初期化子は環境コンテキストでは使用できません。

// ======================================================================
// fairies.d.ts
declare function canGrantWish(wish: string): boolean; // Ok

declare function grantWish(wish: string) { return true; }
//                                       ~
// Error: An implementation cannot be declared in ambient contexts.
// 実装は環境コンテキストでは宣言できません。

class Fairy {
    canGrantWish(wish: string): boolean; // Ok

    grantWish(wish: string) {
        //                  ~
        // Error: An implementation cannot be declared in ambient contexts.
        // 実装は環境コンテキストでは宣言できません。
        return true;
    }
}

// ======================================================================
// index.ts
declare const myGlobalValue: string;

console.log(myGlobalValue); // Ok

// ======================================================================
// index.d.ts
interface Writer {} // Ok
declare interface Writer {} // Ok

declare const fullName: string; // Ok: 型はプリミティブのstring
declare const firstName: "Liz"; // Ok: 型はリテラルの"Liz"

const lastName = "Lemon";
// Error: Top-level declarations in .d.ts files must
// start with either a 'declare' or 'export' modifier.
// .d.ts ファイルのトップレベルの宣言は、'declare' または 
// 'export' 修飾子で始める必要があります。

// ======================================================================
// globals.d.ts
declare const version: string;

// version.ts
export function logVersion() {
    console.log(`Version: ${version}`); // Ok
}

// ======================================================================
// types/window.d.ts
interface Window {
    myVersion: string;
}

// index.ts
export function logWindowVersion() {
    console.log(`Window version is: ${window.myVersion}`);
    window.alert("Built-in window types still work! Hooray!")
}

// ======================================================================
// types.d.ts
// （モジュールコンテキスト）

declare global {
    // （グローバルコンテキスト）
}

// （モジュールコンテキスト）

// ======================================================================
// types/data.d.ts
export interface Data {
    version: string;
}

// ======================================================================
// types/globals.d.ts
import { Data } from "./data";

declare global {
    const globallyDeclared: Data;
}

declare const locallyDeclared: Data;

// ======================================================================
// index.ts
import { Data } from "./types/data";

function logData(data: Data) { // Ok
    console.log(`Data version is: ${data.version}`);
}

logData(globallyDeclared); // Ok

logData(locallyDeclared);
//      ~~~~~~~~~~~~~~~
// Error: Cannot find name 'locallyDeclared'.
// 'locallyDeclared' という名前は見つかりません。

// ======================================================================
// lib.es5.d.ts

interface Array<T> {
    /**
     * Gets or sets the length of the array.
     * This is a number one higher than the highest index in the array.
     * 配列の長さを取得または設定する。
     * これは配列内の最大のインデックスよりも1大きい数値である。
     */
    length: number;

    // ...
}

// ======================================================================
// lib.es2015.d.ts

interface NumberConstructor {
    /**
     * The value of Number.EPSILON is the difference between 1 and the
     * smallest value greater than 1 that is representable as a Number
     * value, which is approximately:
     * Number.EPSILONの値は、1と、Numberの値として表現可能な
     * 1より大きい最小値との差であり、およそ次の値である。
     * 2.2204460492503130808472633361816 x 10-16.
     */
    readonly EPSILON: number;

    /**
     * Returns true if passed value is finite.
     * Unlike the global isFinite, Number.isFinite doesn't forcibly
     * convert the parameter to a number. Only finite values of the
     * type number result in true.
     * @param number A numeric value.
     * 渡された値が有限であれば、trueを返す。
     * グローバルなisFiniteと違って、Number.isFiniteは
     * パラメーターを強制的に数値に変換しない。
     * number型の有限値だけが、trueという結果になる。
     * @param number 数値
     */
    isFinite(number: unknown): boolean;

    // ...
}

// ======================================================================
// lib.dom.d.ts

interface Storage {
    /**
     * Returns the number of key/value pairs.
     * キー/値のペアの数を返す。
     */
    readonly length: number;

    /**
     * Removes all key/value pairs, if there are any.
     * もしあれば、キー/値のすべてのペアを削除する。
     */
    clear(): void;

    /**
     * Returns the current value associated with the given key,
     * or null if the given key does not exist.
     * 指定されたキーに対応する現在の値を返す。
     * 指定されたキーが存在しない場合は、nullを返す。
     */
    getItem(key: string): string | null;

    // ...
}

// ======================================================================
// modules.d.ts
declare module "my-example-lib" {
    export const value: string;
}

// index.ts
import { value } from "my-example-lib";

console.log(value); // Ok

// ======================================================================
// styles.d.ts
declare module "*.module.css" {
    const styles: { [i: string]: string };
    export default styles;
}

// component.ts
import styles from "./styles.module.css";

styles.anyClassName; // 型：string

// ======================================================================
// index.ts
export const greet = (text: string) => {
    console.log(`Hello, ${text}!`);
};

// ======================================================================
// index.d.ts
export declare const greet: (text: string) => void;

// index.js
export const greet = (text) => {
    console.log(`Hello, ${text}!`);
};

// ======================================================================
// using-globals.d.ts
describe("MyAPI", () => {
    it("works", () => { /* ... */ });
});

// using-imported.d.ts
import { describe, it } from "@jest/globals";

describe("MyAPI", () => {
    it("works", () => { /* ... */ });
});

// ======================================================================
// node_modules/@jest/globals/index.d.ts
export function describe(name: string, test: () => void): void;
export function it(name: string, test: () => void): void;

// node_modules/jest/index.d.ts
import * as globals from "@jest/globals";

declare global {
    const describe: typeof globals.describe;
    const it: typeof globals.it;
}