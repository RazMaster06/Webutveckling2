const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {title : "HEJ",})    
})

app.get('/banan', (req, res) => {
    res.render('article', {title : "HEJ", mainTitle : "Banansläkten", } )    
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})