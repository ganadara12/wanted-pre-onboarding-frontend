const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');

const app = express();
const port = 8000;
const SECRET_KEY = 'YOUR_SECRET_KEY';

app.use(bodyParser.json());

// Simple in-memory user database
const users = [];

// SQLite database setup
const db = new sqlite3.Database('db.sqlite');
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, todo TEXT, isCompleted BOOLEAN, userId INTEGER)');

app.post('/auth/signup', (req, res) => {
    const { email, password } = req.body;
    users.push({ email, password });
    res.status(201).send();
});

app.post('/auth/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).send();
    const token = jwt.sign({ email }, SECRET_KEY);
    res.json({ access_token: token });
});

app.post('/todos', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find(u => u.email === decoded.email);
    if (!user) return res.status(401).send();
    const { todo } = req.body;
    db.run('INSERT INTO todos (todo, isCompleted, userId) VALUES (?, ?, ?)', [todo, false, users.indexOf(user)], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id: this.lastID, todo, isCompleted: false, userId: users.indexOf(user) });
    });
});

// ... Add other routes here ...

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

