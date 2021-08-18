const DisplayAnecdotes = ({ anecdotes, selected, vote }) => {
    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>Vote: {vote[selected]}</p>
        </div>
    );
}

export default DisplayAnecdotes;