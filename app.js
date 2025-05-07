let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isPlaying = false;
let timer;
let seconds = 0;
let tries = 0;

const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const timeDisplay = document.getElementById('time');
const triesDisplay = document.getElementById('tries');
const bestTimeDisplay = document.getElementById('bestTime');

function Game() {
  const bestTime = localStorage.getItem('gameBestTime');
  if (bestTime) {
      bestTimeDisplay.textContent = formatTime(parseInt(bestTime));
  }
  
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
}

function createDiceElement(value) {
  const dice = document.createElement('div');
  dice.className = `dice dice-${value}`;
  
  for (let i = 0; i < value; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dice.appendChild(dot);
  }
  
  return dice;
}

function createCard(value, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.value = value;
  card.dataset.index = index;
  
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.textContent = '👀';
  
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.appendChild(createDiceElement(value));
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  
  card.addEventListener('click', () => flipCard(card));
  
  return card;
}

function startGame() {
  if (isPlaying) return;
  
  isPlaying = true;
  matchedPairs = 0;
  flippedCards = [];
  tries = 0;
  seconds = 0;
  
  triesDisplay.textContent = tries;
  timeDisplay.textContent = '00:00';
  
  gameBoard.innerHTML = '';
  
  cards = [];
  const values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  
  for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
  }
  
  values.forEach((value, index) => {
      const card = createCard(value, index);
      cards.push(card);
      gameBoard.appendChild(card);
  });
  
}

function flipCard(card) {
  if (!isPlaying || card.classList.contains('flipped') || flippedCards.length >= 2) {
      return;
  }
  
  card.classList.add('flipped');
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
      tries++;
      triesDisplay.textContent = tries;
      
      setTimeout(checkMatch, 500);
  }
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

Game();












    
 
