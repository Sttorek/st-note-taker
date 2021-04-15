const express = require('express');
const path = require('path');

const app = express();
const PORT = 8750;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));