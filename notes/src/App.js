import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes);
        })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `Note "${note.content}" was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const addNote = (e) => {
    e.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteService
      .create(noteToAdd)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter( note => note.important )

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleShowAllNotes = () => {
    setShowAll(!showAll);
  }

  return (
    <div className='App'>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <ul>
          {notesToShow.map(note => 
              <Note 
                key={note.id} 
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
        <button onClick={handleShowAllNotes}>
          {showAll ? 'Show important' : 'Show all'}
        </button>
      </div>
      <form className="NoteForm" onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote} />
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;