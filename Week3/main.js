// =======================
// Utility Functions
// =======================

/**
 * Adds two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts one number from another.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Result of a - b
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides one number by another safely.
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number|string} Result of division or error message
 */
function divide(a, b) {
    if (b === 0) return 'Cannot divide by zero';
    return a / b;
}

/**
 * Greets a user by name.
 * @param {string} name - Name of the user
 * @returns {string} Greeting message
 */
function greetUser(name) {
    return `Hello, ${name}!`;
}

/**
 * Calculates factorial of a number recursively.
 * @param {number} n - Input number
 * @returns {number} Factorial of n
 */
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Checks if a number is prime.
 * @param {number} num - Number to check
 * @returns {boolean} True if prime, false otherwise
 */
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Finds maximum value in an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Maximum value
 */
function maxInArray(arr) {
    return Math.max(...arr);
}

/**
 * Finds minimum value in an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Minimum value
 */
function minInArray(arr) {
    return Math.min(...arr);
}

// =======================
// Classes
// =======================

/**
 * Calculator class for basic arithmetic operations.
 */
class Calculator {
    /**
     * Initializes a calculator instance.
     * @param {string} name - Name of the calculator
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Adds two numbers.
     */
    add(a, b) { return a + b; }

    /**
     * Subtracts two numbers.
     */
    subtract(a, b) { return a - b; }

    /**
     * Multiplies two numbers.
     */
    multiply(a, b) { return a * b; }

    /**
     * Divides two numbers safely.
     */
    divide(a, b) { return b === 0 ? 'Cannot divide by zero' : a / b; }
}

/**
 * Person class representing a person.
 */
class Person {
    /**
     * Creates a person instance.
     * @param {string} name - Person's name
     * @param {number} age - Person's age
     */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    /**
     * Returns a greeting message with name and age.
     * @returns {string} Greeting
     */
    greet() {
        return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
    }

    /**
     * Increments person's age by 1 and returns birthday message.
     * @returns {string} Birthday message
     */
    haveBirthday() {
        this.age += 1;
        return `Happy Birthday ${this.name}! You are now ${this.age}.`;
    }
}

/**
 * Student class extending Person.
 */
class Student extends Person {
    /**
     * Creates a student instance.
     * @param {string} name - Student name
     * @param {number} age - Student age
     * @param {string} grade - Grade of the student
     */
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    /**
     * Student studies a subject.
     * @param {string} subject - Subject to study
     * @returns {string} Study message
     */
    study(subject) {
        return `${this.name} is studying ${subject}.`;
    }

    /**
     * Returns student's grade.
     * @returns {string} Grade info
     */
    getGrade() {
        return `${this.name} is in grade ${this.grade}.`;
    }
}

/**
 * BankAccount class representing a bank account.
 */
class BankAccount {
    /**
     * Creates a bank account instance.
     * @param {string} owner - Owner name
     * @param {number} balance - Initial balance
     */
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    /**
     * Deposits money to account.
     * @param {number} amount - Amount to deposit
     * @returns {string} Deposit info
     */
    deposit(amount) {
        this.balance += amount;
        return `Deposited ${amount}. New balance is ${this.balance}.`;
    }

    /**
     * Withdraws money from account.
     * @param {number} amount - Amount to withdraw
     * @returns {string} Withdraw info or error
     */
    withdraw(amount) {
        if (amount > this.balance) {
            return `Insufficient funds! Balance is ${this.balance}.`;
        }
        this.balance -= amount;
        return `Withdrew ${amount}. Remaining balance is ${this.balance}.`;
    }

    /**
     * Returns current balance.
     * @returns {number} Current balance
     */
    getBalance() {
        return this.balance;
    }
}
