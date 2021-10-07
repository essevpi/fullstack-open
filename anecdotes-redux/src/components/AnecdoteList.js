import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVoteClick }) => {
    return(
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVoteClick}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);

    const anecdotesToShow = filter === null
        ? anecdotes
        : anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase()));

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));

        dispatch(setNotification(`${anecdote.content} was voted`, 5));
    };

    return (
        <div>
            {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVoteClick={() => vote(anecdote)}
                />
            )}
        </div>
    );
};

export default AnecdoteList;
