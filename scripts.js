let blocks = document.getElementsByClassName('block');
for (let i = 0; i < blocks.length; i++) {
    const element = blocks[i];

    element.addEventListener('click', (event) => {
        // const clickedElement = event.currentTarget
        if (!element.classList.contains('active')) return;
        // if (!element.classList.contains('flipped')) element.classList.add('flipped');
        element.classList.toggle('flipped');
    });
}
