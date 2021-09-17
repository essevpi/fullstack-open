import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    const noteFormRef = useRef();

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility();
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
            });
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            })
            .catch(() => {
                setErrorMessage(
                    `Note "${note.content}" was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    } ;

    const notesToShow = showAll
        ? notes
        : notes.filter( note => note.important );

    const handleShowAllNotes = () => {
        setShowAll(!showAll);
    };

    const logUser = async (username, password) => {
        try {
            const user = await loginService.logIn({
                username, password
            });

            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
            noteService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div className='App'>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {
                user === null ?
                    <Togglable buttonLabel='Log-In'>
                        <LoginForm
                            logUser={logUser}
                        />
                    </Togglable> :
                    <div>
                        <p>{user.name} is logged</p>
                        <Togglable buttonLabel='Create Note' ref={noteFormRef}>
                            <NoteForm
                                createNote={addNote}
                            />
                        </Togglable>
                    </div>
            }

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

            <Footer />
        </div>
    );
};

export default App;