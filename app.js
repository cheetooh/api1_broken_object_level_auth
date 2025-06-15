const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Load user data from JSON
const users = JSON.parse(fs.readFileSync('./users.json'));

// Login simulation
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = Object.values(users).find(u => u.username === username);
  if (user) {
    return res.json({ message: 'Login successful', user_id: user.id });
  }
  return res.status(401).json({ message: 'Invalid username' });
});

// Insecure: No object-level authorization check
app.get('/api/user/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    return res.json(user);
  }
  return res.status(404).json({ error: 'User not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/openapi.json', (req, res) => {
  res.sendFile(__dirname + '/openapi.json');
});
