let colors = [];
let pickedColor;
let numSquares = 6;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('color-display');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('.new-color');
const modeButtons = document.querySelectorAll('.mode');

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(generateRandomColor());
  }
  return arr;
}

function resetGame() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "white";
}

function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function checkColor(square) {
  const clickedColor = square.style.backgroundColor;
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = "Correct!";
    changeColors(clickedColor);
    h1.style.backgroundColor = clickedColor;
    resetButton.textContent = "Play Again?";
  } else {
    square.style.backgroundColor="white";
    messageDisplay.textContent = "Try Again";
  }
}

function changeMode(selectedMode) {
  modeButtons.forEach(button => button.style.backgroundColor = "#4CAF50");
  selectedMode.style.backgroundColor = "gray";
  numSquares = selectedMode.textContent === "Easy" ? 3 : 6;
  resetGame();
}

// Initial setup
resetGame();

// Event listeners
resetButton.addEventListener('click', resetGame);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function() {
    checkColor(this);
  });
}

modeButtons.forEach(button => {
  button.addEventListener('click', function() {
    changeMode(this);
  });
});
