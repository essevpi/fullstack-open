import React, { useState } from 'react'
import Card from './Card';
import Button from './Button';
import ListReview from './ListReview';
import Statistics from './Statistics';

const App = () => {
  const [review, setReview] = useState({
    good: 0, neutral: 0, bad: 0
  });



  const handleGoodClick = () => setReview({...review, good: review.good + 1});
  const handleNeutralClick = () => setReview({...review, neutral: review.neutral + 1});
  const handleBadClick = () => setReview({...review, bad: review.bad + 1});

  console.log(review);

  return (
    <div>
      <Card title='Feedback' />
      <Button text='Good' onClick={handleGoodClick} />
      <Button text='Neutral' onClick={handleNeutralClick} />
      <Button text='Bad' onClick={handleBadClick} />
      <Card title='Reviews' />
      <ListReview review={review} />
      <Statistics review={review} />
    </div>
  );
}

export default App;
