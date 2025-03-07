# TypeScript Interview Questions

## Basic

### <a>What is TypeScript and how does it differ from JavaScript?</a>

TypeScript is a strongly typed superset of JavaScript that adds optional static typing and other features:

Key differences:

-   Static typing
-   Interface definitions
-   Enhanced IDE support
-   Compile-time error checking
-   Object-oriented features
-   Enhanced tooling

Example:

```typescript
// TypeScript
interface User {
    name: string;
    age: number;
}

function greetUser(user: User): string {
    return `Hello ${user.name}, you are ${user.age} years old`;
}

// JavaScript equivalent
function greetUser(user) {
    return `Hello ${user.name}, you are ${user.age} years old`;
}
```

### <a>What are interfaces in TypeScript?</a>

Interfaces define contracts in your code and provide explicit names for type checking:

Key features:

-   Define object shapes
-   Can be extended
-   Support optional properties
-   Can describe function types
-   Allow implementation in classes

Example:

```typescript
interface Vehicle {
    brand: string;
    model: string;
    year?: number; // Optional property
    start(): void;
}

class Car implements Vehicle {
    constructor(public brand: string, public model: string) {}

    start() {
        console.log(`Starting ${this.brand} ${this.model}`);
    }
}
```

### <a>How do you create a new type using a subset of an interface?</a>

You can create new types from existing interfaces using:

-   `Pick` utility type
-   `Omit` utility type
-   `Partial` utility type

Example:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Create type with subset of properties
type UserPublicInfo = Pick<User, 'id' | 'name'>;

// Create type omitting certain properties
type UserWithoutPassword = Omit<User, 'password'>;

// Make all properties optional
type PartialUser = Partial<User>;
```

## Type System Deep Dive

## Advanced Types

### How does TypeScript's type inference work, and when should you explicitly define types instead of relying on inference?

TypeScript's type inference automatically determines types based on variable initialization, return values, and context. It works by analyzing:

-   Variable initialization values
-   Default values in parameters
-   Return values in functions
-   Context from assignments

Example:

```typescript
// Type inference in action
let name = 'John'; // TypeScript infers string
let age = 30; // TypeScript infers number

// Function return type inference
function add(a: number, b: number) {
    return a + b; // Return type inferred as number
}
```

You should explicitly define types when:

-   Declaring variables without initialization
-   Complex object structures
-   Function parameters
-   API responses
-   When inference might be too broad

Example:

```typescript
// Explicit typing recommended
let userInput: string; // No initial value
function processData(data: ComplexType): ResultType {
    // Complex processing
}
```

### What is the difference between `unknown` and `any`, and when should you use each?

`unknown` is the type-safe counterpart of `any`. It ensures you can't use a value until you've performed the necessary type checks.

`any` bypasses all type checking, which can lead to runtime errors.

Example:

```typescript
// Using unknown (safer)
let userInput: unknown;
userInput = 5;
userInput = 'hello';

if (typeof userInput === 'string') {
    console.log(userInput.toUpperCase()); // OK
}

// Using any (unsafe)
let userInput2: any;
userInput2 = 5;
console.log(userInput2.toUpperCase()); // No error, but will fail at runtime
```

Use `unknown` when:

-   You don't know the type at compile time
-   You want to ensure type safety
-   Working with external data

Use `any` when:

-   Migrating from JavaScript
-   Working with dynamic content where type checking isn't practical
-   As a last resort when TypeScript's type system can't express your intent

### How do mapped types work in TypeScript, and how can they be used to transform an existing type?

Mapped types allow you to create new types based on existing ones by transforming properties. They use the syntax `[P in keyof T]` to iterate over properties.

Example:

```typescript
// Original type
interface User {
    name: string;
    age: number;
    email: string;
}

// Making all properties optional
type PartialUser = {
    [P in keyof User]?: User[P];
};

// Making all properties readonly
type ReadonlyUser = {
    readonly [P in keyof User]: User[P];
};

// Transforming property types
type StringifyUser = {
    [P in keyof User]: string;
};
```

### Explain the difference between `readonly` and `const`. When should you use each?

`readonly` is a type-level modifier that prevents reassignment of properties, while `const` is a variable-level declaration that prevents reassignment of the variable itself.

Example:

```typescript
// readonly
interface Config {
    readonly apiKey: string;
    readonly baseUrl: string;
}

const config: Config = {
    apiKey: '123',
    baseUrl: 'https://api.example.com',
};
// config.apiKey = "456"; // Error

// const
const MAX_ITEMS = 100;
// MAX_ITEMS = 200; // Error

const arr = [1, 2, 3];
arr.push(4); // OK - array contents can be modified
// arr = [4, 5, 6]; // Error - can't reassign arr
```

Use `readonly` when:

-   You want to prevent property modification
-   Working with immutable data structures
-   Defining configuration objects

Use `const` when:

-   Declaring constants
-   Preventing variable reassignment
-   Working with primitive values that shouldn't change

### What are conditional types in TypeScript, and how do they help in type flexibility?

Conditional types select types based on conditions using the syntax `T extends U ? X : Y`. They enable powerful type transformations and flexible type definitions.

Example:

```typescript
type IsString<T> = T extends string ? true : false;

// Usage
type A = IsString<'hello'>; // true
type B = IsString<42>; // false

// More complex example
type ArrayOrSingle<T> = T extends any[] ? T : T[];

// Usage
type StringArray = ArrayOrSingle<string>; // string[]
type NumberArrayArray = ArrayOrSingle<number[]>; // number[]
```

## Utility Types & Type Manipulation

### How does `Partial<T>` utility type work, and how is it different from `Pick<T, K>`?

`Partial<T>` makes all properties of a type optional, while `Pick<T, K>` creates a type with only selected properties.

Example:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;
// Equivalent to:
// {
//     name?: string;
//     age?: number;
//     email?: string;
// }

// Pick selects specific properties
type UserBasicInfo = Pick<User, 'name' | 'age'>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### When would you use `Omit<T, K>` over `Pick<T, K>`, and vice versa?

`Omit<T, K>` creates a type by removing specified properties, while `Pick<T, K>` creates a type by selecting specific properties.
Example:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
    password: string;
}
// Omit removes specified properties
type PublicUser = Omit<User, 'password'>;
// Result:
// {
//     name: string;
//     age: number;
//     email: string;
// }
// Pick selects specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;
// Result:
// {
//     email: string;
//     password: string;
// }
```

Use `Omit` when:

-   You want to exclude a few properties
-   The list of properties to exclude is shorter than the ones to keep
    Use `Pick` when:

-   You want to select specific properties
-   The list of properties to keep is shorter than the ones to exclude

### Explain how the `Extract<T, U>` and `Exclude<T, U>` utility types work with examples.

`Extract<T, U>` extracts types from T that are assignable to U, while `Exclude<T, U>` excludes types from T that are assignable to U.
Example:

```typescript
type StringOrNumber = string | number | boolean;
// Extract string | number from StringOrNumber
type ExtractedTypes = Extract<StringOrNumber, string | number>;
// Result: string | number
// Exclude string from StringOrNumber
type ExcludedTypes = Exclude<StringOrNumber, string>;
// Result: number | boolean
// More complex example
type Events = 'click' | 'scroll' | 'mousemove';
type MouseEvents = Extract<Events, `mouse${string}`>;
// Result: "mousemove"
```

### What does `Record<K, T>` do in TypeScript, and when should it be used?

`Record<K, T>` creates an object type with keys of type K and values of type T. It's useful for creating dictionaries or mapped types.
Example:

```typescript
// Simple Record
type UserRoles = 'admin' | 'user' | 'guest';
type UserRolePermissions = Record<UserRoles, string[]>;
const permissions: UserRolePermissions = {
    admin: ['read', 'write', 'delete', 'manage-users'],
    user: ['read', 'write'],
    guest: ['read'],
};
```

### How can you implement a custom mapped type that makes all properties optional except one?

Example:

```typescript
type RequiredProperty<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? T[P] : T[P] | undefined;
} & { [P in K]: T[P] };

interface User {
    id: number;
    name: string;
    email: string;
}
// Make all properties optional except 'id'
type UserWithRequiredId = RequiredProperty<User, 'id'>;
```

### <a>What are generics and how to use them in TypeScript?</a>

Generics allow you to write flexible, reusable functions and classes that work with multiple types while maintaining type safety.

Use cases:

-   Creating type-safe collections
-   Building reusable components
-   Writing utility functions
-   Implementing generic interfaces

Example:

```typescript
// Generic function
function getFirst<T>(array: T[]): T {
    return array[0];
}

// Generic interface
interface Repository<T> {
    get(id: string): T;
    save(item: T): void;
}

// Generic class
class Queue<T> {
    private data: T[] = [];

    push(item: T) {
        this.data.push(item);
    }

    pop(): T | undefined {
        return this.data.shift();
    }
}
```

### <a>What is the difference between union and intersection types?</a>

`Union` types (`|`) represent values that can be one of several types. For example, a variable with type string | number can hold either a string or a number.

`Intersection` types (`&`) combine multiple types into one, requiring an object to fulfill all the properties of each type. For example, if you have type A & B, the resulting type must have all properties from both A and B.
Example:

```typescript
// Union type - can be either type
type StringOrNumber = string | number;

// Intersection type - must satisfy both types
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;

const person: Person = {
    name: 'John',
    age: 30,
}; // Must have both properties
```

## Advanced Interfaces & Type Aliases

### What are index signatures in TypeScript, and how do they affect type safety?

Index signatures allow you to define types for properties that are accessed using dynamic keys. They enhance type safety by ensuring consistent types for dynamically accessed properties.

```typescript
interface Dictionary {
    [key: string]: string;
}

const dict: Dictionary = {
    name: 'John',
    city: 'New York',
    // number: 42 // Error: Type 'number' is not assignable to type 'string'
};
```

### Can an interface extend a type alias in TypeScript? Explain with an example.

Yes, an interface can extend a type alias using the `extends` keyword.

```typescript
type Animal = {
    name: string;
    age: number;
};

interface Dog extends Animal {
    breed: string;
}

const dog: Dog = {
    name: 'Rex',
    age: 3,
    breed: 'German Shepherd',
};
```

### When should you prefer an interface over a type alias, and vice versa?

Use interfaces when:

-   You need declaration merging
-   You're defining object shapes
-   You want to extend or implement the type
-   You're working with object-oriented code

Use type aliases when:

-   You need union or intersection types
-   You want to create complex types
-   You're working with primitives or tuples
-   You need mapped types

### How can you define a type alias that behaves like an intersection of multiple types?

You can use the `&` operator to create intersection types:

```typescript
type Person = {
    name: string;
};

type Employee = {
    id: number;
    role: string;
};

type EmployeePerson = Person & Employee;

const worker: EmployeePerson = {
    name: 'John',
    id: 123,
    role: 'Developer',
};
```

### What are discriminated unions, and how do they help with type safety in TypeScript?

Discriminated unions are union types with a common property (discriminant) that helps TypeScript narrow down the specific type. They improve type safety by allowing precise type checking.

```typescript
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'square'; sideLength: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
    }
}
```

## Generics & Higher-Order Types

### How does TypeScript infer generic types from function parameters?

TypeScript can automatically infer generic types based on the arguments passed to a function:

```typescript
function identity<T>(arg: T): T {
    return arg;
}

const result = identity('hello'); // T is inferred as string
const num = identity(42); // T is inferred as number
```

### How do you restrict a generic type parameter to ensure it extends a specific type?

Use the `extends` keyword with generic constraints:

```typescript
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): number {
    return arg.length;
}

logLength('hello'); // Works
logLength([1, 2, 3]); // Works
// logLength(123); // Error: number doesn't have length property
```

### What is the purpose of the `keyof` operator when working with generics?

`keyof` creates a union type of all property names of a type. It's useful for creating type-safe property access:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
};

const name = getProperty(user, 'name'); // type: string
const age = getProperty(user, 'age'); // type: number
// getProperty(user, "invalid"); // Error: "invalid" is not a key of User
```

### How can you create a generic function that operates on objects and restricts keys dynamically?

Use `keyof` with generic constraints:

```typescript
function pluck<T, K extends keyof T>(objects: T[], key: K): T[K][] {
    return objects.map((obj) => obj[key]);
}

const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
];

const names = pluck(users, 'name'); // type: string[]
const ages = pluck(users, 'age'); // type: number[]
```

### How do you use generic constraints to ensure a function only accepts a subset of a given type?

Use `extends` with an interface or type that defines the minimum requirements:

```typescript
interface Printable {
    print(): void;
}

function printItems<T extends Printable>(items: T[]): void {
    items.forEach((item) => item.print());
}

class Document implements Printable {
    print() {
        console.log('Printing document');
    }
}

printItems([new Document()]); // Works
// printItems([1, 2, 3]); // Error: number[] doesn't implement Printable
```

## Type Narrowing & Control Flow Analysis

### What are type guards in TypeScript, and how do they improve type safety?

Type guards are expressions that perform runtime checks to guarantee the type of a value within a certain scope:

```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function processValue(value: string | number) {
    if (isString(value)) {
        console.log(value.toUpperCase()); // TypeScript knows value is string
    } else {
        console.log(value.toFixed(2)); // TypeScript knows value is number
    }
}
```

### How does the `in` operator help in narrowing down types?

The `in` operator checks if a property exists on an object and helps TypeScript narrow down union types:

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function move(animal: Bird | Fish) {
    if ('fly' in animal) {
        animal.fly(); // TypeScript knows it's Bird
    } else {
        animal.swim(); // TypeScript knows it's Fish
    }
}
```

### Explain how TypeScript's control flow analysis helps in type inference.

TypeScript analyzes code flow to determine type information based on conditions and assignments:

```typescript
function process(value: string | null) {
    if (value === null) {
        return; // TypeScript knows value is null
    }

    console.log(value.toUpperCase()); // TypeScript knows value is string
}
```

### What is the difference between `instanceof` and `typeof` for type narrowing?

-   `typeof` checks primitive types
-   `instanceof` checks class instances

```typescript
function logValue(value: string | Date) {
    if (value instanceof Date) {
        console.log(value.toISOString()); // TypeScript knows it's Date
    } else {
        console.log(value.toUpperCase()); // TypeScript knows it's string
    }
}

function processValue(value: string | number) {
    if (typeof value === 'string') {
        console.log(value.toUpperCase()); // TypeScript knows it's string
    } else {
        console.log(value.toFixed(2)); // TypeScript knows it's number
    }
}
```

### How does TypeScript handle exhaustive type checking in switch statements?

TypeScript can ensure all possible cases are handled using never type:

```typescript
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
    switch (shape) {
        case 'circle':
            return Math.PI;
        case 'square':
            return 1;
        case 'triangle':
            return 0.5;
        default:
            const exhaustiveCheck: never = shape; // Error if any case is missing
            return exhaustiveCheck;
    }
}
```

## Decorators & Meta-Programming

### What are decorators in TypeScript, and how do they work?

Decorators are special declarations that can modify classes, methods, properties, or parameters at design time:

```typescript
function log(target: any, propertyKey: string) {
    console.log(`Accessing: ${propertyKey}`);
}

class Example {
    @log
    method() {
        console.log('Method called');
    }
}
```

### How do you create a class decorator that modifies the behavior of a class?

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Example {
    name: string = 'example';
}
```

### What is the difference between a method decorator and a property decorator?

Method decorators receive three parameters (target, propertyKey, descriptor), while property decorators receive two (target, propertyKey):

```typescript
function methodDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    // Modify method behavior
}

function propertyDecorator(target: any, propertyKey: string) {
    // Modify property behavior
}

class Example {
    @propertyDecorator
    name: string;

    @methodDecorator
    method() {}
}
```

### How do parameter decorators work, and in what scenarios are they useful?

Parameter decorators are useful for validation and dependency injection:

```typescript
function required(target: Object, propertyKey: string, parameterIndex: number) {
    // Validate parameter at runtime
}

class Example {
    method(@required param: string) {
        // Method implementation
    }
}
```

### What are the limitations of decorators in TypeScript when using them with function expressions?

-   Decorators can't be used with function expressions
-   They must be declared before runtime
-   They can't be used with declaration files
-   They're experimental and may change

## Modules & Namespaces

### What is the difference between ES modules and TypeScript namespaces?

ES modules are file-based and support better tree-shaking, while namespaces are TypeScript's legacy module system:

```typescript
// ES Module
export interface User {
    name: string;
}

// Namespace
namespace Users {
    export interface User {
        name: string;
    }
}
```

### How does TypeScript handle module resolution when importing dependencies?

TypeScript uses different module resolution strategies (Node, Classic) based on configuration:

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "baseUrl": "./src",
        "paths": {
            "@/*": ["*"]
        }
    }
}
```

### What is the purpose of `paths` and `baseUrl` in `tsconfig.json`, and how do they help in module resolution?

They help configure custom module resolution paths:

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@components/*": ["components/*"],
            "@utils/*": ["utils/*"]
        }
    }
}

// Usage
import { Button } from "@components/Button";
```

### How do you create a module augmentation in TypeScript?

Module augmentation adds new declarations to existing modules:

```typescript
// existing module
declare module 'some-module' {
    export interface User {
        name: string;
    }
}

// augmentation
declare module 'some-module' {
    export interface User {
        age: number; // Added property
    }
}
```

### Explain how declaration merging works in TypeScript.

Declaration merging combines multiple declarations with the same name:

```typescript
interface Box {
    height: number;
    width: number;
}

interface Box {
    length: number;
}

// Results in:
// interface Box {
//     height: number;
//     width: number;
//     length: number;
// }
```

## Async & Concurrent Programming

### How does TypeScript handle async/await with proper type safety?

TypeScript provides type safety for async operations:

```typescript
async function fetchUser(): Promise<User> {
    const response = await fetch('/api/user');
    return response.json();
}

interface User {
    id: number;
    name: string;
}
```

### What is the difference between `Promise<void>` and `void` in TypeScript functions?

`Promise<void>` indicates an async function that returns nothing, while `void` is for synchronous functions:

```typescript
// Async function returning Promise<void>
async function asyncFunc(): Promise<void> {
    await someOperation();
}

// Synchronous function returning void
function syncFunc(): void {
    console.log('Hello');
}
```

### How do you define a strongly typed function that returns a `Promise<T>`?

```typescript
interface User {
    id: number;
    name: string;
}

async function getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
```

### How does TypeScript infer types in `Promise.all()` and `Promise.race()`?

TypeScript correctly infers the resulting types:

```typescript
const promises = Promise.all([Promise.resolve(1), Promise.resolve('hello')]); // Type: Promise<[number, string]>

const race = Promise.race([Promise.resolve(1), Promise.resolve('hello')]); // Type: Promise<number | string>
```

### How can you enforce a function to always return a promise type?

Use the async keyword or explicitly return a Promise:

```typescript
// Using async
async function method1(): Promise<string> {
    return 'hello';
}

// Explicitly returning Promise
function method2(): Promise<string> {
    return Promise.resolve('hello');
}
```

## Configuration & Compiler Options

### What does `strictNullChecks` do, and how does it improve type safety?

`strictNullChecks` forces explicit handling of null and undefined:

```typescript
// With strictNullChecks: true
function process(value: string | null) {
    if (value === null) {
        return;
    }
    console.log(value.toUpperCase()); // Safe
}
```

### How does `noImplicitAny` affect TypeScript code, and why is it useful?

`noImplicitAny` requires explicit type annotations:

```typescript
// With noImplicitAny: true
function process(value: any) {
    // Must specify type
    console.log(value);
}
```

### What is the effect of setting `moduleResolution` to `node` in `tsconfig.json`?

It uses Node.js-style module resolution:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "baseUrl": "./src"
    }
}
```

### Explain the difference between `resolveJsonModule` and `esModuleInterop`.

-   `resolveJsonModule` allows importing JSON files
-   `esModuleInterop` improves compatibility with CommonJS modules

```typescript
// With resolveJsonModule: true
import data from './data.json';

// With esModuleInterop: true
import * as express from 'express';
```

### How does the `declaration` option in TypeScript affect the build process?

Generates .d.ts files for TypeScript declarations:

```json
{
    "compilerOptions": {
        "declaration": true,
        "outDir": "./dist"
    }
}
```

## Edge Cases & Best Practices

### How does TypeScript handle circular dependencies in type definitions?

TypeScript can handle circular references in type definitions:

```typescript
interface Node {
    next: Node | null;
    value: number;
}
```

### How can you optimize performance when working with large TypeScript projects?

-   Use project references
-   Enable incremental compilation
-   Use strict mode
-   Optimize module resolution

```json
{
    "compilerOptions": {
        "incremental": true,
        "composite": true
    }
}
```
### What are the potential pitfalls of using `as unknown as` for type assertions?

Using `as unknown as` (double type assertion) can be dangerous because:

-   It bypasses TypeScript's type checking completely
-   Can lead to runtime errors since TypeScript won't catch type mismatches
-   Makes code harder to maintain and understand
-   Can hide potential bugs during development

Example of problematic usage:

```typescript
const userInput = '123' as unknown as User; // Dangerous!
userInput.firstName; // TypeScript won't catch if User type doesn't match
```

### Why should you avoid using `any`, and what are the safer alternatives?

Using `any` should be avoided because:

-   Defeats the purpose of TypeScript's type checking
-   Can lead to runtime errors
-   Makes code harder to maintain and debug
-   Reduces IDE support and type inference

Safer alternatives:

-   Use `unknown` for truly unknown types
-   Use proper type definitions
-   Use generics
-   Use union types
-   Use type guards

Example:

```typescript
// Instead of any
function processData<T>(data: T): T {
    return data;
}

// Instead of any[], use proper types
const items: Array<string | number> = ['1', 2, '3'];
```

### What are the differences between casting using `as` and using angle-bracket syntax `<T>`?

Key differences:

1. JSX Compatibility:

    - `as` syntax works in both .ts and .tsx files
    - Angle-bracket syntax doesn't work in .tsx files due to conflict with JSX

2. Usage:

```typescript
// Using as
const value = expr as Type;

// Using angle-bracket (not recommended in .tsx)
const value = <Type>expr;
```

3. Chaining:

-   `as` is more readable with multiple assertions
-   Angle-bracket syntax can become confusing with nested casts

Best Practice:

-   Prefer `as` syntax for consistency and JSX compatibility
-   Avoid type assertions when possible, use type guards instead
