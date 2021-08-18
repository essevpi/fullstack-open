import React, {useState} from 'react';
import History from './History';
import Button from './Button';

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left+1);
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right+1);
  }

  return (
    <div>
      {left}
      <Button text='Left' onClick={handleLeftClick}/>
      <Button text='Right' onClick={handleRightClick}/>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;