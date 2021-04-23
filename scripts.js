let score = 0;
let pairsPerLevel = 2;
let gameFinished = false;

const rows = 8;
const cells = 8;
const items = rows * cells;

//main game field element
const gameElement = document.getElementById('game');
const scoreElement = document.getElementById('score');

let cards = [];
let activeCards = [];

let icons = ['fa-palette', 'fa-fire', 'fa-expand', 'fa-city', 'fa-car', 'fa-bug', 'fa-carrot', 'fa-crow', 'fa-dragon', 'fa-feather-alt'];
let letAvailableIcons = [];

let openedPairCard = '';
let closedCards = 0;

function increaseScore() {
  score++;
  closedCards--;  
  scoreElement.innerText = 'SCORE: ' + score;

  if (closedCards == 0){
    pairsPerLevel++;
    generateLevel();
  }
}

function generateLevel() {
  openedPairCard = '';
  closedCards = 0;
  cards = [];
  activeCards = [];
  for (let i = 0; i < icons.length; i++) {
    letAvailableIcons[i] = icons[i];
  }

  refreshGrid();
  assignClicks();

  //select random buttons
  // chooseRandomCards(5);
  chooseRandomPairCards(pairsPerLevel);

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
    newCell.className = 'card';
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
    if (icon == null) return;
    for (let j = 0; j < 2; j++) {
      let newRandom = getRandomInt(availableItemsCount);
      let newIndex = availableItems[newRandom];
      activeCards[newIndex] = icon;
      availableItems.splice(newRandom, 1);
      availableItemsCount--;
      closedCards++;

      cards[newIndex].classList.add('active');
    }
  }
}

function getRandomIcon() {
  if (letAvailableIcons.length == 0) return null;
  let iconIndex = getRandomInt(letAvailableIcons.length);
  let icon = letAvailableIcons[iconIndex];
  letAvailableIcons.splice(iconIndex, 1);
  return icon;
}

function clickHandler(i) {
  element = cards[i];

  if (gameFinished || !activeCards[i] || element.classList.contains('flipped')) return;

  let childIcon = element.querySelector('i');
  if (openedPairCard != '') {
    if (childIcon.classList.value == openedPairCard) {
      openedPairCard = '';
    } else {
      finishGame();
      return;
    }
  } else {
    openedPairCard = childIcon.classList.value;
  }
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

function finishGame() {
  gameFinished = true;
  let maxScore = localStorage.getItem('max-score');
  if (maxScore == null)
    maxScore = 0;
  
  let message = `Reached: ${score}. Highest: ${maxScore}`;
    if (score > maxScore) {
    localStorage.setItem('max-score', score);
    message = `WOW! New best score: ${score}`;
  }
  scoreElement.innerText = message;
  gameElement.classList.add('finished');
}

generateLevel();
