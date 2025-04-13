# Node.js Interview Questions

## General Node.js Questions

### What is Node.js, and what is it used for?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side, making it a popular choice for building scalable network applications.

### How does Node.js handle asynchronous operations?

Node.js uses an event-driven, non-blocking I/O model, which allows it to handle multiple requests concurrently without blocking the execution of other tasks.

### Explain the Event Loop in Node.js.

The event loop is a mechanism that handles asynchronous operations in Node.js. It continuously checks for pending events (e.g., incoming network requests) and executes their associated callbacks when they are ready. This allows Node.js to handle a large number of concurrent connections efficiently.

### What are the advantages of using Node.js?

### How do you handle errors in Node.js?

### What is the role of the “package.json” file?

### How can you share code across multiple files in Node.js?

### What is NPM, and why is it used in Node.js?

### What are callbacks in Node.js, and how do you handle callback hell?

### How does Node.js handle multi-threading?

## Module System and NPM

### What is the CommonJS module system in Node.js?

### How do you import modules in Node.js?

### What is the difference between “require” and “import”?

### How can you create custom NPM modules and publish them?

### What is the purpose of the “package-lock.json” file?

## Architecture and Concurrency

### What’s the point of Node.js being ‘single-threaded’?

### Does Node.js possess ‘child threads’? If yes, how are they used?

### What are worker processes in Node.js, and how do they operate?

### How does clustering work in Node.js for scaling applications across multiple CPU cores?

### Explain the difference between `process.nextTick()` and `setImmediate()` in the event loop.

### Describe microtasks and macrotasks in the Node.js event loop.

## Event-driven Programming

### What is ‘event-driven’ programming in Node.js?

### Describe what an ‘event’ is in the context of Node.js.

### Explain callback hell and how to resolve it.

### How can you use event emitters to create custom asynchronous workflows?

## Streams and Buffers

### What are streams in Node.js, and what are their types (Readable, Writable, Duplex, Transform)?

### How do you create a custom transform stream in Node.js?

### What is the difference between buffers and streams, and when should each be used?

### How would you use streams to process large files efficiently?

## Child Processes

### How can you use `spawn()` and `fork()` methods to manage child processes in Node.js?

### What are common use cases for child processes, such as parallel computation or background tasks?

## Security

### General Security Questions

### What are the main security implementations within Node.js applications (e.g., authentication, error handling)?

### Specific Scenarios

### How would you secure sensitive data like API keys in a Node.js project?

### Use environment variables with dotenv files (.env).

### Avoid hardcoding credentials in source code.

### How do you prevent common vulnerabilities like SQL injection and Cross-Site Scripting (XSS) attacks in Node.js applications?

### Explain how to implement rate-limiting to mitigate brute-force attacks.

### Techniques

### How does the crypto module handle encryption and hashing in Node.js?

### Explain how to securely store passwords using salting and hashing techniques like bcrypt or PBKDF2.

## API Design

### RESTful APIs

### How would you design a RESTful API using Express.js in Node.js?

### Define routes.

### Separate controllers, services, and models.

### Follow HTTP methods appropriately (GET, POST, PUT, DELETE).

### Advanced API Topics

### How would you implement API versioning in a Node.js application?

## Real-time Communication

### How do WebSockets differ from HTTP protocols in terms of real-time communication?

### What are common use cases for WebSockets, such as chat applications or live updates?

### How would you implement WebSocket communication in a Node.js application using libraries like `ws` or Socket.IO?

## Performance Optimization

### General Techniques

### Use asynchronous code.

### Implement caching strategies (Redis, CDN).

### Specific Scenarios

### Optimize database queries.

### How can you identify memory leaks in a Node.js application using tools like Chrome DevTools or `node-memwatch`?

### What strategies can be used to optimize CPU usage and reduce bottlenecks?

## Memory Management

### How does garbage collection work in Node.js, and what are its limitations?

### What techniques can be used to optimize memory usage in high-load applications?

### Use streams for large data handling.

### Release unused references.

## Error Handling

### What are best practices for implementing centralized error handling middleware in Express.js?

### How can you create custom error objects for better debugging?

## Testing Strategies

### How do you write unit tests for asynchronous code using libraries like Mocha or Jest?

### Explain the role of stubs and mocks in testing Node.js applications.

## Deployment and DevOps

### What is Continuous Integration/Continuous Deployment (CI/CD), and how can it be implemented with Node.js projects?

### How do reverse proxies like Nginx enhance the scalability of Node.js applications?
