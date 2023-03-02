const express = require('express');
const path = require('path');
const notesDb = require('./db/db.json')
const uniqid = require ('uniqid')
const fs = require('fs')
const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(notesDb)
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  newNote.id = uniqid()
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



// bonus
// app.delete('/api/notes/:id', (req, res) => {
//   const id = req.params.id
//   // filter method or loop to figure out index
//   fs.writeFile('./db/db.json', JSON.stringify(notesDb), err => {
//     if (err) throw err
//     console.log('success')
    
//   })
//   res.json(newNote)
// })



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);