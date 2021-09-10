import { React, useState } from 'react';

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('');

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    };

    const addNote = (e) => {
        e.preventDefault();
        createNote ({
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        });
        setNewNote('');
    };

    return (
        <div>
            <h3>Create a new note</h3>
            <form className="NoteForm" onSubmit={addNote}>
                <input onChange={handleNoteChange} value={newNote} />
                <button type='submit'>Save</button>
            </form>
        </div>
    );
};

export default NoteForm;