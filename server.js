const express = require('express');
const path = require('path');
const notesDb = require('./db/db.json')
import { nanoid } from 'nanoid'
const nanoid = require ('nanoid').nanoid
const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notesDb)
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  newNote.id = nanoid()
  notesDb.append(newNote)
  fs.writeFile('./db/db.json', JSON.stringify(notesDb), err => {
    if (err) throw err
    console.log('success')
    res.json(newNote)
  })
})


// app.delete('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);