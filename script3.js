const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const messageDisplay = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null); // Array to track the game state
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player turn
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (gameState[cellIndex] !== null || !isGameActive) {
        return; // If cell is already filled or game is over, do nothing
    }

    // Update game state and UI
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win or draw
    if (checkForWinner()) {
        messageDisplay.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (isDraw()) {
        messageDisplay.textContent = "It's a Draw!";
        isGameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if there is a winner
function checkForWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Check for draw
function isDraw() {
    return gameState.every(cell => cell !== null);
}

// Reset the game
function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameActive = true;
    messageDisplay.textContent = '';
}

// Add event listeners to each cell and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
