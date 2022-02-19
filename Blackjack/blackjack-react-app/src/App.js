import {useState, useEffect} from 'react';
import {Button, ResetButton} from './components/Buttons';
import Message from './components/Messages';
import Sum from './components/Sum';
import Cards from './components/Cards'

function App() {
  const [message, setMessage] = useState("Want to play?");
  const [cards, setCards] = useState([0]);
  const [sum, setSum] = useState(0);
  const [hasBlackJack, setHasBlackJack] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [fresh, setFresh] = useState(false);


  useEffect(() => {
    if(fresh) {
      if(sum < 21)  {
      setMessage("Do you want to draw a new card?")
    } else if (sum === 21) {
      setMessage("You Win");
      setHasBlackJack(false);
      setIsAlive(false);
    } else{
      setMessage("You lose");
      setIsAlive(false)
      }
    }
  },[isAlive, fresh, sum])

  const getRandomNum = () => {
    let number = Math.floor(Math.random() * 13) + 1;
    if(number > 10) {
      return 10
    } else if(number === 1) {
      return 11
    }else {
      return number
    }
  }

  const start = () => {
    setIsAlive(true)
    setFresh(true)
      if(sum === 0) {
        let firstCard = getRandomNum();
        let secondCard = getRandomNum();
        setCards([firstCard, " ", secondCard]);
        setSum(prevCard => prevCard + firstCard + secondCard);
      
      } else if(sum === 21) {
        setHasBlackJack(true);
        setIsAlive(false);
        setFresh(false);
      }
   };

  const newCard = () => {
    if(sum > 0 && isAlive && !hasBlackJack) {
      let card = getRandomNum();
      setCards(prevCard => [prevCard, " ", card])
      setSum((prevSum) => prevSum + card);
    }
  };

  const reset = () => {
    setSum(0)
    setCards([0]);
    setIsAlive(true);
    setHasBlackJack(false);
    setFresh(false);
    setMessage("Want to play?");
  }

  return (
    <div>
      <h1>Blackjack</h1>
      <Message message={message} />

      <Cards cards={cards} />
      <Sum sum={sum} />
      {isAlive && <Button start={start} newCard={newCard} />}
      {!isAlive && <ResetButton reset={reset} />}
    </div>
  );
}

export default App;
