window.addEventListener("load", function () {
  document.getElementById("drop").classList.add("active");
});

const play = document.getElementById("play");
const btn = document.createElement("button");
btn.textContent = "Play";
play.appendChild(btn);

document.getElementById("selector").classList.add("selector");
const selector = document.getElementById("selector");

let inPlay = false;
let yourPick = "", pcPick = "";
let lockChoice = false;
let gameOver = false;

// All win combos by button number
const winPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

// Check if someone has won or tied
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const btnA = document.getElementById(`grid-btn-${a}`).textContent;
    const btnB = document.getElementById(`grid-btn-${b}`).textContent;
    const btnC = document.getElementById(`grid-btn-${c}`).textContent;

    if (btnA && btnA === btnB && btnA === btnC) {
      gameOver = true;
      alert(`${btnA} wins!`);
      return;
    }
  }

  const allFilled = [...document.querySelectorAll(".grid-btn")]
    .every(b => b.textContent.trim() !== "");
  if (allFilled) {
    gameOver = true;
    alert("It's a tie!");
  }
}

// Random move for computer
function computerMove() {
  if (gameOver) return;

  const emptyButtons = [...document.querySelectorAll(".grid-btn")]
    .filter(b => b.textContent.trim() === "");
  if (emptyButtons.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyButtons.length);
    const randomButton = emptyButtons[randomIndex];
    randomButton.textContent = pcPick;
    // randomButton.style.backgroundColor = "lightblue";
    checkWinner();
  }
}

// PLAY button toggle
play.addEventListener("click", () => {
  inPlay = !inPlay;
  console.log(inPlay);
  if (inPlay) {
    btn.textContent = "Stop";
    gameOver = false;

    const xButton = document.createElement("button");
    const oButton = document.createElement("button");
    oButton.id = "oButton";
    xButton.id = "xButton";
    oButton.textContent = "O";
    xButton.textContent = "X";
    selector.appendChild(xButton);
    selector.appendChild(oButton);

    xButton.addEventListener("click", () => {
      if (!lockChoice) {
        yourPick = "X";
        pcPick = "O";
        lockChoice = true;
      }
    });
    oButton.addEventListener("click", () => {
      if (!lockChoice) {
        yourPick = "O";
        pcPick = "X";
        lockChoice = true;
      }
    });

  } else {
    lockChoice = false;
    gameOver = false;
    btn.textContent = "Play";
    yourPick = "";
    pcPick = "";
    selector.innerHTML = "";
    document.querySelectorAll(".grid-btn").forEach(b => b.textContent = "");
  }
});

// Create 9 grid buttons
const grid = document.getElementById("grid");
for (let i = 1; i <= 9; i++) {
  const gbtn = document.createElement("button");
  gbtn.id = `grid-btn-${i}`;
  gbtn.classList.add("grid-btn");
  gbtn.addEventListener("click", () => {
    if (inPlay && !gameOver && yourPick !== "" && gbtn.textContent === "") {
      gbtn.textContent = yourPick;
      // gbtn.style.backgroundColor = "lightgreen";
      checkWinner();
      if (!gameOver) {
        setTimeout(computerMove, 300);
      }
    }
  });
  grid.appendChild(gbtn);
}
  
