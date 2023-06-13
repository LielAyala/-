var gameBoard = document.getElementById('game-board');
var cards = [
  'A', 'A', 'B', 'B', 'C', 'C',
  'D', 'D', 'E', 'E', 'F', 'F',
  'G', 'G', 'H', 'H', 'I', 'I',
  'J', 'J', 'K', 'K', 'L', 'L'
];

// ערבוב של הכרטיסים
function shuffleArray(array) {
  for (let x = array.length; x > 0; x--) {
    let j = Math.floor(Math.random() * x);
    let k = array[x - 1];
    array[x - 1] = array[j];
    array[j] = k;
  }
  return array;
}

cards = shuffleArray(cards);

function BoardCard() {
  gameBoard.innerHTML = '';//מוריד את הקלף הראשון כי זה מתחיל אפס
  for (var i = 0; i < cards.length; i++) {
    var card = '<section onkeyup="flipCard(this)" class="card" data-index="' + i + '" tabindex="0">' + '?' + '</section>';
    gameBoard.innerHTML += card;
  }
}
var firstCard, secondCard;
var flippedCards = [];
function flipCard(elem) {
  if (flippedCards.length < 2 && elem.textContent === '?') {
    elem.style.backgroundColor = 'rgb(172, 12, 225)';
    showCardContent(elem);
    flippedCards.push(elem);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}
function showCardContent(card) {
  var index = card.dataset.index;
  var content = cards[index];
  card.textContent = content;
  
}
function checkForMatch() {
  var card1 = flippedCards[0];
  var card2 = flippedCards[1];
  if (card1.innerHTML === card2.innerHTML) {
    removTheOnKeyUp();
  } else {
    setTimeout(flipBack, 1000);
  }
  if(ifThisWinner()){
    winMeseg();
  }
}
function removTheOnKeyUp() {
  flippedCards[0].removeEventListener('keyup', flipCard);
  flippedCards[1].removeEventListener('keyup', flipCard);
  flippedCards = [];
}
function flipBack() {
  for (var i = 0; i < flippedCards.length; i++) {
    var card = flippedCards[i];
    card.style.backgroundColor = 'rgb(69, 176, 61)';
    card.innerHTML = '?';
  }
  flippedCards = [];
}
function resetBoard() {
  firstCard = null;
  secondCard = null;
  flippedCards = [];
  BoardCard();
}
function ifThisWinner() {
  for (let i = 0; i < cards.length; i++) {
    if (document.querySelector('[data-index="' + i + '"]').innerHTML === '?') {
      return false;
    }
  }
  return true;
}
function winMeseg(){
  alert("you are the winnerrrrrrrrrrrrrrrrr!!!!!");
}
BoardCard();