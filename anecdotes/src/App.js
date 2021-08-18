import React, { useState } from 'react'
import Button from './Button'
import DisplayAnecdotes from './DisplayAnecdotes';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  

  const handleRandomClick = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randIndex);
  }

  const handleVoteClick = () => {
    const newVotes = [...vote];
    newVotes[selected] += 1;
    setVote(newVotes);
  }

  const mostVoted = vote.indexOf(Math.max.apply(null, vote));

  console.log(selected);
  console.log(vote);
  console.log(mostVoted);

  return (
    <div>
      <DisplayAnecdotes anecdotes={anecdotes} selected={selected} vote={vote} />
      <Button onClick={handleVoteClick} text='Vote' />
      <Button onClick={handleRandomClick} text='Randomize' />
      <DisplayAnecdotes anecdotes={anecdotes} selected={mostVoted} vote={vote} />    
    </div>
    
  )
}

export default App;
