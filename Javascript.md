## Javascript Interview Questions

### Are you familiar with ES6 and what are some of the advantages over ES5?

ES6 (ECMAScript 2015) introduced several important features and improvements over ES5:

-   Arrow functions for shorter function syntax
-   let and const for block-scoped variables
-   Template literals for string interpolation
-   Destructuring assignments
-   Default parameters
-   Rest and spread operators
-   Classes for cleaner object-oriented programming
-   Modules for better code organization
-   Promises for improved async handling
-   Map and Set data structures

### How are you leveraging ES6 in your current project?

Common ways to leverage ES6 in projects:

-   Using arrow functions for callbacks and methods
-   Implementing async/await for cleaner asynchronous code
-   Using destructuring for cleaner object/array handling
-   Leveraging modules for better code organization
-   Using template literals for dynamic string creation
-   Implementing classes for object-oriented patterns
-   Using const/let for better variable scoping

### What are the differences between var, let, and const?

1. var:

-   Function-scoped or globally-scoped
-   Can be redeclared and updated
-   Hoisted to the top of its scope
-   Can be accessed before declaration

2. let:

-   Block-scoped
-   Can be updated but not redeclared
-   Not hoisted
-   Cannot be accessed before declaration

3. const:

-   Block-scoped
-   Cannot be updated or redeclared
-   Not hoisted
-   Cannot be accessed before declaration

### What are the differences between promises and async/await?

Promises:

-   Object representing eventual completion of async operation
-   Uses .then(), .catch(), and .finally() chains
-   Can handle multiple promises with Promise.all()
-   More verbose for multiple async operations

Async/Await:

-   Syntactic sugar over promises
-   Makes async code look synchronous
-   Easier to read and maintain
-   Better error handling with try/catch
-   Must be used within async function
-   Await can only be used on promises

### How to ensure browser compatibility for ES6 features?

Several approaches:

1. Transpilation:

-   Use Babel to convert ES6+ code to ES5
-   Configure appropriate browser targets

2. Polyfills:

-   Include polyfills for missing features
-   Use core-js or similar libraries

3. Build Tools:

-   Webpack or similar bundlers with proper configuration
-   Automated transpilation and polyfill injection

### TypeScript vs JavaScript: Advantages and Disadvantages

TypeScript Advantages:

-   Static typing
-   Better IDE support
-   Enhanced code maintainability
-   Early error detection
-   Better refactoring support
-   Object-oriented features

TypeScript Disadvantages:

-   Additional learning curve
-   Extra compilation step
-   Larger project setup
-   Can be overly verbose
-   Requires type definitions

### What is an immutable object and its significance?

An immutable object is one whose state cannot be changed after creation.

Significance:

-   Predictable behavior
-   Easier debugging
-   Thread safety
-   Better for functional programming
-   Helps prevent side effects
-   Simpler application state management

### What is "hoisting" in JavaScript?

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during compilation.

Key points:

-   Variable declarations are hoisted
-   Function declarations are hoisted
-   let and const are hoisted but not initialized (temporal dead zone)
-   Only declarations are hoisted, not initializations

### What is the Event Loop in JavaScript?

The Event Loop is a programming construct that waits for and dispatches events in a program.

Components:

1. Call Stack: Executes synchronous code
2. Web APIs: Handles async operations
3. Callback Queue: Stores completed async operations
4. Microtask Queue: Handles promises
5. Event Loop: Checks queues and moves callbacks to stack

### What is 'this' keyword in JS?

'this' refers to the current execution context.

Behavior varies by context:

-   In global scope: refers to global object
-   In object method: refers to the object
-   In regular function: refers to global object (non-strict) or undefined (strict)
-   In arrow function: inherits this from enclosing scope
-   In event handler: refers to element that triggered event

### What is debouncing and throttling?

Debouncing:

-   Delays function execution until after pause in calls
-   Useful for search inputs, window resize
-   Only executes after specified delay

Throttling:

-   Limits function execution to fixed time interval
-   Useful for scroll events, game loops
-   Executes at regular intervals

### What is functional programming?

Functional programming is a programming paradigm where programs are constructed by applying and composing functions.

Key concepts:

-   Pure functions
-   Immutability
-   First-class functions
-   Higher-order functions
-   Function composition
-   Avoiding side effects
-   Declarative rather than imperative

### How to achieve functional chaining?

Functional chaining involves calling multiple methods in sequence:

```javascript
const result = [1, 2, 3, 4]
    .map((x) => x * 2)
    .filter((x) => x > 4)
    .reduce((acc, curr) => acc + curr, 0);
```

Requirements:

-   Each method returns an object
-   Methods are chainable
-   Maintains immutability
-   Clear data flow

### How to curry a function?

Currying is transforming a function with multiple arguments into a sequence of functions with single arguments.

Example:

```javascript
// Regular function
const add = (a, b, c) => a + b + c;

// Curried version
const curriedAdd = (a) => (b) => (c) => a + b + c;

// Usage
const result = curriedAdd(1)(2)(3); // Returns 6
```

Benefits:

-   Partial application
-   Function composition
-   More reusable code
-   Better abstraction
