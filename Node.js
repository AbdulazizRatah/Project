const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Define routes

// Get all bugs
app.get('/bugs', (req, res) => {
  res.json(bugs);
});

// Create a new bug
app.post('/bugs', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Bug name and description are required.' });
  }

  const bug = {
    id: Date.now(),
    name,
    description,
    status: 'Open',
    timestamp: new Date().toLocaleString(),
  };

  bugs.push(bug);
  res.status(201).json(bug);
});

// Update bug status and description
app.put('/bugs/:id', (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body;

  const bug = bugs.find(bug => bug.id === parseInt(id));

  if (!bug) {
    return res.status(404).json({ error: 'Bug not found.' });
  }

  bug.status = status || bug.status;
  bug.description = description || bug.description;

  res.json(bug);
});

// Update bug status
app.patch('/bugs/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const bug = bugs.find(bug => bug.id === parseInt(id));

  if (!bug) {
    return res.status(404).json({ error: 'Bug not found.' });
  }

  bug.status = status || bug.status;

  res.json(bug);
});

// Update bug description
app.patch('/bugs/:id/description', (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const bug = bugs.find(bug => bug.id === parseInt(id));

  if (!bug) {
    return res.status(404).json({ error: 'Bug not found.' });
  }

  bug.description = description || bug.description;

  res.json(bug);
});

// Delete a bug
app.delete('/bugs/:id', (req, res) => {
  const { id } = req.params;

  const index = bugs.findIndex(bug => bug.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Bug not found.' });
  }

  const deletedBug = bugs.splice(index, 1)[0];

  res.json(deletedBug);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
