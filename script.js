// useful vars
const CLASS_CROSS = "cross";
const CLASS_CIRCLE = "circle";
let crossturn = true;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// selectors
const cells = document.querySelectorAll("[data-cell]");
const winningMessageScreen = document.querySelector(".winning-message");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
startGame();

// on click listeners
restartButton.addEventListener("click", restartGame);

// functions
function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setCellHover();
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "Draw !";
    winningMessageScreen.classList.add("show");
  } else {
    winningMessageTextElement.innerHTML = `${
      crossturn ? "Cross" : "Circle"
    } win !`;
  }
  winningMessageScreen.classList.add("show");
}
function restartGame() {
  winningMessageScreen.classList.remove("show");
  cells.forEach((element) => {
    element.classList.remove(CLASS_CIRCLE);
    element.classList.remove(CLASS_CROSS);
  });
  crossturn = true;
  startGame();
}
function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(CLASS_CIRCLE) ||
      cell.classList.contains(CLASS_CROSS)
    );
  });
}

function handleClick(e) {
  // place the mark
  const cell = e.target;
  const currentClass = crossturn ? CLASS_CROSS : CLASS_CIRCLE;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    // check for win
    endGame(false);
  } else if (isDraw()) {
    // check for draw
    endGame(true);
  } else {
    // switch turns
    console.log("else block called");
    switchTurn();
    setCellHover();
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function switchTurn() {
  crossturn = !crossturn;
}
function setCellHover() {
  const board = document.querySelector(".board");
  crossturn
    ? board.classList.add("cross") & board.classList.remove("circle")
    : board.classList.add("circle") & board.classList.remove("cross");
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) =>
      cells[index].classList.contains(currentClass)
    );
  });
}
