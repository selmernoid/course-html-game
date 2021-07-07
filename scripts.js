const rows = 8;
const cells = 8;

//main game field element
const gameElement = document.getElementById('game');

// dynamically create rows with cells
let itemCounter = 0;
for (let row = 0; row < rows; row++) {
    for (let cell = 0; cell < cells; cell++) {
        const newCell = document.createElement('div');
        newCell.className = 'card active';
        newCell.innerText = itemCounter++;
        gameElement.appendChild(newCell);
    }
}

// assign click handlers
let blocks = document.getElementsByClassName('card');
for (let i = 0; i < blocks.length; i++) {
    const element = blocks[i];

    element.addEventListener('click', (event) => {
        // const clickedElement = event.currentTarget
        if (!element.classList.contains('active')) return;
        // if (!element.classList.contains('flipped')) element.classList.add('flipped');
        element.classList.toggle('flipped');
    });
}
