## Javascript interview Questions

### Are you familiar with ES6 and what are some of the advantages over ES5?

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

### How are you leveraging ES6 in your current project?

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

### What are the differences between var, let, and const?

1. var:
    - Function-scoped or globally-scoped
    - Can be redeclared and updated
    - Hoisted to the top of its scope
2. let:
    - Block-scoped
    - Can be updated but not redeclared
    - Not hoisted
3. const:
    - Block-scoped
    - Cannot be updated or redeclared
    - Not hoisted

Example:

```javascript
var x = 1;
var x = 2; // Valid

let y = 1;
// let y = 2; // Error: cannot redeclare

const z = 1;
// z = 2; // Error: cannot reassign
```

### What are the differences between promises and async/await?

Promises:

-   Object representing eventual completion of an async operation
-   Uses .then() and .catch() for handling
-   Can chain multiple promises

Async/await:

-   Syntactic sugar over promises
-   Makes async code look synchronous
-   Easier error handling with try/catch
-   Must be used in async functions

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

### Browser Compatibility

To ensure compatibility with older browsers:

1. Use transpilers like Babel
2. Use polyfills
3. Implement feature detection
4. Use build tools like webpack

Example:

```javascript
// Using Babel configuration
{
    "presets": ["@babel/preset-env"],
    "targets": {
        "browsers": ["last 2 versions", "ie >= 11"]
    }
}
```

### TypeScript vs JavaScript

TypeScript advantages:

-   Static typing
-   Better IDE support
-   Enhanced code maintainability
-   Early error detection
-   Better documentation

Disadvantages:

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

### What is an immutable object?

An immutable object is one whose state cannot be changed after creation.

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

### What is "hoisting" in JavaScript?

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during compilation.

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

### What is the Event Loop in JavaScript?

The event loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

Components:

-   Call Stack
-   Web APIs
-   Callback Queue
-   Microtask Queue

Example:

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise');
});

console.log('End');

// Output:
// Start
// End
// Promise
// Timeout
```

### What is this keyword in JS?

'this' refers to the current execution context and its value depends on how and where it's used.

Example:

```javascript
const person = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);
    },
};

person.greet(); // "Hello, John!"

const greet = person.greet;
greet(); // "Hello, undefined!" (in non-strict mode)
```

### What is debouncing and throttling?

Techniques to control how many times we allow a function to be executed over time.

Debouncing: Delays executing a function until after a certain amount of time has passed since the last time it was invoked.
Throttling: Ensures a function is called at most once in a specified time period.

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

### What is functional programming?

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

### How to achieve functional chaining?

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

### How to curry a function?

Currying is the process of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

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
