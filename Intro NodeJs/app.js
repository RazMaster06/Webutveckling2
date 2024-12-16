const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const PORT = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Raz',
    password: 'RazMaster06',
    database: 'dbo'
})

connection.connect()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

let currentMessage = "";
let currentData = []

connection.query('SELECT * FROM test', (err, rows, fields) => {
    if (err) throw err
  
    console.log(rows[0])

    currentData = rows
  })

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , { root : __dirname});
})

app.get('/getDatabase', (req, res) => {
    let html = ""
    html += "<table>"
    html += "<tr><th>ID</th><th>Name</th><th>Address</th><th>Age</th>"
    for (let i = 0; i < currentData.length; i++) {
        html += "<tr>"
        html += "<td>" + currentData[i].id + "</td>"
        html += "<td>" + currentData[i].name + "</td>"
        html += "<td>" + currentData[i].address + "</td>"
        html += "<td>" + currentData[i].age + "</td>"

    html += "</table>"
    }
    res.send(currentData)
})

app.post('/sendMessage', (req, res) => {
    console.log(req.body["message"])
    currentMessage = req.body("message")
    res.send(200)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)})
})

