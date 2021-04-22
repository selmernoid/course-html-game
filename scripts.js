let score = 0;

const rows = 8;
const cells = 8;
const items = rows * cells;

//main game field element
const gameElement = document.getElementById('game');
const scoreElement = document.getElementById('score');

let cards = [];
let activeCards = [];

let icons = ['fa-palette', 'fa-fire'];

function increaseScore() {
  score++;
  scoreElement.innerText = 'SCORE: ' + score;
}

function generateLevel() {
  cards = [];
  activeCards = [];

  refreshGrid();
  assignClicks();

  //select random buttons
  chooseRandomCards(5);

  // Show & hide them
  showActiveCards();
  setTimeout(hideActiveCards, 2 * 1000);
}

function refreshGrid() {
  //clear game
  gameElement.innerHTML = '';
  // dynamically create rows with cells
  let itemCounter = 0;
  for (let i = 0; i < items; i++) {
    const newCell = document.createElement('div');
    newCell.className = 'card active';
    newCell.innerText = itemCounter++;
    gameElement.appendChild(newCell);
  }
}

function assignClicks() {
  let blocks = document.getElementsByClassName('card');
  for (let i = 0; i < blocks.length; i++) {
    const element = blocks[i];
    // assign element to array
    cards[i] = element;

    element.addEventListener('click', () => clickHandler(i));
  }
}

function chooseRandomCards(count) {
  for (let i = 0; i < count; i++) {
    let newIndex = getRandomInt(items);
    activeCards[newIndex] = true;
  }
}

function clickHandler(i) {
  element = cards[i];

  if (!activeCards[i]) return;
  element.classList.toggle('flipped');
  increaseScore();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function showActiveCards() {
  for (let i = 0; i < items; i++) {
    if (activeCards[i]) {
      let element = cards[i];
      element.classList.add('flipped');
    }
  }
}

function hideActiveCards() {
  for (let i = 0; i < items; i++) {
    if (activeCards[i]) {
      let element = cards[i];
      element.classList.remove('flipped');
    }
  }
}

generateLevel();
