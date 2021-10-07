import anecdoteService from '../services/anecdotes';

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ANECDOTE':
            return [...state, action.data];
        case 'INIT_ANECDOTES':
            return action.data;
        case 'ADD_VOTE': {
            const id = action.data.id;
            const anecdote = state.find(a => a.id === id);

            const updatedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            };

            return state.map(a =>
                a.id !== id ? a : updatedAnecdote
            );
        }
        default:
            return state;
    }
};

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        });
    };
};

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        });
    };
};

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 });
        dispatch({
            type: 'ADD_VOTE',
            data: updatedAnecdote
        });
    };
};

export default anecdoteReducer;