const express = require('express');
const path = require('path');
// const db = require("./db/db.json")
const fs = require("fs")
let db = require("./db/db.json");
const { Recoverable } = require('repl');
const app = express();
const PORT = 8080;


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        console.log("hit the post request")
        if(err) {
            return res.send("err occured reading your data")
        } 
        db = JSON.parse(data);
        const newNote = {
            ...req.body, id: db.length 
        }
        db.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(db), "utf-8", (err) => {
            if(err) {
                return res.send("err occured  writing data")
            } 
            res.json(newNote);
        })
    })
    console.log("world")
});

app.get('/api/notes', (req, res) => {
    console.log("hello")
    
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));