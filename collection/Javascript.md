# Javascript interview Questions

## Basics & Data Types

### What are the different data types in JavaScript?

| Data Type | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| Number    | Represents both integer and floating-point numbers.                 |
| String    | Represents textual data.                                            |
| Boolean   | Represents a logical entity and can have two values: true or false. |
| Null      | Represents the intentional absence of any object value.             |
| Undefined | Represents a variable that has not been assigned a value.           |
| Object    | Represents a collection of properties.                              |
| Array     | Represents an ordered collection of values.                         |
| Function  | Represents a reusable block of code.                                |
| Symbol    | Represents a unique and immutable value.                            |

### What is the difference between `null` and `undefined`?

`null` is an assignment value. It can be assigned to a variable as a representation of no value.

### How does JavaScript handle type coercion?

JavaScript is a dynamically typed language, which means that data types of variables are determined by the value they hold at runtime and can change throughout the program as we assign different values to them.

### What is the difference between `==` and `===` in JavaScript?

`==` and `===` are both comparison operators. The difference between both of them is that == is used to compare values whereas === is used to compare both value and types.

### Explain the difference between `let`, `const`, and `var`.

| Feature | var | let | const |
| -- | - | | - |
| Scope | Function-scoped or globally-scoped | Block-scoped | Block-scoped |
| Redeclaration/Update | Can be redeclared and updated | Can be updated but not redeclared | Cannot be updated or redeclared |
| Hoisting | Hoisted to the top of its scope | Not hoisted | Not hoisted |

Example:

```javascript
var x = 1;
var x = 2; // Valid

let y = 1;
// let y = 2; // Error: cannot redeclare

const z = 1;
// z = 2; // Error: cannot reassign
```

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

## Functions & Scope

### What is the difference between function declaration and function expression?

`Function declaration`: A function declaration defines a named function and is hoisted to the top of its scope.

```javascript
function greet(name) {
    console.log('Hello, ' + name + '!');
}
```

`Function expression`: A function expression defines a function as a value assigned to a variable.

```javascript
const greet = function (name) {
    console.log('Hello, ' + name + '!');
};
```

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

### What is a closure in JavaScript, and why is it useful?

A closure is a function that has access to variables from its outer (enclosing) function's scope chain, even after the outer function has returned. Closures are useful because they allow functions to maintain access to variables that were defined in a parent function, even after the parent function has finished executing.
Example:

```javascript
function outerFunction() {
    let outerVariable = 'Hello';
    function innerFunction() {
        console.log(outerVariable);
        return innerFunction;
    }
    return innerFunction;
}
const closure = outerFunction();
closure(); // Output: Hello
```

### How does lexical scoping work in JavaScript?

Lexical scoping refers to the way in which variables are resolved in nested functions. In JavaScript, the scope of a variable is determined by its position in the source code, and variables defined in an outer function are accessible within inner functions, but not vice versa.
Example:

```javascript
function outerFunction() {
    let outerVariable = 'I am outside!';

    function innerFunction() {
        console.log(outerVariable); // Can access outerVariable
    }

    innerFunction();
}

outerFunction(); // Output: I am outside!
```

-   `outerFunction` defines a variable `outerVariable`.
-   `innerFunction` is nested inside `outerFunction` and has access to `outerVariable` due to lexical scoping.
-   When `innerFunction` is called, it can access and log `outerVariable` even though `outerVariable` is defined in the outer function.

### What is the difference between `synchronous` and `asynchronous` functions?

`synchronous` functions are executed immediately, while asynchronous functions are executed later.
`asynchronous` functions are used for tasks that may take a long time to complete, such as making API requests or reading from a file.

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

The `Object.create()` method in JavaScript is used to create a new object with a specified prototype object and properties. It allows you to set the prototype of the new object to an existing object, enabling inheritance of properties and methods.
Example:

```javascript
// Define a prototype object
const personPrototype = {
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    },
};

// Create a new object with personPrototype as its prototype
const person = Object.create(personPrototype);
person.name = 'John';
person.greet(); // Output: Hello, my name is John

// Verify the prototype
console.log(Object.getPrototypeOf(person) === personPrototype); // true
```

### What is the difference between `Object.freeze()`, `Object.seal()`, and `Object.assign()`?

`Object.freeze()` Object.freeze() is used to make an object immutable. Once an object is frozen, you cannot add, remove, or modify its properties.
It provides shallow immutability, meaning nested objects are not frozen.

Example:

```javascript
const obj = {
    name: 'John',
    age: 30,
};

Object.freeze(obj);

obj.age = 31; // This will not change the age property
obj.address = '123 Street'; // This will not add a new property

console.log(obj); // Output: { name: 'John', age: 30 }
```

`Object.seal()` is used to prevent new properties from being added to an object and existing properties from being removed. However, you can still modify the values of existing properties. Like Object.freeze(), it provides shallow sealing.

Example:

```javascript
const obj = {
    name: 'John',
    age: 30,
};

Object.seal(obj);

obj.age = 31; // This will change the age property
delete obj.name; // This will not delete the name property
obj.address = '123 Street'; // This will not add a new property

console.log(obj); // Output: { name: 'John', age: 31 }
```

Object.assign() is used to copy the values of all enumerable own properties from one or more source objects to a target object. It returns the target object.

Example:

```javascript
const target = {
    name: 'John',
};

const source = {
    age: 30,
    address: '123 Street',
};

Object.assign(target, source);

console.log(target); // Output: { name: 'John', age: 30, address: '123 Street' }
```

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

Deep cloning an object in JavaScript involves creating a new object with the same structure and values as the original object. This is useful when you want to create a copy of an object that is independent of the original, especially when dealing with nested objects or arrays.

-   Using JSON.parse() and JSON.stringify()
    This method is simple but has limitations, such as not handling functions, undefined, Infinity, NaN, and circular references.
    ```javascript
    const original = {
        name: 'John',
        age: 30,
        address: {
            city: 'New York',
            zip: '10001',
        },
    };
    ```
-   Using a Recursive Function: This method handles more complex cases, including nested objects and arrays.

    ```javascript
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            const arrCopy = [];
            for (let i = 0; i < obj.length; i++) {
                arrCopy[i] = deepClone(obj[i]);
            }
            return arrCopy;
        }

        const objCopy = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                objCopy[key] = deepClone(obj[key]);
            }
        }
        return objCopy;
    }

    const original = {
        name: 'John',
        age: 30,
        address: {
            city: 'New York',
            zip: '10001',
        },
    };

    const clone = deepClone(original);
    console.log(clone); // { name: 'John', age: 30, address: { city: 'New York', zip: '10001' } }

    const clone = JSON.parse(JSON.stringify(original));
    console.log(clone); // { name: 'John', age: 30, address: { city: 'New York', zip: '10001' } }
    ```

### What are getters and setters in JavaScript, and how do you use them?

Getters and setters in JavaScript are special methods that provide a way to access and update the properties of an object. They allow you to define custom behavior when getting or setting a property value.

`Getters`: Getters are methods that get the value of a specific property. They are defined using the get keyword.

`Setters`: Setters are methods that set the value of a specific property. They are defined using the set keyword.

Example:

```javascript
const person = {
    firstName: 'John',
    lastName: 'Doe',

    // Getter for fullName
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // Setter for fullName
    set fullName(name) {
        const [first, last] = name.split(' ');
        this.firstName = first;
        this.lastName = last;
    },
};

// Using the getter
console.log(person.fullName); // Output: John Doe

// Using the setter
person.fullName = 'Jane Smith';
console.log(person.firstName); // Output: Jane
console.log(person.lastName); // Output: Smith
```

## Advanced JavaScript Concepts

## Event Loop & Asynchronous JavaScript

### How does the JavaScript event loop work?

### What is the difference between microtasks and macrotasks?

### How do `setTimeout()` and `setInterval()` work in JavaScript?

### Explain the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`.

### How does async/await work internally?

## Closures & Higher-Order Functions

### What is a closure, and how does it work?

### How do you create a private variable using closures in JavaScript?

### What are higher-order functions, and how are they used?

### How does JavaScript handle callback functions?

### What is function currying, and how does it work?

Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This allows you to create specialized functions with fewer arguments.

```javascript
export const curryN = (fn, len = fn.length) => {
    return function curried(...args) {
        if (args.length >= len) {
            return fn(...args);
        }
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
};

const sum = (a, b) => {
    return a + b;
};

const curriedSum = curryN(sum);

console.log(curriedSum(2)(3));
```

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

this can be bound to a specific object using the following methods:

1. `bind()`: Creates a new function with a specified this value and arguments.
2. `call()`: Calls a function with a specified this value and arguments.
3. `apply()`: Calls a function with a specified this value and an array of arguments.

### How does arrow function handle `this` differently from regular functions?

Arrow functions do not have their own this value. Instead, they inherit the this value from the enclosing lexical context.
Example:

```javascript
const obj = {
    name: 'John',
    greet: function () {
        setTimeout(() => {
            console.log(`Hello, ${this.name}!`);
        }, 10);
    },
};
obj.greet(); // "Hello, John!"
```

### What is the difference between implicit and explicit binding in JavaScript?

Implicit binding: When a method is called on an object, the `this` keyword is implicitly bound to that object.

Explicit binding: When a function is called using call(), apply(), or bind(), the this keyword is explicitly set to a specific value.

## Object-Oriented JavaScript

### What is the difference between a class and a constructor function in JavaScript?

| Features            | Class                                           | Constructor Function                          |
| ------------------- | ----------------------------------------------- | --------------------------------------------- |
| Syntax              | `class ClassName { ... }`                       | `function ConstructorFunction() { ... }`      |
| Constructor         | Automatically called when creating an instance  | Must be called explicitly                     |
| Instance creation   | `const instance = new ClassName();`             | `const instance = new ConstructorFunction();` |
| Methods             | Can define methods directly in                  |
| the class           | Methods must be defined outside the constructor |
| Inheritance         | Supports single inheritance                     | Supports single inheritance                   |
| Static members      | Supported                                       | Not supported                                 |
| Private members     | Not supported                                   | Not supported                                 |
| Getters and setters | Supported                                       | Not supported                                 |

### How do you implement inheritance using JavaScript classes?

Inheritance in JavaScript can be achieved using the `extends` keyword. Here's an example:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(`${this.name} eats.`);
    }
}
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    bark() {
        console.log(`${this.name} barks!`);
    }
}
const dog = new Dog('Buddy', 'Golden Retriever');
dog.bark(); // "Buddy barks!"
dog.eat(); // "Buddy eats."
```

### What is the difference between static and instance methods in JavaScript?

`Static` methods are methods that are called directly on the class itself, without creating an instance of the class. They are often used for utility functions or constants.

`Instance` methods are methods that are called on an instance of a class. They have access to the instance's properties and methods.

Example:

```javascript
class MathUtils {
    static PI = 3.14;
    static add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
}
console.log(MathUtils.PI); // 3.14
console.log(MathUtils.add(2, 3)); // 5
const mathUtils = new MathUtils();
console.log(mathUtils.multiply(2, 3)); // 6
```

### How does method overriding work in JavaScript?

Method overriding allows a subclass to provide a different implementation of a method that is already defined in its parent class.

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speaks() {}
}
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    speaks() {
        console.log(`${this.name} barks!`);
    }
}
const dog = new Dog('Buddy', 'Golden Retriever');
dog.speaks(); // "Buddy barks!"
```

### What is the role of the `super` keyword in JavaScript classes?

The `super` keyword is used to call the constructor of the parent class. It can also be used to call methods of the parent class.

## Memory Management & Performance Optimization

### What are memory leaks in JavaScript, and how can you prevent them?

Memory leaks occur when unused memory is not properly released, leading to a gradual increase in memory usage over time. To prevent memory leaks, you can:

-   Avoid creating global variables.
-   Clean up event listeners when they are no longer needed.
-   Use garbage collection mechanisms provided by the JavaScript engine.

### What is the difference between garbage collection and memory management in JavaScript?

`Garbage` collection is the process by which the JavaScript engine automatically manages memory by identifying and releasing unused memory.

`Memory management`, on the other hand, involves manually allocating and deallocating memory using constructs like `new` and `delete`.

### How does garbage collection work in JavaScript?

Garbage collection in JavaScript is handled by the JavaScript engine, which periodically runs a garbage collection algorithm to identify and release unused memory. The garbage collection algorithm identifies objects that are no longer reachable by the program and frees up their memory. The garbage collection algorithm is implemented differently in different JavaScript engines, but the general idea is to identify objects that are no longer reachable by the program and free up their memory.

### What are weak references in JavaScript, and when should you use them?

Weak references are a type of reference that does not prevent an object from being garbage collected.
They are useful when you want to associate an object with another object without preventing the original object from being garbage collected.

### How does JavaScript optimize function execution using inline caching?

JavaScript engines use inline caching to optimize function execution. When a function is called, the engine checks if it has already been called with the same arguments before. If so, it can skip the function call and use the cached result.

### How can you improve JavaScript performance when working with large data sets?

To improve JavaScript performance when working with large data sets, you can:

-   Use efficient data structures like arrays and objects.
-   Minimize the number of operations performed on large data sets.
-   Use lazy loading techniques to load data only when needed.
-   Use parallel processing techniques to process large data sets in parallel.

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

## Modules & Design Patterns

### What are ES6 modules, and how do they work?

ES6 modules are a way to organize and reuse JavaScript code in a modular way. They allow you to split your code into separate files, each containing a module. Modules can be imported and exported between different files, allowing you to reuse code across your application.

```javascript
// module.js
export function add(a, b) {
    return a + b;
}
// main.js
import { add } from './module.js';
console.log(add(2, 3)); // Output: 5
```

### What is the difference between default and named exports?

`default export`: allows only one default export per module and can be imported without specifying the name.
`named export`: allows multiple named exports per module and must be imported with the specified name.

### How does the Module Pattern work in JavaScript?

The Module Pattern is a design pattern used to encapsulate and organize code into reusable modules. It allows you to create private and public variables and functions, and provides a way to expose only the necessary functionality to the outside world.

### What is the difference between CommonJS and ES6 modules?

`CommonJS`: used in Node.js and older browsers. Uses `require()` and `module.exports`.
`ES6 modules`: used in modern browsers and Node.js. Uses `import` and `export`.

### What are some common JavaScript design patterns, and when should they be used?

`Singleton`: used to ensure that only one instance of a class is created.

```javascript
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            return Singleton.instance;
        }
        return Singleton.instance;
    }
}
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // Output: true
```

`Observer`: used to notify multiple objects when a change occurs.

```javascript
// Observer Pattern
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }
}
```

`Factory`: used to create objects without specifying the exact class of the object that will be created.

```javascript
// Factory Pattern
class CarFactory {
    createCar(type) {
        switch (type) {
            case 'sedan':
                return new Sedan();
            case 'suv':
                return new SUV();
        }
    }
}
```

`Decorator`: used to add new functionality to an object without changing its structure.

```javascript
// Decorator Pattern
class Coffee {
    cost() {
        return 5;
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 2;
    }
}
```

`Strategy`: used to define a family of algorithms, encapsulate each one, and make them interchangeable.

```javascript
// Strategy Pattern
class PaymentStrategy {
    constructor(strategy) {
        this.strategy = strategy;
    }

    pay(amount) {
        return this.strategy.pay(amount);
    }
}

const creditCardStrategy = {
    pay: (amount) => `Paid ${amount} using credit card`,
};
```

`MVC`: used to separate the application into three interconnected parts: the model, the view, and the controller.

```javascript
// MVC Pattern
class Model {
    constructor() {
        this.data = null;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

class View {
    render(data) {
        console.log(`Rendering: ${data}`);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    updateView() {
        this.view.render(this.model.getData());
    }
}
```

## DOM Manipulation & Events

### How does event delegation work in JavaScript?

Event delegation is a technique in JavaScript where a single event listener is attached to a parent element, and events are handled on the child elements based on their event type.

### What is the difference between `target` and `currentTarget` in event handling?

`target`: The element that triggered the event.
`currentTarget`: The element that the event listener is attached to.

### What are event capturing and event bubbling in JavaScript?

`Event capturing`: The event starts from the top of the DOM tree and moves down to the target element.
`Event bubbling`: The event starts from the target element and moves up to the top of the DOM tree.
`Event delegation`: A technique in JavaScript where a single event listener is attached to a parent element, and events are handled on the child elements based on their event type.

### How do you remove an event listener in JavaScript?

```javascript
const element = document.getElementById('myElement');
element.removeEventListener(event, function, useCapture);
```

### What are `MutationObserver` and `IntersectionObserver`, and how do they work?

`MutationObserver`: A JavaScript API that allows you to observe changes to the DOM tree and respond to those changes.
`IntersectionObserver`: A JavaScript API that allows you to observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Error Handling & Debugging

### How does JavaScript handle errors using try-catch?

```javascript
function myFunction() {
    try {
    // Code that may throw an error
    catch (error) {
        // Code to handle the error
    }
    }
};
```

### What is the difference between `throw` and `console.error()`?

`throw`: Used to throw an error.
`console.error()`: Used to log an error to the console.

### What is the purpose of the `finally` block in JavaScript?

The `finally` block is used to execute code after a try-catch block, regardless of whether an error was thrown or not.

```javascript
 try {
    // Code that may throw an error
    catch (error) {
        // Code to handle the error
        finally {
            // Code that will always be executed
        }
    }
 }
```

### How can you create a custom error in JavaScript?

```javascript
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
        this.message = message;
    }
}
throw new CustomError('This is a custom error');
```

## Modern JavaScript Features

### What are template literals, and how do they work?

Template literals are string literals that allow embedded expressions and multiline strings. They use backticks (`) instead of quotes.

```javascript
const name = 'John';
const greeting = `Hello ${name}!
This is a multiline string.`;
```

### How does optional chaining (`?.`) work in JavaScript?

Optional chaining allows you to safely access nested object properties without causing an error if an intermediate property is null or undefined.

```javascript
const user = {
    address: {
        street: 'Main St',
    },
};
console.log(user?.address?.street); // 'Main St'
console.log(user?.contact?.phone); // undefined
```

### What is the purpose of the `??` (nullish coalescing) operator?

The nullish coalescing operator provides a way to specify a default value when a value is null or undefined.

```javascript
const value = null;
const defaultValue = value ?? 'default'; // 'default'
const zero = 0 ?? 42; // 0
```

### What are the benefits of using `BigInt` in JavaScript?

BigInt allows you to work with numbers larger than 2^53-1, which is the largest number JavaScript can reliably represent with the Number primitive.

```javascript
const bigNumber = 9007199254740991n;
const result = bigNumber + 1n;
```

### How do private class fields work in JavaScript?

Private class fields are declared with a # prefix and are only accessible within the class.

```javascript
class Example {
    #privateField = 'private';

    getPrivateField() {
        return this.#privateField;
    }
}
```

## Security & Best Practices

### How can you prevent Cross-Site Scripting (XSS) in JavaScript?

-   Sanitize user input
-   Use Content Security Policy
-   Encode output
-   Use modern frameworks that automatically escape content

```javascript
function sanitizeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&',
            '<': '<',
            '>': '>',
            '"': '"',
            "'": '''
        };
        return escape[match];
    });
}
```

### What are some common security vulnerabilities in JavaScript applications?

1. Cross-Site Scripting (XSS)
2. Cross-Site Request Forgery (CSRF)
3. Insecure Dependencies
4. DOM-based vulnerabilities
5. Injection attacks

### How does Content Security Policy (CSP) help secure JavaScript applications?

CSP is a security layer that helps detect and prevent attacks like XSS by specifying which resources can be loaded and executed.

```html
<meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self'"
/>
```

### How do you safely handle user input in JavaScript?

1. Validate input on both client and server side
2. Sanitize input before processing
3. Use input type validation
4. Implement proper error handling

```javascript
function validateInput(input) {
    const sanitized = sanitizeHTML(input);
    if (sanitized.length < 3) throw new Error('Input too short');
    return sanitized;
}
```

### What are some best practices for writing maintainable JavaScript code?

1. Use consistent naming conventions
2. Write modular code
3. Comment your code appropriately
4. Follow SOLID principles
5. Use proper error handling
6. Write tests

## Data Structures & Algorithms

### How do you implement a stack in JavaScript?

```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
```

### How do you implement a queue using JavaScript?

```javascript
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
```

### How do you implement a linked list in JavaScript?

```javascript
// Node class for a linked list
export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
// LinkedList class with basic operations
export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a node to the end of the list
    append(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }

        this.size++;
        return this;
    }

    // Print the linked list (up to a limit to avoid infinite loops)
    print(limit = 20) {
        let current = this.head;
        let count = 0;
        let result = '';

        while (current && count < limit) {
            result += current.data + ' -> ';
            current = current.next;
            count++;

            // Break if we've come back to the head (circular list)
            if (current === this.head) {
                result += '(back to head)';
                break;
            }
        }

        if (count === limit) {
            result += '... (stopped to prevent infinite loop)';
        } else if (!current) {
            result += 'null';
        }

        console.log(result);
    }
}
```

### What is the difference between `map`, `filter`, and `reduce`?

-   `map`: Creates a new array by transforming each element
-   `filter`: Creates a new array with elements that pass a test
-   `reduce`: Reduces an array to a single value

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((x) => x * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter((x) => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
```

### How do you remove duplicates from an array in JavaScript?

```javascript
// Using Set
const array = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(array)]; // [1, 2, 3, 4, 5]

// Using filter
const unique2 = array.filter((item, index) => array.indexOf(item) === index);
```

### What is the best way to find the largest/smallest number in an array?

```javascript
const numbers = [1, 5, 2, 8, 3, 9];

// Using Math.max/min
const largest = Math.max(...numbers); // 9
const smallest = Math.min(...numbers); // 1

// Using reduce
const largest2 = numbers.reduce((max, curr) => Math.max(max, curr));
const smallest2 = numbers.reduce((min, curr) => Math.min(min, curr));
```

### How do you reverse a string in JavaScript?

```javascript
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Example usage:
const originalString = 'Hello, World!';
const reversedString = reverseString(originalString);
console.log(reversedString); // Output: "!dlroW ,olleH"
```

### How to chunks an array into smaller arrays of a specific size?

```javascript
const chunk = (arr, size) => {
    let out = [];
    for (let pos = 0; pos < arr.length; pos += size) {
        out.push(arr.slice(pos, pos + size));
    }
    return out;
};
let array = [1, 2, 3, 4, 5, 6, 7];
console.log(chunk(array, 3));
/* Output:
[[1, 2, 3], [4, 5, 6], [7]] */
```

### How to check if a string is a anagram of another string?

```javascript
const cleanUp = (str) => {
    return str.replace(/\W/g, '').toLowerCase().split('').sort().join('');
};

const anagrams = (str1, str2) => {
    return cleanUp(str1) === cleanUp(str2);
};

console.log(cleanUp('RAIL! SAFETY!'));
console.log(anagrams('RAIL! SAFETY!', 'fairy tales')); // Output: true
```

### How to find the first non-repeating character in a string?

```javascript
function firstNonRepeatingChar(str) {
    let map = {};
    for (let char of str) {
        map = {
            ...map,
            [char]: (map[char] ?? 0) + 1,
        };
    }
    for (let char of str) {
        if (map[char] === 1) return char;
    }
    return null;
}

console.log(firstNonRepeatingChar('aabbccddeefg')); // Output: "f"
```

### How to find most frequent char?

```javascript
export const mostFrequentChar = (str) => {
    let map = {};
    let maxChar = '';
    let maxCount = 0;

    for (const char of str) {
        map = {
            ...map,
            [char]: (map[char] ?? 0) + 1,
        };
        if (map[char] > maxCount) {
            maxChar = char;
            maxCount = map[char];
        }
    }
    // Object.entries(map).sort((a, b) => b[1] - a[1]);
    return { maxChar, maxCount };
};

const input = 'ABBAAdBd5BBB';
console.log(mostFrequentChar(input)); // Output: 'B'
```

### How to find apply bubble-sort algorithm?

```javascript
const bubbleSortRecursive = (arr) => {
    let swapped = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;
        }
    }
    if (swapped) {
        return bubbleSort(arr);
    }
    return arr;
};

const bubbleSort = (arr) => {
    let swapped = false;
    let n = arr.length;
    do {
        swapped = false;
        for (let i = 0; i < n; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    return arr;
};

let Input = [32, 12, 45, 54, 23, 11];

console.log('bubbleSort', bubbleSort(Input));

console.log('bubbleSortRecursive', bubbleSortRecursive(Input));
```

### How to find apply merge-sort algorithm?

-   Merge Sort (O(n log n)) – Best for stability & large datasets
-   Time Complexity:
-   Worst: O(n log n)
-   Average: O(n log n)
-   Best: O(n log n)
-   Space Complexity: O(n)
-   Stable Sort: Yes ✅
-   Good For: Large datasets, linked lists, stable sorting.

```javascript
const merge = (left, right) => {
    const result = [];

    while (left.length && right.length) {
        result.push(left[0] < right[0] ? left.shift() : right.shift());
    }

    return [...result, ...left, ...right];
};

const mergeSort = (arr) => {
    if (arr.length == 0 || arr.length == 1) return arr;

    const mid = Math.ceil(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));

    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

let Input = [32, 12, 45, 54, 23, 11];

console.log('mergeSort', mergeSort(Input));
```

### How to find apply quick-sort algorithm?

-   Quick Sort (O(n log n)) – Best for in-place sorting & fast execution
-   Time Complexity:
-   Worst: O(n²) (rarely happens)
-   Average: O(n log n)
-   Best: O(n log n)
-   Space Complexity: O(log n)
-   Stable Sort: No ❌
-   Good For: General use, large datasets, in-place sorting.

```javascript
const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const piviot = arr[arr.length - 1];
    const left = arr.filter((a) => a < piviot);
    const right = arr.filter((a) => a > piviot);
    const middle = arr.filter((a) => a === piviot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
};

let Input = [20, 56, 45, 89, 89, 90];
console.log('quickSort', quickSort(Input));
```

### How to find apply selection sort algorithm?

-   Time Complexity:
    -   Worst: O(n²)
    -   Average: O(n²)
    -   Best: O(n²)
-   Space Complexity: O(1)
-   Stable Sort: ❌ No

```javascript
const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
};

let Input = [32, 12, 45, 54, 23, 11];

console.log('selectionSort', selectionSort(Input));
```

### How to use dutch national flag algorithm?

-   Sorting three unique values O(n) time & O(1) space ✅
-   Improving QuickSort on duplicate elements Reduces unnecessary swaps and recursion ✅
-   Color sorting in graphics Sorts pixels in O(n) time ✅
-   Partitioning three categories efficiently Single-pass partitioning ✅
-
-   🚫 When NOT to Use It?
-   ❌ If the array does not have exactly three unique values, other sorting algorithms (like
-   MergeSort or QuickSort) may be better.
-   ❌ If the dataset is already nearly sorted, an insertion sort (O(n)) may work faster.

```javascript
const sort = (arr) => {
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
    return arr;
};

console.log(sort([0, 1, 2, 0, 1, 2]));

/*
Input: arr[] = [0, 1, 2, 0, 1, 2]
Output: [0, 0, 1, 1, 2, 2]
Explanation: 0s 1s and 2s are segregated into ascending order.
Input: arr[] = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]
Output: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]
Explanation: 0s 1s and 2s are segregated into ascending order.

Follow up: Could you come up with a one-pass algorithm using only constant extra space?

*/
```
