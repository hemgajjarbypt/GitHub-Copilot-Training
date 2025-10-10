const { parseString, fetchData, calculate } = require('./main');

// Mock fetch globally for testing
global.fetch = jest.fn();

describe('parseString', () => {
  // Table-driven tests for normal cases
  const normalTestCases = [
    // Normal case: standard string
    ['hello world', {
      length: 11,
      words: ['hello', 'world'],
      upper: 'HELLO WORLD',
      lower: 'hello world',
      capitalized: 'Hello World'
    }],
    // Edge case: empty string
    ['', {
      length: 0,
      words: [],
      upper: '',
      lower: '',
      capitalized: ''
    }],
    // Edge case: string with multiple spaces
    ['  multiple   spaces  ', {
      length: 21,
      words: ['multiple', 'spaces'],
      upper: '  MULTIPLE   SPACES  ',
      lower: '  multiple   spaces  ',
      capitalized: '  Multiple   Spaces  '
    }],
    // Edge case: single character
    ['a', {
      length: 1,
      words: ['a'],
      upper: 'A',
      lower: 'a',
      capitalized: 'A'
    }],
    // Edge case: string with special characters
    ['hello@world!', {
      length: 12,
      words: ['hello@world!'],
      upper: 'HELLO@WORLD!',
      lower: 'hello@world!',
      capitalized: 'Hello@world!'
    }]
  ];

  test.each(normalTestCases)('parses string "%s" correctly', (input, expected) => {
    expect(parseString(input)).toEqual(expected);
  });

  // Test for invalid input: non-string
  test('throws error for non-string input', () => {
    expect(() => parseString(123)).toThrow('Input must be a string');
    expect(() => parseString(null)).toThrow('Input must be a string');
    expect(() => parseString(undefined)).toThrow('Input must be a string');
    expect(() => parseString({})).toThrow('Input must be a string');
  });
});

describe('calculate', () => {
  // Table-driven tests for normal cases
  const normalTestCases = [
    // Normal case: addition
    ['add', 1, 2, 3],
    // Normal case: subtraction
    ['subtract', 5, 3, 2],
    // Normal case: multiplication
    ['multiply', 2, 3, 6],
    // Normal case: division
    ['divide', 6, 2, 3],
    // Edge case: negative numbers
    ['add', -1, 2, 1],
    // Edge case: floating point
    ['divide', 5, 2, 2.5],
    // Edge case: zero in addition
    ['add', 0, 5, 5],
    // Edge case: large numbers
    ['multiply', 1000, 2000, 2000000]
  ];

  test.each(normalTestCases)('calculates %s of %d and %d as %d', (operation, a, b, expected) => {
    expect(calculate(operation, a, b)).toEqual(expected);
  });

  // Test for division by zero
  test('throws error for division by zero', () => {
    expect(() => calculate('divide', 1, 0)).toThrow('Cannot divide by zero');
  });

  // Test for unsupported operation
  test('throws error for unsupported operation', () => {
    expect(() => calculate('power', 2, 3)).toThrow('Unsupported operation');
    expect(() => calculate('modulo', 5, 2)).toThrow('Unsupported operation');
  });
});

describe('fetchData', () => {
  // Reset mocks before each test
  beforeEach(() => {
    global.fetch.mockClear();
  });

  // Normal case: successful API call
  test('fetches data successfully', async () => {
    const mockData = { data: 'test' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await fetchData('http://example.com');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('http://example.com');
  });

  // Edge case: HTTP error response
  test('returns null on HTTP error', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404
    });

    const result = await fetchData('http://example.com');
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://example.com');
  });

  // Edge case: network error
  test('returns null on network error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    const result = await fetchData('http://example.com');
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://example.com');
  });

  // Edge case: invalid JSON response
  test('returns null on invalid JSON', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON'))
    });

    const result = await fetchData('http://example.com');
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://example.com');
  });
});
