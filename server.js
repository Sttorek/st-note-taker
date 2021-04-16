const express = require('express');
const path = require('path');
// const db = require("./db/db.json")
const fs = require("fs")
const { Recoverable } = require('repl');
const app = express();
const PORT = process.env.PORT || 3001;
let db = require("./db/db.json");



// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        console.log("hit the post request")
        
        if(err) {
            return res.send("err occurred reading your data")
        } 
        db = JSON.parse(data);
        // console.log(req)
        
        
        const newNote = {
            body: res.body,
             id: db.length 
        }
        db.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(db), "utf-8", (err) => {
            if(err) {
                return res.send("err occurred  writing data")
            } 
            res.json(newNote);
        })
    })
    
});

app.get('/api/notes', (req, res) => {
    console.log("orange")
    
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));