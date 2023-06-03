// ======================================================================
class Greeter {
    greet(name: string) {
        console.log(`${name}, do your stuff!`);
    }
}

new Greeter().greet("Miss Frizzle"); // Ok

new Greeter().greet();
//            ~~~~~
// Error: Expected 1 arguments, but got 0.
// 1 個の引数が必要ですが、0 個指定されました。

// ======================================================================
class Greeted {
    constructor(message: string) {
        console.log(`As I always say: ${message}!`);
    }
}

new Greeted("take chances, make mistakes, get messy");

new Greeted();
// Error: Expected 1 arguments, but got 0.
// 1 個の引数が必要ですが、0 個指定されました。

// ======================================================================
class FieldTrip {
    destination: string;

    constructor(destination: string) {
        this.destination = destination; // Ok
        console.log(`We're going to ${this.destination}!`);

        this.nonexistent = destination;
        //   ~~~~~~~~~~~
        // Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
        // プロパティ 'nonexistent' は型 'FieldTrip' に存在しません。
    }
}

// ======================================================================
const trip = new FieldTrip("planetarium");

trip.destination; // Ok

trip.nonexistent;
//   ~~~~~~~~~~~
// Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
// プロパティ 'nonexistent' は型 'FieldTrip' に存在しません。

// ======================================================================
class WithMethod {
    myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // true

// ======================================================================
class WithProperty {
    myProperty: () => {}
}

new WithMethod().myProperty === new WithMethod().myProperty; // false

// ======================================================================
class WithPropertyParameters {
    takesParameters = (input: boolean) => input ? "Yes" : "No";
}

const instance = new WithPropertyParameters();

instance.takesParameters(true); // Ok

instance.takesParameters(123);
//                       ~~~
// Error: Argument of type 'number' is not
// assignable to parameter of type 'boolean'.
// 型 'number' の引数を型 'boolean' のパラメーターに
// 割り当てることはできません。

// ======================================================================
class WithValue {
    immediate = 0; // Ok
    later: number; // Ok（コンストラクター内で設定されているので）
    mayBeUndefined: number | undefined; // Ok（undefinedでも許されるので）

    unused: number;
    // Error: Property 'unused' has no initializer
    // and is not definitely assigned in the constructor.
    // プロパティ 'unused' に初期化子がなく、
    // コンストラクターで明確に割り当てられていません。

    constructor() {
        this.later = 1;
    }
}

// ======================================================================
class MissingInitializer {
    property: string;
}

new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
// 型エラー：undefinedの 'length' プロパティを読み取れません。

// ======================================================================
class ActivitiesQueue {
    pending!: string[]; // Ok

    initialize(pending: string[]) {
        this.pending = pending;
    }

    next() {
        return this.pending.pop();
    }
}

const activities = new ActivitiesQueue();

activities.initialize(['eat', 'sleep', 'learn'])
activities.next();

// ======================================================================
class MissingInitializer {
    property?: string;
}

new MissingInitializer().property?.length; // Ok

new MissingInitializer().property.length;
// Error: Object is possibly 'undefined'.
// オブジェクトは 'undefined' である可能性があります。

// ======================================================================
class Quote {
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    emphasize() {
        this.text += "!";
        //   ~~~~
        // Error: Cannot assign to 'text' because it is a read-only property.
        // 読み取り専用プロパティであるため、'text' に代入することはできません。
    }
}

const quote = new Quote(
    "There is a brilliant child locked inside every student."
);

quote.text = "Ha!";
// Error: Cannot assign to 'text' because it is a read-only property.
// 読み取り専用プロパティであるため、'text' に代入することはできません。

// ======================================================================
class RandomQuote {
    readonly explicit: string = "Home is the nicest word there is.";
    readonly implicit = "Home is the nicest word there is.";

    constructor() {
        if (Math.random () > 0.5) {
            this.explicit = "We start learning the minute we're born." // Ok;

            this.implicit = "We start learning the minute we're born.";
            // Error: Type '"We start learning the minute we're born."' is
            // not assignable to type '"Home is the nicest word there is."'.
            // 型 '"We start learning the minute we're born."' を
            // 型 '"Home is the nicest word there is."' に割り当てることは
            // できません。
        }
    }
}

const quote = new RandomQuote();

quote.explicit; // 型：string
quote.implicit; // 型："Home is the nicest word there is."

// ======================================================================
class Teacher {
    sayHello() {
        console.log("Take chances, make mistakes, get messy!");
    }
}

let teacher: Teacher;

teacher = new Teacher(); // Ok

teacher = "Wahoo!";
// Error: Type 'string' is not assignable to type 'Teacher'.
// 型 'string' を型 'Teacher' に割り当てることはできません。

// ======================================================================
class SchoolBus {
    getAbilities() {
        return ["magic", "shapeshifting"];
    }
}

function withSchoolBus(bus: SchoolBus) {
    console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus()); // Ok

// Ok
withSchoolBus({
    getAbilities: () => ["transmogrification"],
});

withSchoolBus({
    getAbilities: () => 123,
    //                  ~~~
    // Error: Type 'number' is not assignable to type 'string[]'.
    // 型 'number' を型 'string[]' に割り当てることはできません。
});

// ======================================================================
interface Learner {
    name: string;
    study(hours: number): void;
}

class Student implements Learner {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    study(hours: number) {
        for (let i = 0; i < hours; i+= 1) {
            console.log("...studying...");
        }
    }
}

class Slacker implements Learner {
   // ~~~~~~~
   // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
   //   Property 'study' is missing in type 'Slacker'
   //   but required in type 'Learner'.
   // クラス 'Slacker' はインターフェイス 'Learner' を正しく実装していません。
   //   プロパティ 'study' は型 'Slacker' にありませんが、型 'Learner' では
   //   必須です。
    name = "Rocky";
}

// ======================================================================
class Student implements Learner {
    name;
    // Error: Member 'name' implicitly has an 'any' type.
    // メンバー 'name' の型は暗黙的に 'any' になります。

    study(hours) {
        // Error: Parameter 'hours' implicitly has an 'any' type.
        // パラメーター 'hours' の型は暗黙的に 'any' になります。
    }
}

// ======================================================================
interface Graded {
    grades: number[];
}

interface Reporter {
    report: () => string;
}

class ReportCard implements Graded, Reporter {
    grades: number[];

    constructor(grades: number[]) {
        this.grades = grades;
    }

    report() {
        return this.grades.join(", ");
    }
}

class Empty implements Graded, Reporter { }
   // ~~~~~
   // Error: Class 'Empty' incorrectly implements interface 'Graded'.
   //   Property 'grades' is missing in type 'Empty'
   //   but required in type 'Graded'.
   // クラス 'Empty' はインターフェイス 'Graded' を正しく実装していません。
   //   プロパティ 'grades' は型 'Empty' にありませんが、
   //   型 'Graded' では必須です。
   // ~~~~~
   // Error: Class 'Empty' incorrectly implements interface 'Reporter'.
   //   Property 'report' is missing in type 'Empty'
   //   but required in type 'Reporter'.
   // クラス 'Empty' はインターフェイス 'Reporter' を正しく実装していません。
   //   プロパティ 'report' は型 'Empty' にありませんが、
   //   型 'Reporter' では必須です。

// ======================================================================
interface AgeIsANumber {
    age: number;
}

interface AgeIsNotANumber {
    age: () => string;
}

class AsNumber implements AgeIsANumber, AgeIsNotANumber {
    age = 0;
 // ~~~
 // Error: Property 'age' in type 'AsNumber' is not assignable
 // to the same property in base type 'AgeIsNotANumber'.
 //   Type 'number' is not assignable to type '() => string'.
 // 型 'AsNumber' のプロパティ 'age' を基本データ型 'AgeIsNotANumber' の
 // 同じプロパティに割り当てることはできません。
 //   型 'number' を型 '() => string' に割り当てることはできません。
}

class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
    age() { return ""; }
 // ~~~
 // Error: Property 'age' in type 'NotAsNumber' is not assignable
 // to the same property in base type 'AgeIsANumber'.
 //   Type '() => string' is not assignable to type 'number'.
 // 型 'NotAsNumber' のプロパティ 'age' を基本データ型 'AgeIsANumber' の
 // 同じプロパティに割り当てることはできません。
 //   型 '() => string' を型 'number' に割り当てることはできません。
}

// ======================================================================
class Teacher {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}

class StudentTeacher extends Teacher {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}

const teacher = new StudentTeacher();
teacher.teach(); // Ok（ベースクラスで定義済み）
teacher.learn(); // Ok（サブクラスで定義済み）

teacher.other();
 //     ~~~~~
 // Error: Property 'other' does not exist on type 'StudentTeacher'.
 // プロパティ 'other' は型 'StudentTeacher' に存在しません。

// ======================================================================
class Lesson {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLesson extends Lesson {
    url: string;

    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}

let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok

let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com"); // Ok

online = new Lesson("coding");
// Error: Property 'url' is missing in type
// 'Lesson' but required in type 'OnlineLesson'.
// プロパティ 'url' は型 'Lesson' にありませんが、
// 型 'OnlineLesson' では必須です。

// ======================================================================
class PastGrades {
    grades: number[] = [];
}

class LabeledPastGrades extends PastGrades {
    label?: string;
}

let subClass: LabeledPastGrades;

subClass = new LabeledPastGrades(); // Ok
subClass = new PastGrades(); // Ok

// ======================================================================
class GradeAnnouncer {
    message: string;

    constructor(grade: number) {
        this.message = grade <= 65 ? "Maybe next time..." : "You pass!";
    }
}

class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}

class FailingAnnouncer extends GradeAnnouncer {
    constructor() { }
 // ~~~~~~~~~~~~~~~~~
 // Error: Constructors for derived classes must contain a 'super' call.
 // 派生クラスのコンストラクターには 'super' の呼び出しを含める必要があります。
}

// ======================================================================
class GradesTally {
    grades: number[] = [];

    addGrades(...grades: number[]) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}

class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades: number[]) {
        this.grades = [...previousGrades];
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a derived class.
        // 派生クラスのコンストラクター内の 'this' にアクセスする前に、
        // 'super' を呼び出す必要があります。
        
        super();

        console.log("Starting with length", this.grades.length); // Ok
    }
}

// ======================================================================
class GradeCounter {
    countGrades(grades: string[], letter: string) {
        return grades.filter(grade => grade === letter).length;
    }
}

class FailureCounter extends GradeCounter {
    countGrades(grades: string[]) {
        return super.countGrades(grades, "F");
    }
}

class AnyFailureChecker extends GradeCounter {
    countGrades(grades: string[]) {
        // Property 'countGrades' in type 'AnyFailureChecker' is not
        // assignable to the same property in base type 'GradeCounter'.
        //   Type '(grades: string[]) => boolean' is not assignable
        //   to type '(grades: string[], letter: string) => number'.
        //      Type 'boolean' is not assignable to type 'number'.
        // 型 'AnyFailureChecker' のプロパティ 'countGrades' を
        // 基本データ型 'GradeCounter' の同じプロパティに割り当てることは
        // できません。
        //   型 '(grades: string[]) => boolean' を
        //   型 '(grades: string[], letter: string) => number' に
        //   割り当てることはできません。
        //     型 'boolean' を型 'number' に割り当てることはできません。
        return super.countGrades(grades, "F") !== 0;
    }
}

const counter: GradeCounter = new AnyFailureChecker();
 //   ~~~~~~~
 // Type 'AnyFailureChecker' is not assignable to type 'GradeCounter'.
 //   The types returned by 'countGrades(...)' are incompatible between
 //   these types.
 //     Type 'boolean' is not assignable to type 'number'.
 // 型 'AnyFailureChecker' を型 'GradeCounter' に割り当てることは
 // できません。
 //   'countGrades(...)' によって返された型は、これらの型同士で互換性が
 //   ありません。
 //     型 'boolean' を型 'number' に割り当てることはできません。

// 期待される型：number
// 実際の型：boolean
const count = counter.countGrades(["A", "C", "F"], "D");

// ======================================================================
class Assignment {
    grade?: number;
}

class GradedAssignment extends Assignment {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }
}

// ======================================================================
class NumericGrade {
    value = 0;
}

class VagueGrade extends NumericGrade {
    value = Math.random() > 0.5 ? 1 : "...";
    // Error: Property 'value' in type 'VagueGrade' is not
    // assignable to the same property in base type 'NumericGrade'.
    //   Type 'string | number' is not assignable to type 'number'.
    //     Type 'string' is not assignable to type 'number'.
    // 型 'VagueGrade' のプロパティ 'value' を基本データ型 'NumericGrade' の
    // 同じプロパティに割り当てることはできません。
    //   型 'string | number' を型 'number' に割り当てることはできません。
    //     型 'string' を型 'number' に割り当てることはできません。
}

const instance: NumericGrade = new VagueGrade();
 //   ~~~~~~~~
 // Type 'VagueGrade' is not assignable to type 'NumericGrade'.
 //   Types of property 'value' are incompatible.
 //     Type 'string | number' is not assignable to type 'number'.
 //       Type 'string' is not assignable to type 'number'.
 // 型 'VagueGrade' を型 'NumericGrade' に割り当てることはできません。
 //   プロパティ 'value' の型に互換性がありません。
 //     型 'string | number' を型 'number' に割り当てることはできません。
 //       型 'string' を型 'number' に割り当てることはできません。

// 期待される型：number
// 実際の型：string | number
instance.value;

// ======================================================================
abstract class School {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getStudentTypes(): string[];
}

class Preschool extends School {
    getStudentTypes() {
        return ["preschooler"];
    }
}

class Absence extends School { }
   // ~~~~~~~
   // Error: Non-abstract class 'Absence' does not implement
   // inherited abstract member 'getStudentTypes' from class 'School'.
   // 非抽象クラス 'Absence' はクラス 'School' からの継承抽象メンバー
   // 'getStudentTypes' を実装しません。

// ======================================================================
let school: School;

school = new Preschool("Sunnyside Daycare"); // Ok

school = new School("somewhere else");
// Error: Cannot create an instance of an abstract class.
// 抽象クラスのインスタンスは作成できません。

// ======================================================================
class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
}

class Subclass extends Base {
    examples() {
        this.isPublicImplicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok

        this.isPrivate;
        // Error: Property 'isPrivate' is private
        // and only accessible within class 'Base'.
        // プロパティ 'isPrivate' はプライベートで、クラス 'Base' 内でのみ
        // アクセスできます。

        this.#truePrivate;
        // Property '#truePrivate' is not accessible outside
        // class 'Base' because it has a private identifier.
        // プロパティ '#truePrivate' には private 識別子が指定されているため、
        // クラス 'Base' の外部ではアクセスできません。
    }
}

new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok

new Subclass().isProtected;
//             ~~~~~~~~~~~
// Error: Property 'isProtected' is protected
// and only accessible within class 'Base' and its subclasses.
// プロパティ 'isProtected' は保護されているため、クラス 'Base' と
// そのサブクラス内でのみアクセスできます。

new Subclass().isPrivate;
//             ~~~~~~~~~~~
// Error: Property 'isPrivate' is private
// and only accessible within class 'Base'.
// プロパティ 'isPrivate' はプライベートで、クラス 'Base' 内でのみ
// アクセスできます。

// ======================================================================
class TwoKeywords {
    private readonly name: string;

    constructor() {
        this.name = "Anne Sullivan"; // Ok
    }

    log() {
        console.log(this.name); // Ok
    }
}

const two = new TwoKeywords();

two.name = "Savitribai Phule";
 // ~~~~
 // Error: Property 'name' is private and
 // only accessible within class 'TwoKeywords'.
 // プロパティ 'name' はプライベートで、クラス 'TwoKeywords' 内でのみ
 // アクセスできます。
 // ~~~~
 // Error: Cannot assign to 'name'
 // because it is a read-only property.
 // 読み取り専用プロパティであるため、'name' に代入することはできません。

// ======================================================================
class Question {
    protected static readonly answer = "bash";
    protected static readonly prompt =
        "What's an ogre's favorite programming language?";

    guess(getAnswer: (prompt: string) => string) {
        const answer = getAnswer(Question.prompt);

        // Ok
        if (answer === Question.answer) {
            console.log("You got it!");
        } else {
            console.log("Try again...")
        }
    }
}

Question.answer;
//       ~~~~~~
// Error: Property 'answer' is protected and only
// accessible within class 'Question' and its subclasses.
// プロパティ 'answer' は保護されているため、クラス 'Question' と
// そのサブクラス内でのみアクセスできます。

// ======================================================================
class SomeClass {
    static #truePrivateStatic
}