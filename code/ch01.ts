// ======================================================================
const firstName = "Georgia";
const nameLength = firstName.length();
//                           ~~~~~~
// This expression is not callable. 
// この式は呼び出し可能ではありません。

// ======================================================================
// 以前は：sayMyName(firstName, lastNameName) { ...
function sayMyName(fullName) {
  console.log(`You acting kind of shady, ain't callin' me ${fullName}`);
}

sayMyName("Beyoncé", "Knowles");
//                            ~~~~~~~~~
// Expected 1 argument, but got 2. 
// 1 個の引数が必要ですが、2 個指定されました。

// ======================================================================
interface Painter {
  finish(): boolean;
  ownMaterials: Material[];
  paint(painting: string, materials: Material[]): boolean;
}

function paintPainting(painter: Painter, painting: string): boolean { /* ... */ }

// ======================================================================
const artist = "Augusta Savage";
console.log({ artist });

// ======================================================================
console.blub("Nothing is worth more than laughter.");