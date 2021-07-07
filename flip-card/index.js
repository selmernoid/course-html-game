const card = document.getElementById('card');

card.addEventListener('click', () => {
  if (card.classList.contains('flip')) {
    card.classList.remove('flip');
  } else {
    card.classList.add('flip');
  }
});
