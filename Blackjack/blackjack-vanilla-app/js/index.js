const cards = document.querySelector('.cards');
const sumCards = document.querySelector('.sum');
const amount = document.querySelector(".amount");
const messageEl = document.querySelector('.message');
const playerEl = document.querySelector('.player');
let message = "";
let isAlive = false;
let hasBlackJack = false;
let cardsArr = [];
let sum = 0;
let player = {name: "JB", chips: 145}

playerEl.textContent = `${player.name}: $${player.chips}`

// console.log(cardsArr);

function render() {
    sumCards.textContent = "Sum: " + sum;
    cards.textContent = "Cards: " 

    for (let i = 0; i < cardsArr.length; i++) {
    cards.textContent += cardsArr[i] + " ";
    }
    if (sum < 21) {
      message = "Do you want to draw a new card?";
    } else if (sum === 21) {
     message = "You Win";
     hasBlackJack = true;
    } else {
      message = "You Lose";
      isAlive = false
    }
    messageEl.textContent = message;
}


function getRandomNum() {
   let number =  Math.floor(Math.random() * 13) + 1;
   if(number > 10) {
      return 10;
   } else if(number === 1) {
      return 11
   } else {
      return number
   }
}

function start() {
if(sum < 21) {
  isAlive = true;
  let firstCard = getRandomNum();
  let secondCard = getRandomNum();
  cardsArr.push(firstCard, secondCard);
  sum = firstCard + secondCard;

  render();

 }else if(sum === 21) {
     hasBlackJack = true;
     isAlive = false;
 }
}

function newcard() {
    if(isAlive && !hasBlackJack) {
        let thirdCard = getRandomNum();
        sum += thirdCard;

        cardsArr.push(thirdCard);
        render();
    }
}

// console.log(cardsArr)