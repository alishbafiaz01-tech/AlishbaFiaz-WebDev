const MAX_ATTEMPTS = 7;
let treasure, attempts, gameOver;

function initGame() {
  treasure = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;
  document.getElementById('guess').value = '';
  document.getElementById('guess').disabled = false;
  document.getElementById('searchBtn').disabled = false;
  document.getElementById('message').style.display = 'none';
  document.getElementById('history').innerHTML = '';
  document.getElementById('again').style.display = 'none';
  document.getElementById('rem').textContent = MAX_ATTEMPTS;
  renderDots();
}

function renderDots() {
  const bar = document.getElementById('dots');
  bar.innerHTML = '';
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i < attempts ? ' used' : '');
    d.textContent = i + 1;
    bar.appendChild(d);
  }
}

function showMessage(text, cls) {
  const box = document.getElementById('message');
  box.textContent = text;
  box.className = cls;
  box.style.display = 'block';
}

function addChip(num, cls) {
  const chip = document.createElement('span');
  chip.className = 'chip ' + cls;
  chip.textContent = num;
  document.getElementById('history').appendChild(chip);
}

function endGame() {
  document.getElementById('guess').disabled = true;
  document.getElementById('searchBtn').disabled = true;
  document.getElementById('again').style.display = 'block';
  gameOver = true;
}

document.getElementById('searchBtn').addEventListener('click', () => {
  if (gameOver) return;
  const input = document.getElementById('guess');
  const guess = parseInt(input.value, 10);

  if (!guess || guess < 1 || guess > 100) {
    showMessage('⚠️ Enter a valid number between 1 and 100.', '');
    return;
  }

  attempts++;
  document.getElementById('rem').textContent = MAX_ATTEMPTS - attempts;
  renderDots();
  input.value = '';

  if (guess > treasure) {
    showMessage('⬆️ Too Far Ahead — your guess is too high!', 'high');
    addChip(guess, 'high');
  } else if (guess < treasure) {
    showMessage('⬇️ Too Far Behind — your guess is too low!', 'low');
    addChip(guess, 'low');
  } else {
    showMessage('🎉 Treasure Found! The number was ' + treasure + '!', 'win');
    addChip(guess, '');
    endGame();
    return;
  }

  if (attempts >= MAX_ATTEMPTS) {
    showMessage('💀 Game Over! The treasure was at ' + treasure + '.', 'lose');
    endGame();
  }
});

document.getElementById('guess').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('searchBtn').click();
});

initGame();