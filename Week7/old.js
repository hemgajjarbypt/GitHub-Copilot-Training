// app.js
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Hard-coded secret (vulnerability 1)
const JWT_SECRET = "supersecret-not-for-prod-12345";

// Vulnerable DB connection (for demonstration only)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'demo',
  password: 'demo',
  database: 'demo_db',
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // SQL injection vulnerability (vulnerability 2)
  const sql = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1;`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (results.length === 0) return res.status(401).json({ error: 'invalid' });

    const user = results[0];
    const token = jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.listen(3000, () => console.log('Listening on 3000'));
