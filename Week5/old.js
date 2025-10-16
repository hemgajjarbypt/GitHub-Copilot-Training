function add(a, b) {
  return a + b;
}

function addNumbers(x, y) {
  return x + y;
}

function sum(a, b) {
  return a + b;
}

function calculateSum(a, b) {
  const result = a + b;
  return result;
}

function printSum(a, b) {
  console.log("Sum:", a + b);
}

function multiply(a, b) {
  return a * b;
}

function multiplyNumbers(x, y) {
  return x * y;
}

function multiplyAgain(a, b) {
  return a * b;
}

function multiplyAndLog(a, b) {
  const result = a * b;
  console.log("Result:", result);
  return result;
}

// duplicate array iteration
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// duplicate conditions
function checkNumber(num) {
  if (num > 0) {
    console.log("Positive");
  } else if (num < 0) {
    console.log("Negative");
  } else {
    console.log("Zero");
  }

  if (num > 0) {
    console.log("Positive");
  } else if (num < 0) {
    console.log("Negative");
  } else {
    console.log("Zero");
  }
}

// duplicate user greeting logic
function greetUser(name) {
  console.log("Hello " + name);
  console.log("Welcome back, " + name + "!");
}

function sayHi(name) {
  console.log("Hello " + name);
  console.log("Welcome back, " + name + "!");
}

function greetPerson(person) {
  console.log("Hello " + person);
  console.log("Welcome back, " + person + "!");
}

function greetAgain(user) {
  console.log("Hello " + user);
  console.log("Welcome back, " + user + "!");
}

// redundant API call simulation
function fetchData() {
  console.log("Fetching data...");
  setTimeout(() => {
    console.log("Data fetched");
  }, 1000);
}

function getData() {
  console.log("Fetching data...");
  setTimeout(() => {
    console.log("Data fetched");
  }, 1000);
}

function retrieveData() {
  console.log("Fetching data...");
  setTimeout(() => {
    console.log("Data fetched");
  }, 1000);
}

// duplicate object creation
const user1 = { name: "John", age: 25 };
const user2 = { name: "John", age: 25 };
const user3 = { name: "John", age: 25 };

console.log(user1, user2, user3);

// duplicate math logic
function calculateArea(width, height) {
  return width * height;
}

function area(w, h) {
  return w * h;
}

function rectangleArea(a, b) {
  return a * b;
}

function computeArea(x, y) {
  return x * y;
}

// repetitive random number generators
function getRandom() {
  return Math.floor(Math.random() * 10);
}

function randomValue() {
  return Math.floor(Math.random() * 10);
}

function randomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateRandom() {
  return Math.floor(Math.random() * 10);
}

// duplicated array filters
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evens = numbers.filter(n => n % 2 === 0);
const evensAgain = numbers.filter(n => n % 2 === 0);
const evensThird = numbers.filter(n => n % 2 === 0);

// duplicate string logic
function toUpperCase(str) {
  return str.toUpperCase();
}

function upperCaseText(text) {
  return text.toUpperCase();
}

function makeUpperCase(input) {
  return input.toUpperCase();
}

// duplicate DOM simulation logic
function showAlert(msg) {
  console.log("ALERT:", msg);
}

function displayAlert(msg) {
  console.log("ALERT:", msg);
}

function alertMessage(message) {
  console.log("ALERT:", message);
}

function notifyUser(message) {
  console.log("ALERT:", message);
}

// duplicate loop for summation
let total1 = 0;
for (let i = 0; i < 10; i++) {
  total1 += i;
}

let total2 = 0;
for (let i = 0; i < 10; i++) {
  total2 += i;
}

let total3 = 0;
for (let i = 0; i < 10; i++) {
  total3 += i;
}

console.log(total1, total2, total3);

// repeated user data printing
function printUserData(user) {
  console.log("User:", user.name, user.age);
}

function showUserData(user) {
  console.log("User:", user.name, user.age);
}

function logUser(user) {
  console.log("User:", user.name, user.age);
}

function displayUser(user) {
  console.log("User:", user.name, user.age);
}

// duplicate timeout functions
setTimeout(() => console.log("Timeout 1 complete"), 1000);
setTimeout(() => console.log("Timeout 1 complete"), 1000);
setTimeout(() => console.log("Timeout 1 complete"), 1000);

// repeated nested conditions
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

// duplicate promise simulation
function simulatePromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 500);
  });
}

function promiseTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 500);
  });
}

function doAsyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 500);
  });
}

simulatePromise().then(console.log);
promiseTask().then(console.log);
doAsyncTask().then(console.log);
