const express = require('express')
const route = express.Router()
const db = require('../db')


route.get('/', (req, res) => {
  db.query('SELECT * FROM Bookshop', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

route.get('/:id', (req, res) => {
  db.query('SELECT * FROM Bookshop WHERE bookShopID = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

route.post('/', (req, res) => {
  const { name, location, contactNumber } = req.body;
  db.query(`INSERT INTO Bookshop (bookShopName, location, contactNumber) VALUES (?, ?, ?)`,
    [name, location, contactNumber],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Bookshop added', id: results.insertId });
    });
});

route.put('/:id', (req, res) => {
  const { name, location, contactNumber } = req.body;
  db.query(`UPDATE Bookshop SET bookShopName = ?, location = ?, contactNumber = ? WHERE bookShopID = ?`,
    [name, location, contactNumber, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Bookshop updated' });
    });
});

route.patch('/:id', (req, res) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });
  const query = `UPDATE Bookshop SET ` + keys.map(k => `${k} = ?`).join(', ') + ` WHERE bookShopID = ?`;
  db.query(query, [...values, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Bookshop patched' });
  });
});

route.delete('/:id', (req, res) => {
  db.query('DELETE FROM Bookshop WHERE bookShopID = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Bookshop deleted' });
  });
});
module.exports = route;