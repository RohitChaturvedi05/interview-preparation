# Node.js Interview Questions

## General Node.js Questions

### What is Node.js, and what is it used for?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side, making it a popular choice for building scalable network applications.

Use cases:

-   Web servers and APIs
-   Real-time applications (chat, gaming)
-   Streaming applications
-   Microservices
-   Command-line tools

Example:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
```

### How does Node.js handle asynchronous operations?

Node.js uses an event-driven, non-blocking I/O model, which allows it to handle multiple requests concurrently without blocking the execution of other tasks. It achieves this through:

Callbacks: Functions passed as arguments to be executed after an operation completes
Promises: Objects representing the eventual completion or failure of an asynchronous operation
Async/Await: Syntactic sugar over promises that makes asynchronous code look synchronous

Example with callbacks:

```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});
console.log('Reading file...');
```

Example with promises:

```javascript
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
    .then((data) => {
        console.log('File content:', data);
    })
    .catch((err) => {
        console.error('Error reading file:', err);
    });
console.log('Reading file...');
```

Example with async/await:

```javascript
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

readFile();
console.log('Reading file...');
```

### Explain the Event Loop in Node.js.

The event loop is a mechanism that handles asynchronous operations in Node.js. It continuously checks for pending events (e.g., incoming network requests) and executes their associated callbacks when they are ready. This allows Node.js to handle a large number of concurrent connections efficiently.

Event Loop Phases:

-   **Timers**: Executes callbacks scheduled by setTimeout() and setInterval()
-   **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
-   **Idle, prepare**: Used internally by Node.js
-   **Poll**: Retrieves new I/O events and executes their callbacks
-   **Check**: Executes callbacks scheduled by setImmediate()
-   **Close callbacks**: Executes close event callbacks (e.g., socket.on('close', ...))

    **Example:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout callback');
}, 0);

setImmediate(() => {
    console.log('Immediate callback');
});

process.nextTick(() => {
    console.log('NextTick callback');
});

console.log('End');

// Output:
// Start
// End
// NextTick callback
// Timeout callback or Immediate callback (order may vary)
```

### What are the advantages of using Node.js?

-   **Single language for frontend and backend**: JavaScript can be used across the entire stack
-   **Non-blocking I/O**: Efficient handling of concurrent operations
-   **Fast execution**: V8 JavaScript engine provides high performance
-   **Large ecosystem**: NPM offers a vast collection of libraries and tools
-   **Scalability**: Well-suited for microservices and distributed systems
-   **Real-time capabilities**: Excellent for applications requiring real-time updates
-   **Community support**: Active community and extensive documentation

### How do you handle errors in Node.js?

-   **Try-catch blocks**: For synchronous code
-   **Error-first callbacks**: For asynchronous code using callbacks
-   **Promise rejection handling**: Using .catch() or try/catch with async/await
-   **Event emitters**: Using the 'error' event
-   **Global error handlers**: For uncaught exceptions and unhandled rejections

Example with try-catch:

```javascript
try {
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('Error caught:', error.message);
}
```

Example with promises:

```javascript
fetchData()
    .then((data) => processData(data))
    .catch((error) => {
        console.error('Error in data processing:', error);
        // Handle error or rethrow
    });
```

Example with global handlers:

```javascript
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    // Perform cleanup, logging, etc.
    process.exit(1); // Exit with error code
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    // Handle the error or exit
});
```

### What is the role of the “package.json” file?

The package.json file is a manifest for Node.js projects that contains metadata about the project and manages dependencies. Its key roles include:

-   **Project metadata**: Name, version, description, author, license
-   **Dependency management**: Lists dependencies and their versions
-   **Script definitions**: Defines commands for various tasks (build, test, start)
-   **Configuration**: Stores project configuration settings
-   **NPM behavior**: Controls how NPM behaves for the project

### How can you share code across multiple files in Node.js?

Node.js provides several ways to share code across files:

-   CommonJS modules: Using require() and module.exports
-   ES Modules: Using import and export (with .mjs extension or "type": "module" in package.json)
-   Global objects: Attaching properties to the global object (not recommended for most cases)

Example with CommonJS:

```javascript
// Exporting functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract,
};
```

Example with ES Modules:

```javascript
// Named exports
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Default export
export default {
    add,
    subtract,
};
```

### What is NPM, and why is it used in Node.js?

NPM (Node Package Manager) is the default package manager for Node.js. It serves several important purposes:

-   Dependency management: Installs and manages third-party libraries
-   Package publishing: Allows developers to share their code
-   Script running: Executes defined scripts in package.json
-   Version control: Manages package versions and updates
-   Project initialization: Creates new Node.js projects

### What are callbacks in Node.js, and how do you handle callback hell?

Callbacks are functions passed as arguments to other functions, to be executed after an operation completes. They're fundamental to Node.js's asynchronous programming model.

Callback hell (also known as "pyramid of doom") occurs when multiple nested callbacks create code that's difficult to read and maintain.

Example of callback hell:

```javascript
fs.readFile('file1.txt', 'utf8', (err, data1) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.readFile('file2.txt', 'utf8', (err, data2) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.readFile('file3.txt', 'utf8', (err, data3) => {
            if (err) {
                console.error(err);
                return;
            }
            // Process data1, data2, and data3
            console.log(data1, data2, data3);
        });
    });
});
```

Solutions to callback hell:

-   Named functions
-   Promises
-   Async/await

-   Control flow libraries like async.js:

```javascript
const fs = require('fs').promises;

async function readFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf8');
        const data2 = await fs.readFile('file2.txt', 'utf8');
        const data3 = await fs.readFile('file3.txt', 'utf8');
        console.log(data1, data2, data3);
    } catch (err) {
        console.error(err);
    }
}

readFiles();
```

### How does Node.js handle multi-threading?

Node.js is primarily single-threaded, running on a single main thread called the "event loop." However, it does provide mechanisms for multi-threading:

-   **Worker Threads**: For CPU-intensive tasks
-   **Child Processes**: For running separate Node.js instances
-   **Cluster Module**: For creating child processes that share server ports

**Example using Worker Threads**

```javascript
// main.js

const { Worker } = require('worker_threads');

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

async function main() {
    try {
        const result = await runWorker({ number: 50 });
        console.log('Fibonacci result:', result);
    } catch (err) {
        console.error(err);
    }
}

main();
```

```javascript
// worker.js
const { parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData.number);
parentPort.postMessage(result);
```

## Module System and NPM

### What is the CommonJS module system in Node.js?

### How do you import modules in Node.js?

### What is the difference between “require” and “import”?

### How can you create custom NPM modules and publish them?

## Architecture and Concurrency

### What's the point of Node.js being 'single-threaded'?

Node.js uses a single-threaded event loop model which enables it to handle multiple concurrent operations efficiently without the overhead of thread management and synchronization.
This design:

-   Simplifies programming by avoiding complex threading issues
-   Reduces memory usage compared to thread-per-request models
-   Enables non-blocking I/O operations through event-driven architecture

Example of non-blocking operation:

```javascript
fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
console.log('This runs while file is being read');
```

### Does Node.js possess 'child threads'? If yes, how are they used?

Yes, Node.js supports child threads through the Worker Threads module. They are useful for CPU-intensive tasks. They are separate from the main thread and can communicate with it using postMessage and on('message') methods.

Example using Worker Threads:

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log('From worker:', msg);
    });
} else {
    // This code runs in worker thread
    const result = heavyComputation();
    parentPort.postMessage(result);
}
```

### What are worker processes in Node.js, and how do they operate?

Worker processes are separate Node.js processes that can be spawned using the cluster module or child_process module. They enable parallel processing and better CPU utilization.

Example using child_process:

```javascript
const { fork } = require('child_process');

const worker = fork('worker.js');
worker.send({ task: 'process data' });
worker.on('message', (result) => {
    console.log('Worker result:', result);
});
```

### How does clustering work in Node.js for scaling applications across multiple CPU cores?

Clustering allows Node.js applications to create multiple worker processes that share server ports. The master process manages and distributes incoming connections among worker processes.

Example of clustering:

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Workers share the TCP connection
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello from worker ' + process.pid);
    }).listen(8000);
}
```

### Explain the difference between `process.nextTick()` and `setImmediate()` in the event loop.

-   process.nextTick() executes callback at the end of the current operation, before the next event loop iteration
-   setImmediate() executes callback in the next iteration of the event loop

Example showing execution order:

```javascript
setImmediate(() => {
    console.log('setImmediate');
});

process.nextTick(() => {
    console.log('nextTick');
});

// Output:
// nextTick
// setImmediate
```

### Describe microtasks and macrotasks in the Node.js event loop.

Microtasks are high-priority tasks that execute immediately after the current operation:

-   process.nextTick()
-   Promise callbacks
-   queueMicrotask()

Macrotasks are regular tasks in the event loop:

-   setTimeout()
-   setInterval()
-   setImmediate()
-   I/O operations

Example demonstrating execution order:

```javascript
Promise.resolve().then(() => console.log('microtask 1'));
process.nextTick(() => console.log('microtask 2'));
setTimeout(() => console.log('macrotask 1'), 0);
setImmediate(() => console.log('macrotask 2'));

// Output:
// microtask 2
// microtask 1
// macrotask 1
// macrotask 2
```

## Event-driven Programming

### What is ‘event-driven’ programming in Node.js?

### Describe what an ‘event’ is in the context of Node.js.

### Explain callback hell and how to resolve it.

### How can you use event emitters to create custom asynchronous workflows?

## Streams and Buffers

### What are streams in Node.js, and what are their types (Readable, Writable, Duplex, Transform)?

Streams are objects that let you read data from a source or write data to a destination in continuous fashion. There are four types of streams:

1. Readable Streams: Allow reading data from a source

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});
```

2. Writable Streams: Allow writing data to a destination

```javascript
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello World!');
writeStream.end();
```

3. Duplex Streams: Can both read and write data

```javascript
const { Duplex } = require('stream');
const duplexStream = new Duplex({
    read(size) {
        // implement read logic
    },
    write(chunk, encoding, callback) {
        // implement write logic
        callback();
    },
});
```

4. Transform Streams: Can modify or transform data as it is written and read

```javascript
const { Transform } = require('stream');
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    },
});
```

### How do you create a custom transform stream in Node.js?

Here's how to create a custom transform stream that converts text to uppercase:

```javascript
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}

// Usage example
const upperCaseStream = new UpperCaseTransform();
process.stdin.pipe(upperCaseStream).pipe(process.stdout);
```

### What is the difference between buffers and streams, and when should each be used?

Buffers:

-   Hold raw binary data in memory
-   Used for small amounts of data
-   Synchronous operations
-   Better for small files or fixed-length data

Example of Buffer usage:

```javascript
const buffer = Buffer.from('Hello World');
console.log(buffer.toString()); // Hello World
console.log(buffer.length); // 11
```

Streams:

-   Handle data in chunks
-   Memory efficient for large data
-   Asynchronous operations
-   Better for large files or real-time data

Example of Stream usage:

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('largefile.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
```

### How would you use streams to process large files efficiently?

Here's an example of processing a large file efficiently using streams:

```javascript
const fs = require('fs');
const { Transform } = require('stream');

// Create a transform stream for processing
const processLineStream = new Transform({
    transform(chunk, encoding, callback) {
        // Process each line of the file
        const lines = chunk.toString().split('\n');
        const processedLines = lines.map((line) => line.toUpperCase());
        this.push(processedLines.join('\n'));
        callback();
    },
});

// Create read and write streams
const readStream = fs.createReadStream('largefile.txt');
const writeStream = fs.createWriteStream('processed.txt');

// Pipeline for processing
readStream
    .pipe(processLineStream)
    .pipe(writeStream)
    .on('finish', () => {
        console.log('File processing completed');
    })
    .on('error', (error) => {
        console.error('Error processing file:', error);
    });

// Handle backpressure automatically through pipe()
```

This approach:

-   Processes file in chunks to minimize memory usage
-   Handles backpressure automatically
-   Uses error handling
-   Provides progress feedback
-   Can process files larger than available RAM

## Child Processes

### How can you use `spawn()` and `fork()` methods to manage child processes in Node.js?

The `spawn()` and `fork()` methods are used to create child processes in Node.js:

```javascript
// Using spawn()
const { spawn } = require('child_process');
const ls = spawn('ls', ['-l']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// Using fork()
const { fork } = require('child_process');
const child = fork('worker.js');

child.send({ hello: 'world' });
child.on('message', (msg) => {
    console.log('Message from child:', msg);
});
```

### What are common use cases for child processes, such as parallel computation or background tasks?

Common use cases include:

1. CPU-intensive calculations:

```javascript
// main.js
const { fork } = require('child_process');

function runParallelCalculation(numbers) {
    const child = fork('calculator.js');
    child.send(numbers);
    return new Promise((resolve) => {
        child.on('message', resolve);
    });
}

// calculator.js
process.on('message', (numbers) => {
    const result = numbers.map((n) => n * n);
    process.send(result);
});
```

2. Background tasks:

```javascript
const { spawn } = require('child_process');

function runBackgroundTask() {
    const task = spawn('node', ['background-task.js']);
    task.stdout.on('data', (data) => {
        console.log(`Task output: ${data}`);
    });
}
```

## Security

### General Security Questions

### What are the main security implementations within Node.js applications (e.g., authentication, error handling)?

Key security implementations include:

1. Authentication using JWT:

```javascript
const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
```

2. Error handling:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details:
            process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});
```

### Specific Scenarios

### How would you secure sensitive data like API keys in a Node.js project?

-   Use environment variables with dotenv files (.env).

-   Avoid hardcoding credentials in source code.

1. Using environment variables:

```javascript
// .env
API_KEY=your_secret_key
DATABASE_URL=mongodb://localhost:27017

// app.js
require('dotenv').config();
const apiKey = process.env.API_KEY;
```

2. Using configuration management:

```javascript
// config.js
module.exports = {
    development: {
        apiKey: process.env.DEV_API_KEY,
    },
    production: {
        apiKey: process.env.PROD_API_KEY,
    },
};
```

### How do you prevent common vulnerabilities like SQL injection and Cross-Site Scripting (XSS) attacks in Node.js applications?

1. Preventing SQL injection:

```javascript
// Bad practice
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Good practice using parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
connection.query(query, [userId]);
```

2. Preventing XSS:

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet()); // Adds various HTTP headers
app.use(express.json({ escape: true })); // Escapes HTML in JSON
```

### Explain how to implement rate-limiting to mitigate brute-force attacks.

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Techniques

### How does the crypto module handle encryption and hashing in Node.js?

```javascript
const crypto = require('crypto');

// Hashing
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Encryption
function encrypt(text, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
```

### Explain how to securely store passwords using salting and hashing techniques like bcrypt or PBKDF2.

```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
```

## API Design

### RESTful APIs

### How would you design a RESTful API using Express.js in Node.js?

```javascript
const express = require('express');
const router = express.Router();

// Routes
router.get('/users', UserController.getAll);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Controller
class UserController {
    static async getAll(req, res) {
        const users = await UserService.findAll();
        res.json(users);
    }
}

// Service
class UserService {
    static async findAll() {
        return User.find({});
    }
}

// Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
```

### Advanced API Topics

### How would you implement API versioning in a Node.js application?

1. URL versioning:

```javascript
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

2. Header versioning:

```javascript
app.use((req, res, next) => {
    const version = req.headers['accept-version'];
    req.apiVersion = version;
    next();
});
```

## Real-time Communication

### How do WebSockets differ from HTTP protocols in terms of real-time communication?

WebSockets maintain a persistent connection while HTTP is request-response based.

### What are common use cases for WebSockets, such as chat applications or live updates?

### How would you implement WebSocket communication in a Node.js application using libraries like `ws` or Socket.IO?

```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
```

## Performance Optimization

### General Techniques

### Use asynchronous code.

```javascript
// Bad
const result = fs.readFileSync('file.txt');

// Good
fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### Implement caching strategies (Redis, CDN).

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getCachedData(key) {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fetchData();
    await redis.set(key, JSON.stringify(data), 'EX', 3600);
    return data;
}
```

### Specific Scenarios

### Optimize database queries.

```javascript
// Bad
const users = await User.find({});
const activeUsers = users.filter((user) => user.isActive);

// Good
const activeUsers = await User.find({ isActive: true });
```

### How can you identify memory leaks in a Node.js application using tools like Chrome DevTools or `node-memwatch`?

```javascript
const memwatch = require('node-memwatch');

memwatch.on('leak', (info) => {
    console.log('Memory leak detected:', info);
});

const hd = new memwatch.HeapDiff();
// ... your code ...
const diff = hd.end();
console.log('Heap usage:', diff);
```

### What strategies can be used to optimize CPU usage and reduce bottlenecks?

## Memory Management

### How does garbage collection work in Node.js, and what are its limitations?

### What techniques can be used to optimize memory usage in high-load applications?

```javascript
// Using streams for large files
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
```

### Use streams for large data handling.

### Release unused references.

```javascript
function processData() {
    const heavyObject = {
        // large data
    };

    // Process data

    heavyObject = null; // Release reference
}
```

## Error Handling

### What are best practices for implementing centralized error handling middleware in Express.js?

```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
```

### How can you create custom error objects for better debugging?

## Testing Strategies

### How do you write unit tests for asynchronous code using libraries like Mocha or Jest?

```javascript
describe('User Service', () => {
    it('should create a new user', async () => {
        const userData = { name: 'Test User' };
        const user = await UserService.create(userData);
        expect(user.name).toBe(userData.name);
    });
});
```

### Explain the role of stubs and mocks in testing Node.js applications.

```javascript
const sinon = require('sinon');

describe('Email Service', () => {
    it('should send email', async () => {
        const sendMailStub = sinon.stub(emailClient, 'sendMail');
        sendMailStub.returns(Promise.resolve({ messageId: '123' }));

        await EmailService.sendWelcomeEmail('user@example.com');

        expect(sendMailStub.calledOnce).toBe(true);
        sendMailStub.restore();
    });
});
```

## Deployment and DevOps

### What is Continuous Integration/Continuous Deployment (CI/CD), and how can it be implemented with Node.js projects?

Example GitHub Actions workflow:

```yaml
name: Node.js CI/CD

on:
    push:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Use Node.js
              uses: actions/setup-node@v1
              with:
                  node-version: '14.x'
            - run: npm ci
            - run: npm test
            - run: npm run deploy
```

### How do reverse proxies like Nginx enhance the scalability of Node.js applications?

Nginx configuration example:

```nginx
upstream node_app {
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
}

server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://node_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
