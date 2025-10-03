# JavaScript Utility Functions and Classes

This project contains a set of **utility functions** and **classes** demonstrating basic programming concepts in JavaScript including parameters, return values, inheritance, and object-oriented design.

---

## Utility Functions

1. **add(a, b)**  
   Returns the sum of two numbers.

2. **subtract(a, b)**  
   Returns the result of subtracting `b` from `a`.

3. **multiply(a, b)**  
   Returns the product of two numbers.

4. **divide(a, b)**  
   Returns the result of dividing `a` by `b`. Returns an error message if `b` is 0.

5. **greetUser(name)**  
   Returns a greeting message for a given `name`.

6. **factorial(n)**  
   Returns the factorial of a number recursively.

7. **isPrime(num)**  
   Checks if a number is prime. Returns `true` or `false`.

8. **maxInArray(arr)**  
   Returns the maximum number in an array.

9. **minInArray(arr)**  
   Returns the minimum number in an array.

---

## Classes

### Calculator
- Represents a basic calculator with arithmetic methods.
- Methods: `add`, `subtract`, `multiply`, `divide`.

### Person
- Represents a person with `name` and `age`.
- Methods:
  - `greet()` – Returns a greeting with name and age.
  - `haveBirthday()` – Increments age and returns birthday message.

### Student (extends Person)
- Represents a student with additional `grade`.
- Methods:
  - `study(subject)` – Returns a message showing the subject the student is studying.
  - `getGrade()` – Returns the student's grade.

### BankAccount
- Represents a bank account with `owner` and `balance`.
- Methods:
  - `deposit(amount)` – Adds amount to balance.
  - `withdraw(amount)` – Deducts amount from balance if sufficient funds exist.
  - `getBalance()` – Returns the current balance.

---

## Usage Example

```javascript
// Utility functions
console.log(add(5, 3));
console.log(factorial(5));

// Classes
const student = new Student('Mary', 20, 'A');
console.log(student.greet());
console.log(student.study('Math'));

const account = new BankAccount('Alice', 100);
console.log(account.deposit(50));
console.log(account.withdraw(30));
