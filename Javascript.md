<style jsx>
    .markdown-body h3 {
        color: #4493f8;
    }
</style>

## Javascript interview Questions

## Basics & Data Types

### What are the differences between var, let, and const?

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

### What are the different data types in JavaScript?

### What is the difference between `null` and `undefined`?

### How does JavaScript handle type coercion?

### What is the difference between `==` and `===` in JavaScript?

### Explain the difference between `let`, `const`, and `var`.

### How we could ensure our compatibility with all browsers?

To ensure compatibility with older browsers:

1. Use transpilers like Babel
2. Use polyfills
3. Implement feature detection
4. Use build tools like webpack

Example:

### What are `symbol` in JavaScript ?

Symbols are new primitive built-in object types introduced as part of ES6. Symbols return unique identifiers that can be used to add unique property keys to an object that won’t collide with keys of any other code that might add to the object.
They are used as object properties that cannot be recreated. It basically helps us to enable encapsulation or information hiding.

```javascript
let symbol1 = Symbol('Jhon');
let symbol2 = Symbol('Jhon');
// Each time Symbol() method // is used to create new global // Symbol
console.log(symbol1 == symbol2);
```

---

## Functions & Scope`

### What is "hoisting" in JavaScript?

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

### What is the difference between function declaration and function expression?

### How does JavaScript handle function hoisting?

### What is a closure in JavaScript, and why is it useful?

### How does lexical scoping work in JavaScript?

### What is the difference between synchronous and asynchronous functions?

### What is function\* in JavaScript ?

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

### What is `Symbol.iterator` ?

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

---

## Objects & Prototypes

### What is prototypal inheritance in JavaScript?

Prototypal inheritance is a way of creating objects in JavaScript that allows objects to inherit properties and methods from other objects. It is a way of creating objects in JavaScript that allows objects to inherit properties and methods from other objects.

objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called “a prototype”:

`Note:` that **proto** is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.
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

### How does `Object.create()` work?

### What is the difference between `Object.freeze()`, `Object.seal()`, and `Object.assign()`?

### What is an immutable object?

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

### How can you deep clone an object in JavaScript?

### What are getters and setters in JavaScript, and how do you use them?

---

## Advanced JavaScript Concepts

## Event Loop & Asynchronous JavaScript

---

### How does the JavaScript event loop work?

### What is the difference between microtasks and macrotasks?

### How do `setTimeout()` and `setInterval()` work in JavaScript?

### Explain the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`.

### How does async/await work internally?

---

## Closures & Higher-Order Functions

---

### What is a closure, and how does it work?

### How do you create a private variable using closures in JavaScript?

### What are higher-order functions, and how are they used?

### How does JavaScript handle callback functions?

### What is function currying, and how does it work?

### What are the differences between promises and async/await?

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

## This & Execution Context

### What is `this` in JavaScript, and how does it behave in different contexts?

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

### What are the different ways to bind `this` in JavaScript?

### How do `call()`, `apply()`, and `bind()` methods work?

### How does arrow function handle `this` differently from regular functions?

### What is the difference between implicit and explicit binding in JavaScript?

---

## Object-Oriented JavaScript

### What is the difference between a class and a constructor function in JavaScript?

### How do you implement inheritance using JavaScript classes?

### What is the difference between static and instance methods in JavaScript?

### How does method overriding work in JavaScript?

### What is the role of the `super` keyword in JavaScript classes?

---

## Memory Management & Performance Optimization

---

### What are memory leaks in JavaScript, and how can you prevent them?

### How does garbage collection work in JavaScript?

### What are weak references in JavaScript, and when should you use them?

### How does JavaScript optimize function execution using inline caching?

### How can you improve JavaScript performance when working with large data sets?

### What is debouncing and throttling?

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

---

## Modules & Design Patterns

### What are ES6 modules, and how do they work?

### What is the difference between default and named exports?

### How does the Module Pattern work in JavaScript?

### What is the difference between CommonJS and ES6 modules?

### What are some common JavaScript design patterns, and when should they be used?

---

## DOM Manipulation & Events

### How does event delegation work in JavaScript?

### What is the difference between `target` and `currentTarget` in event handling?

### What are event capturing and event bubbling in JavaScript?

### How do you remove an event listener in JavaScript?

### What are `MutationObserver` and `IntersectionObserver`, and how do they work?

---

## Error Handling & Debugging

### How does JavaScript handle errors using try-catch?

### What is the difference between `throw` and `console.error()`?

### What is the purpose of the `finally` block in JavaScript?

### How can you create a custom error in JavaScript?

### What are some best practices for debugging JavaScript code?

---

## Data Structures & Algorithms

### How do you implement a stack in JavaScript?

### How do you implement a queue using JavaScript?

### What is the difference between `map`, `filter`, and `reduce`?

### How do you remove duplicates from an array in JavaScript?

### What is the best way to find the largest/smallest number in an array?

---

## Modern JavaScript Features

### What are template literals, and how do they work?

### How does optional chaining (`?.`) work in JavaScript?

### What is the purpose of the `??` (nullish coalescing) operator?

### What are the benefits of using `BigInt` in JavaScript?

### How do private class fields work in JavaScript?

---

## Security & Best Practices

### How can you prevent Cross-Site Scripting (XSS) in JavaScript?

### What are some common security vulnerabilities in JavaScript applications?

### How does Content Security Policy (CSP) help secure JavaScript applications?

### How do you safely handle user input in JavaScript?

### What are some best practices for writing maintainable JavaScript code?

---
