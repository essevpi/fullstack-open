import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';

        dispatch(createAnecdote(content));

        dispatch(setNotification(`${content} added to anectodes`, 5));
    };

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;
