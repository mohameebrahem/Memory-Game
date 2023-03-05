const controlButtons = document.querySelector('.control-buttons');
const playerName = document.querySelector('.info-container span');
const duration = 1000;

controlButtons.addEventListener('click', () => {
  let userName = prompt('whats your name');

  if (userName == null || userName == '') {
    playerName.innerHTML = 'Dear';
  } else {
    playerName.innerHTML = userName[0].toUpperCase() + userName.slice(1);
  }

  blocks.forEach((block) => block.classList.add('is-flipped'));
  controlButtons.remove();
  setTimeout(() => {
    blocks.forEach((block) => block.classList.remove('is-flipped'));
  }, 500);
});

const blocksContainer = document.querySelector('.memory-game-blocks');
const blocks = Array.from(blocksContainer.children);
const orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener('click', () => {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = orderRange.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function flipBlock(selectedBlock) {
  selectedBlock.classList.add('is-flipped');
  let allFlippedBlocks = blocks.filter((fli) =>
    fli.classList.contains('is-flipped')
  );
  if (allFlippedBlocks.length == 2) {
    stopClicking();
    check(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function stopClicking() {
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
  }, duration);
}
function check(f, s) {
  let wrongTriesEl = document.querySelector('.tries span');
  if (f.dataset.memory == s.dataset.memory) {
    f.classList.remove('is-flipped');
    s.classList.remove('is-flipped');
    f.classList.add('has-match');
    s.classList.add('has-match');
    document.getElementById('success').play();
  } else {
    wrongTriesEl.innerHTML = +wrongTriesEl.innerHTML + 1;
    setTimeout(() => {
      f.classList.remove('is-flipped');
      s.classList.remove('is-flipped');
    }, duration);
    document.getElementById('fail').play();
  }
}
