let playerChoice = ''; 
let autoChoice = '';
let resultDisplay = document.getElementById('result');
let isPlaying = false;

const playerDisplay = document.getElementById('playerDisplay');
const autoDisplay = document.getElementById('autoDisplay');
const playBtn = document.getElementById('playBtn');
const choiceBtns = document.querySelectorAll('.choice-btn');

// Choices & Rules for RPSLS
const choices = ['🪨', '📄', '✂️', '🦎', '🖖'];
const rules = {
    '🪨': ['✂️', '🦎'],  // Rock crushes Scissors, crushes Lizard
    '📄': ['🪨', '🖖'],  // Paper covers Rock, disproves Spock
    '✂️': ['📄', '🦎'],  // Scissors cuts Paper, decapitates Lizard
    '🦎': ['📄', '🖖'],  // Lizard eats Paper, poisons Spock
    '🖖': ['✂️', '🪨']   // Spock smashes Scissors, vaporizes Rock
};

// Player chooses
choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (isPlaying) return;
        playerChoice = button.innerHTML;
        playerDisplay.innerHTML = playerChoice;
    });
});

// Play game
playBtn.addEventListener('click', async () => {
    if (isPlaying) return;
    if (!playerChoice) {
        resultDisplay.textContent = "Choose an option!";
        return;
    }

    isPlaying = true;
    playBtn.disabled = true;
    resultDisplay.textContent = "Auto is choosing...";

    await showAutoChoiceAnimation();

    autoChoice = getAutoChoice();
    autoDisplay.innerHTML = autoChoice;

    determineWinner();

    setTimeout(() => {
        isPlaying = false;
        playBtn.disabled = false;
    }, 1000);
});

// Get auto choice
function getAutoChoice() {
    return choices[Math.floor(Math.random() * 5)];
}

// Animation for auto choice selection
async function showAutoChoiceAnimation() {
    for (let i = 0; i < 3; i++) {
        for (let choice of choices) {
            autoDisplay.textContent = choice;
            await delay(100);
        }
    }
}

// Determine winner
function determineWinner() {
    if (playerChoice === autoChoice) {
        resultDisplay.textContent = "It's a draw!";
    } else if (rules[playerChoice].includes(autoChoice)) {
        resultDisplay.textContent = "You win!";
    } else {
        resultDisplay.textContent = "You lose!";
    }
}

// Delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Reset game
function resetGame() {
    playerChoice = '';
    autoChoice = '';
    playerDisplay.textContent = '🧑';
    autoDisplay.textContent = '🤖';
    resultDisplay.textContent = '';
}
