// app.js
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not set');
}

// Secure DB connection (for demonstration only)
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'demo',
  password: process.env.DB_PASSWORD || 'demo',
  database: process.env.DB_NAME || 'demo_db',
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Use parameterized query to prevent SQL injection
  const sql = 'SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1;';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (results.length === 0) return res.status(401).json({ error: 'invalid' });

    const user = results[0];
    const token = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = { app, db };

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Listening on 3000'));
}
