const express = require('express')
const route = express.Router()
const db = require('../db')


route.get('/', (req, res) => {
    db.query('SELECT * FROM author', (err, results) => { res.json(results); })
})

route.get('/:id', (req, res) => {
    db.query('select * from author where authorID = ?', [req.params.id], (err, results) => { res.json(results[0]) })
})

route.post('/addAuthor', (req, res) => {
    const { authorName, nationality, birthYear } = req.body;
    db.query('insert into author(authorName , nationality , birthYear) values (? , ? , ?)',
        [authorName, nationality, birthYear],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, authorName, nationality, birthYear });
        })
})

route.put('/:id' , (req , res)=>{
    const { authorName, nationality, birthYear } = req.body;
     const dateObject = new Date(birthYear);
    db.query('UPDATE author SET authorName = ? , nationality = ? , birthYear = ? WHERE authorID = ?',
        [authorName , nationality , dateObject , req.params.id] 
        , (err , resault)=>{
            if(err){
                return res.status(500).json({error : err.message})
            }
            res.status(201).json({massage : "author updated"})
        }
    )
})

route.patch('/updateAuthor/:id' , (req , res)=>{
    const updates = req.body;
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    if(keys.length === 0){res.status(500).json({faild : "please choose one field at least!"})}
    const query = `UPDATE author SET `+ keys.map(k => `${k} = ?`).join(', ') + ` WHERE authorID = ?`;
    db.query(query , [...values , req.params.id] , (err , resault)=>{
        if(err) throw err;
        res.status(201).json({success : "author updated!"})
    })
})

route.delete('/:id', (req, res) => {
    db.query('DELETE FROM Author WHERE authorID = ?', [req.params.id], (err) => {
      if (err) throw err;
      res.json({ message: 'Author deleted' });
    });
  });

module.exports = route