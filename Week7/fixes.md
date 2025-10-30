# Security Fixes for old.js

## 1. Hard-coded Secret (JWT_SECRET)
**Vulnerability:**
The JWT secret was hard-coded in the source code, which is insecure and can lead to secret leakage if the code is shared or published.

**Fix:**
The secret is now loaded from an environment variable (`process.env.JWT_SECRET`). The application will throw an error if the variable is not set, ensuring the secret is not exposed in the codebase.

---

## 2. SQL Injection Vulnerability
**Vulnerability:**
The login endpoint used string interpolation to build SQL queries, making it vulnerable to SQL injection attacks.

**Fix:**
The code now uses parameterized queries (`?` placeholders with values as an array) to safely pass user input to the database, preventing SQL injection.

---

## 3. Database Credentials
**Improvement:**
Database credentials can now also be set via environment variables for better security and flexibility.

---

## Summary Table
| Vulnerability         | Old.js                | new.js (Fixed)         |
|----------------------|-----------------------|------------------------|
| Hard-coded secret    | Yes                   | No (uses env var)      |
| SQL injection        | Yes                   | No (parameterized SQL) |
| DB credentials fixed | No                    | Yes (uses env vars)    |
