const express = require('express')
const mysql = require('mysql')
const generator = require('unique-names-generator')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)

connection.query("CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)")

const configNames = {
    dictionaries: [generator.names, generator.names],
    separator: ' ',
    style: 'capital'
  }
  
const name = generator.uniqueNamesGenerator(configNames)
connection.query(`INSERT INTO people(name) values(?)`, [name])

let names = ""
connection.query("SELECT name FROM people", (error, results) => {
    if (error) throw err;

    results.forEach(function(result) {
        names += `<li>${result.name}</li>`;
      })
})

connection.end()

app.get('/', (req,res) => {
    res.send(`<h1>Full Cycle</h1><ul>${names}</ul>`)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})