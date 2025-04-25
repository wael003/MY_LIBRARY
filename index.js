require('dotenv').config
const express = require('express')
const author = require('./routes/author')
const book = require('./routes/book')
const bookShop = require('./routes/bookShop')
require('./db')


const app = express()

app.use(express.json())
app.use('/authors' , author)
app.use('/books' , book)
app.use('/bookShops' , bookShop)


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})