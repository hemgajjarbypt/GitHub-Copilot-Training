// Utility functions
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function printSum(a, b) {
  console.log("Sum:", add(a, b));
}

function multiplyAndLog(a, b) {
  const result = multiply(a, b);
  console.log("Result:", result);
  return result;
}

// Array iteration
const arr = [1, 2, 3, 4, 5];
arr.forEach(item => console.log(item));

// Number check
function checkNumber(num) {
  if (num > 0) {
    console.log("Positive");
  } else if (num < 0) {
    console.log("Negative");
  } else {
    console.log("Zero");
  }
}

// Greeting
function greet(name) {
  console.log("Hello " + name);
  console.log("Welcome back, " + name + "!");
}

// API call simulation
function fetchData() {
  console.log("Fetching data...");
  setTimeout(() => {
    console.log("Data fetched");
  }, 1000);
}

// Object creation
const user = { name: "John", age: 25 };
console.log(user);

// Area calculation
function calculateArea(width, height) {
  return width * height;
}

// Random number generator
function getRandom() {
  return Math.floor(Math.random() * 10);
}

// Array filter
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evens = numbers.filter(n => n % 2 === 0);

// String to uppercase
function toUpperCase(str) {
  return str.toUpperCase();
}

// Alert simulation
function showAlert(msg) {
  console.log("ALERT:", msg);
}

// Summation loop
let total = 0;
for (let i = 0; i < 10; i++) {
  total += i;
}
console.log(total);

// User data printing
function printUserData(user) {
  console.log("User:", user.name, user.age);
}

// Timeout function
setTimeout(() => console.log("Timeout 1 complete"), 1000);

// Status check
function checkStatus(status) {
  if (status === "active") {
    console.log("Active");
  } else if (status === "inactive") {
    console.log("Inactive");
  } else if (status === "pending") {
    console.log("Pending");
  } else {
    console.log("Unknown");
  }
}

// Promise simulation
function simulatePromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 500);
  });
}
simulatePromise().then(console.log);
