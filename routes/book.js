const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  db.query('SELECT * FROM Book', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// GET by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Book WHERE bookID = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});
// POST
router.post('/', (req, res) => {
  const { title, genre, publicationYear, authorID, bookShopId } = req.body;
  db.query(`INSERT INTO Book (title, genre, publicationYear, authorID, bookShopId) VALUES (?, ?, ?, ?, ?)`,
    [title, genre, publicationYear, authorID, bookShopId],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Book added', id: results.insertId });
    });
});
// PUT
router.put('/:id', (req, res) => {
  const { title, genre, publicationYear, authorID, bookShopId } = req.body;
  db.query(`UPDATE Book SET title = ?, genre = ?, publicationYear = ?, authorID = ?, bookShopId = ? WHERE bookID = ?`,
    [title, genre, publicationYear, authorID, bookShopId, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Book updated' });
    });
});
// PATCH
router.patch('/:id', (req, res) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });
  const query = `UPDATE Book SET ` + keys.map(k => `${k} = ?`).join(', ') + ` WHERE bookID = ?`;
  db.query(query, [...values, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Book patched' });
  });
});
// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Book WHERE bookID = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Book deleted' });
  });
});
module.exports = router;
