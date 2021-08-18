import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('Add new note...');
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter( note => note.important )

  const addNote = (e) => {
    e.preventDefault();
    console.log('button pressed', e.target);
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    setNotes(notes.concat(noteToAdd));
    setNewNote('');
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  }

  const handleShowAllNotes = () => {
    setShowAll(!showAll);
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <ul>
          {notesToShow.map(note => 
              <Note key={note.id} note={note} />
          )}
        </ul>
        <button onClick={handleShowAllNotes}>{showAll ? 'Show important' : 'Show all'}</button>
      </div>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote} />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App;