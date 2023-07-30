require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


const todoDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.post("/todo", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const query = `INSERT INTO todo (title, description) VALUES (?, ?)`
    const values = [title, description]

    todoDb.query(query, values, (err, result) => {
        if (err) {
            console.error("error inserting data:", err)
            res.status(500).send('Error inserting data')
            return
        }
        console.log('Data inserted in DB', result)
    })

})



app.get('/task', (req, res) => {
    const sql = "SELECT * FROM todo"
    todoDb.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.listen(8081, () => {
    console.log('listening')
})