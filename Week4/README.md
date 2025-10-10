# Week4 Utility Module

## Overview

This module provides a collection of utility functions for common programming tasks, including string parsing, asynchronous data fetching from APIs, and basic mathematical calculations. It aims to simplify repetitive operations by offering reusable, well-tested functions that handle edge cases and errors gracefully.

The module exists to promote code reusability and reduce boilerplate in applications that frequently perform these operations. It encapsulates best practices for error handling and input validation, making it easier for developers to focus on business logic rather than low-level implementation details.

## Usage Examples

### String Parsing
```javascript
import { parseString } from './main.js';

const result = parseString("hello world");
console.log(result);
// Output: {
//   length: 11,
//   words: ['hello', 'world'],
//   upper: 'HELLO WORLD',
//   lower: 'hello world',
//   capitalized: 'Hello World'
// }
```

### API Data Fetching
```javascript
import { fetchData } from './main.js';

const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
if (data) {
  console.log('Fetched data:', data);
} else {
  console.log('Failed to fetch data');
}
```

### Mathematical Calculations
```javascript
import { calculate } from './main.js';

const sum = calculate('add', 5, 3); // 8
const difference = calculate('subtract', 10, 4); // 6
const product = calculate('multiply', 6, 7); // 42
const quotient = calculate('divide', 15, 3); // 5
```

## Key Functions

### `parseString(input)`
Parses a string and returns an object with various transformations and metadata.

- **Parameters**: `input` (string) - The string to parse
- **Returns**: Object with `length`, `words` (array), `upper`, `lower`, and `capitalized` properties
- **Throws**: Error if input is not a string
- **Use when**: You need multiple string transformations or metadata about a string

### `fetchData(url)`
Asynchronously fetches JSON data from a given URL with error handling.

- **Parameters**: `url` (string) - The URL to fetch data from
- **Returns**: Parsed JSON data or `null` if an error occurs
- **Throws**: Does not throw; returns `null` on errors
- **Use when**: Making HTTP requests to APIs that return JSON data

### `calculate(operation, a, b)`
Performs basic mathematical operations on two numbers.

- **Parameters**:
  - `operation` (string) - One of: 'add', 'subtract', 'multiply', 'divide'
  - `a`, `b` (numbers) - The operands
- **Returns**: The result of the operation
- **Throws**: Error for unsupported operations or division by zero
- **Use when**: Performing simple arithmetic operations with built-in error checking

## Edge Cases / Limitations

- **parseString**:
  - Only accepts string inputs; throws an error for other types
  - Word splitting uses whitespace as delimiter; may not handle punctuation correctly
  - Capitalization assumes space-separated words

- **fetchData**:
  - Assumes the response is valid JSON; returns `null` if parsing fails
  - Does not handle authentication or custom headers
  - Uses the browser's `fetch` API; may not work in older environments without polyfills

- **calculate**:
  - Does not validate that inputs are numbers; may produce unexpected results with non-numeric inputs
  - Only supports integer division; floating-point results are possible
  - Limited to four basic operations; no advanced math functions

## Running Tests

To run the test suite:

```bash
npm install
npm test
```

For coverage report:

```bash
npm run test:coverage
```

The tests aim for 90%+ code coverage and include normal cases, edge cases, and error scenarios for all functions.
