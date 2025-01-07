const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database connection
let db;
(async () => {
  db = await open({
    filename: './notes.db',
    driver: sqlite3.Database,
  });

  // Create table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
})();

// Routes
app.get('/api/notes', async (req, res) => {
  const notes = await db.all('SELECT * FROM notes');
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  const result = await db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
  const newNote = { id: result.lastID, title, content };
  res.json(newNote);
});

app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM notes WHERE id = ?', [id]);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

