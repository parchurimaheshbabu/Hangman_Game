// Dummy Data
const hint = document.getElementById("hint");
const word = document.getElementById("word");
const msg = document.getElementById("msg");
const wordsToGuess = [
  ["apple", "a fruit"],
  ["elephant", "an animal"],
  ["vijaywada", "city name"],
];
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
// ctx.strokeStyle = "blue"; // Using color name
ctx.strokeStyle = "blue";
canvas.height = 400;
canvas.width = 400;
let selectedWord = "";
let displayWord = "";
let attempts = 0;
let maxAttempts = 6;
let guessedLetters = [];

const initializeGame = () => {
  const selectedIndex = parseInt(Math.random() * wordsToGuess.length);
  selectedWord = wordsToGuess[selectedIndex][0];
  hint.innerText = `Hint: ${wordsToGuess[selectedIndex][1]}`;
  displayWord = "_ ".repeat(selectedWord.length).trim();
  word.innerText = displayWord;
  drawHangman();
};
document.getElementById("chances").innerHTML = maxAttempts - attempts;
const drawHangman = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw base
  ctx.lineWidth = 1;

  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(50, 370, 300, 20);

  ctx.strokeStyle = "black";

  ctx.rect(50, 370, 300, 20);
  ctx.stroke();

  // vertical pole
  ctx.lineWidth = 1;

  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(100, 50, 20, 320);

  ctx.strokeStyle = "black";

  ctx.rect(100, 50, 20, 320);
  ctx.stroke();

  // horizontal line
  ctx.lineWidth = 1;

  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(120, 70, 120, 10);

  ctx.strokeStyle = "black";

  ctx.rect(120, 70, 120, 10);
  ctx.stroke();
  if (attempts > 0) {
    // top
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";

    ctx.moveTo(200, 80);
    ctx.lineTo(200, 120);
    ctx.stroke();
  }

  if (attempts > 1) {
    //face
    ctx.lineWidth = 3;
    ctx.moveTo(230, 150);
    ctx.arc(200, 150, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (attempts > 2) {
    ctx.lineWidth = 3;
    //body
    ctx.moveTo(200, 180);
    ctx.lineTo(200, 280);
    ctx.stroke();
  }
  if (attempts > 3) {
    ctx.lineWidth = 3;
    // left hand
    ctx.moveTo(200, 200);
    ctx.lineTo(150, 240);
    ctx.stroke();
  }
  if (attempts > 4) {
    ctx.lineWidth = 3;
    // right hand
    ctx.moveTo(200, 200);
    ctx.lineTo(260, 240);
    ctx.stroke();
  }
  if (attempts > 5) {
    ctx.lineWidth = 3;
    // left leg
    ctx.moveTo(200, 280);
    ctx.lineTo(150, 320);
    ctx.stroke();
  }
  if (attempts > 6) {
    ctx.lineWidth = 3;
    // right leg
    ctx.moveTo(200, 280);
    ctx.lineTo(260, 320);
    ctx.stroke();
  }
};
initializeGame();
const updateWord = () => {
  let updated = "";
  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.indexOf(selectedWord[i]) > -1) {
      updated += selectedWord[i] + " ";
    } else {
      updated += "_ ";
    }
  }
  displayWord = updated;
  word.innerText = updated;
};
const performAction = (event) => {
  const keyPressed = event.key.toLowerCase();
  if (guessedLetters.includes(keyPressed)) {
    return;
  }
  if (selectedWord.includes(keyPressed)) {
  } else {
    attempts++;
    if (maxAttempts - attempts <= -1) {
      document.getElementById("chances").innerHTML = "0 chances left";
    } else {
      var k = maxAttempts - attempts;
      document.getElementById("chances").innerHTML = `${k} chances left`;
    }
  }
  guessedLetters.push(keyPressed.toLowerCase());
  console.log({ attempts, guessedLetters });
  updateWord();
  drawHangman();
  if (displayWord.replace(/ /g, "") === selectedWord) {
    msg.innerText = "You won . ccongratulations 🎉🎊🍾";
    msg.className = "success";
  }
  if (attempts === 7) {
    msg.innerText = "Game over  ";

    msg.className = "warning";
    document.getElementById("retry").style = "display:block";
  }
};

document.addEventListener("keydown", performAction);

function retry() {
  location.reload();
}

// var currenttime = 0;
// var interval = setInterval(time, 1000);

// function time1(){
// setInterval(time, 1000);
// }
// function time(){
// currenttime = currenttime + 1;
// document.getElementById("sec").innerHTML =` ${currenttime}s`;
// }
