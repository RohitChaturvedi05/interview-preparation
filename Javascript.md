## Javascript interview Questions

### <a>Are you familiar with ES6 and what are some of the advantages over ES5?</a>

ES6 (ECMAScript 2015) introduced several important features and improvements over ES5:

-   Arrow functions
-   Template literals
-   Destructuring
-   Classes
-   Modules
-   Let and const declarations
-   Promises
-   Default parameters
-   Rest and spread operators

Example:

```javascript
// ES5
var add = function (a, b) {
    return a + b;
};

// ES6
const add = (a, b) => a + b;

// Template literals
const name = 'John';
console.log(`Hello ${name}!`);

// Destructuring
const person = { name: 'John', age: 30 };
const { name, age } = person;
```

### <a>How are you leveraging ES6 in your current project?</a>

Common ES6 features used in modern projects:

1. Using arrow functions for callbacks and methods
2. Implementing async/await for asynchronous operations
3. Using modules for better code organization
4. Leveraging destructuring for cleaner code
5. Using template literals for string interpolation

Example:

```javascript
// Modules
import { getData } from './api';

// Async/await
async function fetchData() {
    try {
        const data = await getData();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### <a>What are the differences between var, let, and const?</a>

| Feature              | var                                | let                               | const                           |
| -------------------- | ---------------------------------- | --------------------------------- | ------------------------------- |
| Scope                | Function-scoped or globally-scoped | Block-scoped                      | Block-scoped                    |
| Redeclaration/Update | Can be redeclared and updated      | Can be updated but not redeclared | Cannot be updated or redeclared |
| Hoisting             | Hoisted to the top of its scope    | Not hoisted                       | Not hoisted                     |

Example:

```javascript
var x = 1;
var x = 2; // Valid

let y = 1;
// let y = 2; // Error: cannot redeclare

const z = 1;
// z = 2; // Error: cannot reassign
```

### <a>What are the differences between promises and async/await?</a>

| Feature        | Promises                                                      | Async/await                              |
| -------------- | ------------------------------------------------------------- | ---------------------------------------- |
| Definition     | Object representing eventual completion of an async operation | Syntactic sugar over promises            |
| Syntax         | Uses `.then()` and `.catch()` for handling                    | Makes async code look synchronous        |
| Error Handling | Uses `.catch()`                                               | Easier error handling with `try`/`catch` |
| Usage          | Can chain multiple promises                                   | Must be used in async functions          |

Example:

```javascript
// Promise
fetch('/api/data')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

// Async/await
async function getData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### <a>How we could ensure our compatibility with all browsers?</a>

To ensure compatibility with older browsers:

1. Use transpilers like Babel
2. Use polyfills
3. Implement feature detection
4. Use build tools like webpack

Example:

### <a>What are the difference between TypeScript vs JavaScript?</a>

-   Additional compilation step
-   Learning curve
-   Increased initial development time
-   Larger project setup

Example:

```typescript
// TypeScript
interface User {
    name: string;
    age: number;
}

function greet(user: User): string {
    return `Hello ${user.name}!`;
}
```

### <a>What is an immutable object?</a>

An immutable object is one whose state cannot be changed after creation.

Once an object is created as immutable, its properties cannot be added, modified, or deleted.
This is particularly useful in functional programming and helps prevent unintended side-effects in your code. Immutable objects are inherently thread-safe and make it easier to reason about state changes in your application. In JavaScript, you can create immutable objects using Object.freeze() method, though it only provides shallow immutability. For deep immutability, you would need to recursively freeze nested objects or use specialized libraries.

Significance:

-   Predictable behavior
-   Thread safety
-   Easier debugging
-   Better performance in some cases

Example:

```javascript
// Creating immutable object
const person = Object.freeze({
    name: 'John',
    age: 30,
});

// person.age = 31; // This will fail in strict mode
```

### <a>What is "hoisting" in JavaScript?</a>

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during compilation. This means that regardless of where variables and functions are declared in the code, they are treated as if they are declared at the beginning of their scope.

Variables declared with 'var' are hoisted and initialized with 'undefined', while variables declared with 'let' and 'const' are hoisted but not initialized, resulting in a reference error if accessed before declaration.

Function declarations are also hoisted completely, allowing them to be called before they appear in the code, but function expressions are not hoisted in the same way.
Example:

```javascript
console.log(x); // undefined
var x = 5;

// How it's actually interpreted
var x;
console.log(x);
x = 5;

// let and const are not hoisted
// console.log(y); // ReferenceError
let y = 5;
```

### <a>What is the Event Loop in JavaScript?</a>

The event loop is an important concept in JavaScript that enables asynchronous programming by handling tasks efficiently. Since JavaScript is single-threaded, it uses the event loop to manage the execution of multiple tasks without blocking the main thread.

How the Event Loop Works
The event loop continuously checks whether the call stack is empty and whether there are pending tasks in the callback queue or microtask queue. If the call stack is empty, it takes the first task from the queue and pushes it onto the call stack, where it is executed.

Components:

-   `Call Stack`: The mechanism that keeps track of function calls in your code. When you execute a function, it's added to the stack, and when the function returns, it's removed from the stack. It follows Last-In-First-Out (LIFO) principle.

-   `Web APIs`: Browser-provided APIs (like setTimeout, DOM events, AJAX calls) that handle asynchronous operations outside the JavaScript engine. These APIs run in separate threads, allowing non-blocking operations.

-   `Callback Queue`: Also known as the Task Queue, it holds callback functions from completed asynchronous operations (like setTimeout callbacks, event handlers). These callbacks wait to be processed by the event loop.

-   `Microtask Queue`: Similar to the callback queue but has higher priority. It handles promises and process.nextTick. Microtasks are processed immediately after the current synchronous code completes and before the next macrotask (callback queue items).

    <img src="./assets/js-event-loop.jpg" alt="Event Loop" width="500" />

Why is the Event Loop Important?

-   Non-blocking Execution: Enables JavaScript to handle multiple tasks efficiently.
-   Better Performance: Ensures UI updates and API calls do not freeze the page.
-   Optimized Async Handling: Prioritizes microtasks over macrotasks for better responsiveness.

### <a>What is `this` keyword in JS?</a>

'this' refers to the current execution context and its value depends on how and where it's used.
Different contexts where 'this' behaves differently:

1. `Global context`:
    - In non-strict mode, 'this' refers to the global object (window in browsers)
    - In strict mode, 'this' is undefined
2. `Object methods`:
   'this' refers to the object that owns the method
3. `Constructor functions`:
   'this' refers to the newly created instance
4. `Event handlers`:
   'this' refers to the element that triggered the event

Example:

```javascript
// Global context
console.log(this); // window (in browser, non-strict mode)

// Object method
const user = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);
    },
};
user.greet(); // "Hello, John!"

// Constructor function
function Person(name) {
    this.name = name;
}
const john = new Person('John');
console.log(john.name); // "John"

// Event handler
button.addEventListener('click', function () {
    console.log(this); // refers to the button element
});
```

### <a>What is debouncing and throttling?</a>

Techniques to control how many times we allow a function to be executed over time.

`Debouncing`: Delays executing a function until after a certain amount of time has passed since the last time it was invoked.

`Throttling`: Ensures a function is called at most once in a specified time period.

Example:

```javascript
// Debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttling
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
```

### <a>What is functional programming?</a>

A programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data.

Key concepts:

-   Pure functions
-   Immutability
-   First-class functions
-   Higher-order functions

Example:

```javascript
// Pure function
const add = (a, b) => a + b;

// Higher-order function
const multiply = (factor) => (number) => number * factor;
const double = multiply(2);
console.log(double(5)); // 10
```

### <a>How to achieve functional chaining?</a>

Functional chaining is achieved by returning an object that contains methods, allowing multiple operations to be performed in sequence.

Example:

```javascript
class Calculator {
    constructor(value = 0) {
        this.value = value;
    }

    add(n) {
        this.value += n;
        return this;
    }

    multiply(n) {
        this.value *= n;
        return this;
    }

    getResult() {
        return this.value;
    }
}

const result = new Calculator(2).add(3).multiply(2).getResult();
console.log(result); // 10
```

### <a>How to curry a function?</a>

Currying is the process of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

Use cases for currying:

-   Event handling with pre-configured parameters
-   Partial application of configuration settings
-   Creating reusable validation functions with predefined rules
-   Building URL generators with fixed base URLs
-   Creating specialized math operations from generic functions
-   API request functions with predefined headers or endpoints
-   Format strings with consistent prefixes or suffixes
-   Creating specialized filter functions from generic predicates

Example:

```javascript
// Regular function
function add(a, b, c) {
    return a + b + c;
}

// Curried version
const curriedAdd = (a) => (b) => (c) => a + b + c;

console.log(curriedAdd(1)(2)(3)); // 6

// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}
```

### <a>What is function\* in JavaScript ?</a>

A generator function is a special type of function that can be paused and resumed during its execution. It uses the `function*` syntax and the `yield` keyword to control the flow of execution.
Example:

```javascript
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

let generator = generateSequence();

console.log(generator.next().value); // Output: 1
console.log(generator.next().value); // Output: 2
console.log(generator.next().value); // Output: 3
```

### <a>What are `symbol` in JavaScript ?</a>

Symbols are new primitive built-in object types introduced as part of ES6. Symbols return unique identifiers that can be used to add unique property keys to an object that won’t collide with keys of any other code that might add to the object.
They are used as object properties that cannot be recreated. It basically helps us to enable encapsulation or information hiding.

```javascript
let symbol1 = Symbol('Jhon');
let symbol2 = Symbol('Jhon');
// Each time Symbol() method // is used to create new global // Symbol
console.log(symbol1 == symbol2);
```

### <a>What is `Symbol.iterator` ?</a>

The `Symbol.iterator` symbol is used to specify the default iterator for an object. It is a built-in symbol that is used to represent the iterator object that is used to iterate over the elements of a collection.
Example:

```javascript
const obj = {
    items: [1, 2, 3],
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            next: () => ({
                value: this.items[index],
                done: index++ >= this.items.length,
            }),
        };
    },
};
for (const item of obj) {
    console.log(item);
}
// Output:
// 1
// 2
// 3
```

### <a>What is Prototypal inheritance in JS ?</a>

In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called “a prototype”:
`Please note:` that **proto** is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.
Example:

```javascript
let animal = {
    eats: true,
};
let rabbit = {
    jumps: true,
};
rabbit.__proto__ = animal; // (*)
// we can find both properties in rabbit now:
console.log(rabbit.eats); // true (**)
console.log(rabbit.jumps); // true
```
