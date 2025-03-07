## TypeScript Interview Questions

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

### <a>When should you use the unknown type?</a>

The `unknown` type is a safer alternative to `any`. It's best used when:

-   You don't know the type at compile time
-   You need to perform runtime type checks
-   Working with external API responses
-   Handling user input

Example:

```typescript
function processValue(val: unknown): string {
    if (typeof val === 'string') {
        return val.toUpperCase();
    }
    if (typeof val === 'number') {
        return val.toString();
    }
    throw new Error('Invalid type');
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

-   Pick utility type
-   Omit utility type
-   Partial utility type
-   Required utility type

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

Union types (|) represent values that can be one of several types, while intersection types (&) combine multiple types into one.

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
