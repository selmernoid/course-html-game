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
let letAvailableIcons = [];

function increaseScore() {
  score++;
  scoreElement.innerText = 'SCORE: ' + score;
}

function generateLevel() {
  cards = [];
  activeCards = [];
  for (let i = 0; i < icons.length; i++) {
    letAvailableIcons[i]= icons[i];
  }

  refreshGrid();
  assignClicks();

  //select random buttons
  // chooseRandomCards(5);
  chooseRandomPairCards(2);

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function chooseRandomPairCards(count) {
  let availableItems = [];
  let availableItemsCount = 0;
  for (let i = 0; i < items; i++)
    if (!activeCards[i]) availableItems[availableItemsCount++] = i;

  for (let i = 0; i < count; i++) {
    let icon = getRandomIcon();
    for (let j = 0; j < 2; j++) {
      let newRandom = getRandomInt(availableItemsCount);
      let newIndex = availableItems[newRandom];
      activeCards[newIndex] = icon;
      availableItems.splice(newRandom, 1);
      availableItemsCount--;
    }
  }
}

function getRandomIcon() {
  if (letAvailableIcons.length == 0) 
    return null;
  let iconIndex = getRandomInt(letAvailableIcons.length);
  let icon = letAvailableIcons[iconIndex];
  letAvailableIcons.splice(iconIndex, 1);
  return icon;
}

function clickHandler(i) {
  element = cards[i];

  if (!activeCards[i]) return;
  element.classList.toggle('flipped');
  increaseScore();
}

function showActiveCards() {
  for (let i = 0; i < items; i++) {
    let icon = activeCards[i];
    if (icon) {
      let element = cards[i];
      element.innerHTML = `<i class="fa ${icon}"></i>`;
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
