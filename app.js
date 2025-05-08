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
  const bestTime = localStorage.getItem('diceMemoryBestTime');
  if (bestTime) {
      bestTimeDisplay.textContent = formatTime(parseInt(bestTime));
  }else {
    bestTimeDisplay.textContent = 'Geriausio laiko nėra';
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
  startTimer();
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

function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
      matchedPairs++;
      flippedCards = [];
      
      // Check if game is complete
      if (matchedPairs === 6) {
          endGame();
      }
  } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
  }
}

function startTimer() {
  seconds = 0;
  clearInterval(timer);
  timer = setInterval(() => {
      seconds++;
      timeDisplay.textContent = formatTime(seconds);
  }, 1000);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endGame() {
  isPlaying = false;
  clearInterval(timer);


const bestTime = localStorage.getItem('diceMemoryBestTime');
if (!bestTime || seconds < parseInt(bestTime)) {
    localStorage.setItem('diceMemoryBestTime', seconds.toString());
    bestTimeDisplay.textContent = formatTime(seconds);
}else {
    bestTimeDisplay.textContent = formatTime(parseInt(bestTime));
}

setTimeout(() => {
  alert(`Sveikiname! Jūs baigėte atminties žaidimą per ${formatTime(seconds)} su ${tries} bandymais.`);
}, 500);
}

function resetGame() {
  clearInterval(timer);
  isPlaying = false;
  gameBoard.innerHTML = '';
  timeDisplay.textContent = '00:00';
  triesDisplay.textContent = '0';
}

Game();












    
 
