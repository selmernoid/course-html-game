let blocks = document.getElementsByClassName('block');
for (let i = 0; i < blocks.length; i++) {
    const element = blocks[i];
    element.addEventListener('click', () => {
        alert('We did that!');
    });
}
