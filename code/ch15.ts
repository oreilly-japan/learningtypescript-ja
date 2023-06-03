// ======================================================================
type NewType = {
    [K in OriginalType]: NewProperty;
};

// ======================================================================
type Animals = "alligator" | "baboon" | "cat";

type AnimalCounts = {
    [K in Animals]: number;
};
// これは次と同じ
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }

// ======================================================================
interface AnimalVariants {
    alligator: boolean;
    baboon: number;
    cat: string;
}

type AnimalCounts = {
    [K in keyof AnimalVariants]: number;
};
// これは次と同じ
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }

// ======================================================================
interface BirdVariants {
    dove: string;
    eagle: boolean;
}

type NullableBirdVariants = {
    [K in keyof BirdVariants]: BirdVariants[K] | null;
};
// これは次と同じ
// {
//   dove: string | null;
//   eagle: boolean | null;
// }

// ======================================================================
interface Researcher {
    researchMethod(): void;
    researchProperty: () => string;
}

type JustProperties<T> = {
    [K in keyof T]: T[K];
};

type ResearcherProperties = JustProperties<Researcher>;
// これは次と同じ
// {
//   researchMethod: () => void;
//   researchProperty: () => string;
// }

// ======================================================================
interface Environmentalist {
    area: string;
    name: string;
}

type ReadonlyEnvironmentalist = {
    readonly [K in keyof Environmentalist]: Environmentalist[K];
};
// これは次と同じ
// {
//   readonly area: string;
//   readonly name: string;
// }

type OptionalReadonlyEnvironmentalist = {
    [K in keyof ReadonlyEnvironmentalist]?: ReadonlyEnvironmentalist[K];
};
// これは次と同じ
// {
//   readonly area?: string;
//   readonly name?: string;
// }

// ======================================================================
interface Conservationist {
    name: string;
    catchphrase?: string;
    readonly born: number;
    readonly died?: number;
}

type WritableConservationist = {
    -readonly [K in keyof Conservationist]: Conservationist[K];
};
// これは次と同じ
// {
//   name: string;
//   catchphrase?: string;
//   born: number;
//   died?: number;
// }

type RequiredWritableConservationist = {
    [K in keyof WritableConservationist]-?: WritableConservationist[K];
};
// これは次と同じ
// {
//   name: string;
//   catchphrase: string;
//   born: number;
//   died: number;
// }

// ======================================================================
type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K];
}

interface Species {
    genus: string;
    name: string;
}

type ReadonlySpecies = MakeReadonly<Species>;
// これは次と同じ
// {
//   readonly genus: string;
//   readonly name: string;
// }

// ======================================================================
interface GenusData {
    family: string;
    name: string;
}

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
}
// これは次と同じ
// {
//   family?: string;
//   name?: string;
// }

/**
 * {overrides}をGenusDataのデフォルト値の上に展開します。
 */
function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
    return {
        family: 'unknown',
        name: 'unknown',
        ...overrides,
    }
}

// ======================================================================
// exactOptionalPropertyTypesが無効な場合、エラーにならない
createGenusData({ family: undefined });

// ======================================================================
// exactOptionalPropertyTypesが有効な場合、型エラーになる
createGenusData({ family: undefined });
// Argument of type '{ family: undefined; }' is not assignable to
// parameter of type '{ family?: string; name?: string; }' with
// 'exactOptionalPropertyTypes: true'. Consider adding 'undefined'
// to the types of the target's properties.
//   Types of property 'family' are incompatible.
//     Type 'undefined' is not assignable to type 'string'.
// 型 '{ family: undefined; }' の引数を、
// 'exactOptionalPropertyTypes: true' が指定されている
// 型 'MakeOptional<GenusData>' のパラメーターに割り当てることはできません。
// ターゲットのプロパティの型に 'undefined' を追加することを検討してください。
//   プロパティ 'family' の型に互換性がありません。
//     型 'undefined' を型 'string' に割り当てることはできません。

// ======================================================================
// 型：false
type CheckStringAgainstNumber = string extends number ? true : false;

// ======================================================================
type CheckAgainstNumber<T> = T extends number ? true : false;

// 型：false
type CheckString = CheckAgainstNumber<'parakeet'>;

// 型：true
type CheckString = CheckAgainstNumber<1891>;

// 型：true
type CheckString = CheckAgainstNumber<number>;

// ======================================================================
type CallableSetting<T> =
    T extends () => any
        ? T
        : () => T

// 型：() => number[]
type GetNumbersSetting = CallableSetting<() => number[]>;

// 型：() => string
type StringSetting = CallableSetting<string>;

// ======================================================================
interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> =
  Options["throwIfNotFound"] extends true ? string : string | undefined;

declare function retrieve<Options extends QueryOptions>(
    key: string,
    options?: Options,
): Promise<QueryResult<Options>>;

// 戻り値の型：Promise<string | undefined>
retrieve("Biruté Galdikas");

// 戻り値の型：Promise<string | undefined>
retrieve("Jane Goodall", { throwIfNotFound: Math.random() > 0.5 });

// 戻り値の型：Promise<string>
retrieve("Dian Fossey", { throwIfNotFound: true });

// ======================================================================
type ArrayifyUnlessString<T> = T extends string ? T : T[];

// 型：string | number[]
type HalfArrayified = ArrayifyUnlessString<string | number>;

// ======================================================================
type ArrayItems<T> =
    T extends (infer Item)[]
        ? Item
        : T;

// 型：string
type StringItem = ArrayItems<string>;

// 型：string
type StringArrayItem = ArrayItems<string[]>;

// 型：string[]
type String2DItem = ArrayItems<string[][]>;

// ======================================================================
type ArrayItemsRecursive<T> =
    T extends (infer Item)[]
        ? ArrayItemsRecursive<Item>
        : T;

// 型：string
type StringItem = ArrayItemsRecursive<string>;

// 型：string
type StringArrayItem = ArrayItemsRecursive<string[]>;

// 型：string
type String2DItem = ArrayItemsRecursive<string[][]>;

// ======================================================================
type MakeAllMembersFunctions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? T[K]
        : () => T[K]
};

type MemberFunctions = MakeAllMembersFunctions<{
    alreadyFunction: () => string,
    notYetFunction: number,
}>;
// 型：
// {
//   alreadyFunction: () => string,
//   notYetFunction: () => number,
// }

// ======================================================================
type NeverIntersection = never & string; // 型：never
type NeverUnion = never | string; // 型：string

// ======================================================================
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
// "red" | "blue" と同じ

// ======================================================================
type FirstParameter<T extends (...args: any[]) => any> =
    T extends (arg: infer Arg) => any
        ? Arg
        : never;

type GetsString = FirstParameter<
    (arg0: string) => void
>; // 型：string

// ======================================================================
type OnlyStringProperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
    participants: string[];
    location: string;
    name: string;
    year: number;
}

type OnlyStringEventData = OnlyStringProperties<AllEventData>;
// "location" | "name" と同じ

// ======================================================================
type Greeting = `Hello${string}`;

let matches: Greeting = "Hello, world!"; // Ok

let outOfOrder: Greeting = "World! Hello!";
//  ~~~~~~~~~~
// Error: Type '"World! Hello!"' is not assignable to type '`Hello${string}`'.
// 型 '"World! Hello!"' を型 '`Hello{string}`' に割り当てることはできません。

let missingAltogether: Greeting = "hi";
//  ~~~~~~~~~~~~~~~~~
// Error: Type '"hi"' is not assignable to type '`Hello${string}`'.
// 型 '"hi"' を型 '`Hello{string}`' に割り当てることはできません。

// ======================================================================
type Brightness = "dark" | "light";
type Color =  "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`;
// "dark-blue" | "dark-red" | "light-blue" | "light-red" と同じ

let colorOk: BrightnessAndColor = "dark-blue"; // Ok

let colorWrongStart: BrightnessAndColor = "medium-blue";
//  ~~~~~~~~~~~~~~~
// Error: Type '"medium-blue"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.
// 型 '"medium-blue"' を
// 型 '"dark-blue" | "dark-red" | "light-blue" | "light-red"' に
// 割り当てることはできません。

let colorWrongEnd: BrightnessAndColor = "light-green";
//  ~~~~~~~~~~~~~
// Error: Type '"light-green"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.
// 型 '"light-green"' を
// 型 '"dark-blue" | "dark-red" | "light-blue" | "light-red"' に
// 割り当てることはできません。

// ======================================================================
type ExtolNumber = `much ${number} wow`;

function extol(extolee: ExtolNumber) { /* ... */ }

extol('much 0 wow'); // Ok
extol('much -7 wow'); // Ok
extol('much 9.001 wow'); // Ok

extol('much false wow');
//    ~~~~~~~~~~~~~~~~
// Error: Argument of type '"much false wow"' is not
// assignable to parameter of type '`much ${number} wow`'.
// 型 '"much false wow"' の引数を型 '`much {number} wow`' の
// パラメーターに割り当てることはできません。

// ======================================================================
type FormalGreeting = Capitalize<"hello.">; // 型："Hello."

// ======================================================================
type DataKey = "location" | "name" | "year";

type ExistenceChecks = {
    [K in `check${Capitalize<DataKey>}`]: () => boolean;
};
// これは次と同じ
// {
//   checkLocation: () => boolean;
//   checkName: () => boolean;
//   checkYear: () => boolean;
// }

function checkExistence(checks: ExistenceChecks) {
    checks.checkLocation(); // 型：boolean
    checks.checkName(); // 型：boolean

    checks.checkWrong();
    //     ~~~~~~~~~~
    // Error: Property 'checkWrong' does not exist on type 'ExistenceChecks'.
    // プロパティ 'checkWrong' は型 'ExistenceChecks' に存在しません。
}

// ======================================================================
interface DataEntry<T> {
    key: T;
    value: string;
}

type DataKey = "location" | "name" | "year";

type DataEntryGetters = {
    [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
// これは次と同じ
// {
//   getLocation: () => DataEntry<"location">;
//   getName: () => DataEntry<"name">;
//   getYear: () => DataEntry<"year">;
// }

// ======================================================================
const config = {
    location: "unknown",
    name: "anonymous",
    year: 0,
};

type LazyValues = {
    [K in keyof typeof config as `${K}Lazy`]: () => Promise<typeof config[K]>;
};
// これは次と同じ
// {
//   locationLazy: () => Promise<string>;
//   nameLazy: () => Promise<string>;
//   yearLazy: () => Promise<number>;
// }

async function withLazyValues(configGetter: LazyValues) {
    await configGetter.locationLazy(); // 結果として得られる型：string

    await configGetter.missingLazy();
    //                 ~~~~~~~~~~~
    // Error: Property 'missingLazy' does not exist on type 'LazyValues'.
    // プロパティ 'missingLazy' は型 'LazyValues' に存在しません。
};

// ======================================================================
type TurnIntoGettersDirect<T> = {
    [K in keyof T as `get${K}`]: () => T[K]
    //                     ~
    // Error: Type 'K' is not assignable to type 
    // 'string | number | bigint | boolean | null | undefined'.
    //   Type 'keyof T' is not assignable to type 
    //   'string | number | bigint | boolean | null | undefined'.
    //     Type 'string | number | symbol' is not assignable to type 
    //     'string | number | bigint | boolean | null | undefined'.
    //       Type 'symbol' is not assignable to type 
    //       'string | number | bigint | boolean | null | undefined'.
    // 型 'K' を
    // 型 'string | number | bigint | boolean | null | undefined' に
    // 割り当てることはできません。
    //   型 'keyof T' を
    //   型 'string | number | bigint | boolean | null | undefined' に
    //   割り当てることはできません。
    //     型 'string | number | symbol' を
    //     型 'string | number | bigint | boolean | null | undefined' に
    //     割り当てることはできません。
    //       型 'symbol' を
    //       型 'string | number | bigint | boolean | null | undefined' に
    //       割り当てることはできません。
};

// ======================================================================
const someSymbol = Symbol("");

interface HasStringAndSymbol {
    StringKey: string;
    [someSymbol]: number;
}

type TurnIntoGetters<T> = {
    [K in keyof T as `get${string & K}`]: () => T[K]
};

type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;
// これは次と同じ
// {
//     getStringKey: () => string;
// }