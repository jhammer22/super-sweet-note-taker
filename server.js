const express = require('express');
const path = require('path');
const notesDb = require('./db/db.json')
const uniqid = require ('uniqid')
const fs = require('fs')
const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(notesDb)
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  newNote.id = uniqid()
  console.log(notesDb)
  notesDb.push(newNote)
  fs.writeFile('./db/db.json', JSON.stringify(notesDb), err => {
    if (err) throw err
    console.log('success')
    
  })
  res.json(newNote)
})

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);




// app.delete('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);