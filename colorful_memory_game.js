const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "lime",
  "navy",
  "teal",
  "magenta",
  "cyan",
  "yellow",
];
let cards = [];
let selectedCards = [];
let score = 0;
let timeLeft = 60;
let gameInterval;

const startbtn = document.getElementById("startbtn");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

// Function to generate cards
function generateCards() {
  for (const color of cards) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color; // Corrected spelling here
    card.textContent = "?"; // Initially the card shows "?"
    gameContainer.appendChild(card); // Add the card to the game container
  }
}

// Function to shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Added return statement to return the shuffled array
}

// Function to handle card click
function handleCardClick(event) {
  const card = event.target;
  if (!card.classList.contains("card") || card.classList.contains("matched")) {
    return; // Ignore if the card is already matched or not a card
  }

  card.textContent = card.dataset.color;
  card.style.backgroundColor = card.dataset.color;
  selectedCards.push(card);

  // When two cards are selected, check for a match
  if (selectedCards.length === 2) {
    setTimeout(checkMatch, 300);
  }
}

// Function to check if two cards match
function checkMatch() {
  const [card1, card2] = selectedCards;
  if (card1.dataset.color === card2.dataset.color) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    score++;
    scoreElement.textContent = `Score: ${score} Matches`;
  } else {
    card1.textContent = "?";
    card2.textContent = "?";
    card1.style.backgroundColor = "#ddd";
    card2.style.backgroundColor = "#ddd";
  }
  if (score === 12) {
    alert("Congratulations! You Beat Vids First Game!");
    location.reload();
  }
  selectedCards = []; // Reset the selected cards array
}

// Function to start the game
function startGame() {
  startbtn.disabled = false; // Disable the start button during the game
  score = 0;
  scoreElement.textContent = `Score: ${score} Matches`;
  timeLeft = 60; // Reset the timer
  startGameTimer(timeLeft); // Start the game timer
  cards = shuffle(colors.concat(colors)); // Shuffle the cards
  selectedCards = []; // Clear selected cards
  gameContainer.innerHTML = ""; // Clear the game board
  generateCards(); // Generate new cards
  gameContainer.addEventListener("click", handleCardClick); // Add event listener for card clicks
}

// Function to handle the game timer
function startGameTimer() {
  timerElement.textContent = `Time Left: ${timeLeft} s`;
  gameInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft} s`;
    if (timeLeft === 0) {
      clearInterval(gameInterval); // Stop the timer
      alert("Game Over!");
      startbtn.disabled = false; // Enable the start button again
    }
  }, 1000);
}

// Event listener for the start button
startbtn.addEventListener("click", startGame);
