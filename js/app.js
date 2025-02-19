/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
const gameGifEl = document.getElementById('gamegif');

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board = [ '', '', '', '', '', '', '', '', '' ];
let squareIndex = '';
let turn = "X"; //  Player O will be represented by uppercase "O"
let winner = false; //  A value of true in winner will mean that a player has won.
let tie = false; // A true value in tie will mean that the board array contains no more empty strings ('') and will be used to render a tie message if winner is still false by the time all squares are played.

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Reset board
    winner = false; // Reset winner
    tie = false; // Reset tie
    turn = "X"; // Reset turn to "X"
    gameGifEl.src = "images/default.gif"; // Reset to default GIF
    console.log("GIF Path Set To:", gameGifEl.src);
    render(); // Re-render board
    console.log("Game reset!"); // Log reset action
};

const placePiece = (index) => {
    board[index] = turn;
    if (turn === "X") {
        board[index] = "images/x.png"; // Store image path for X
    } else {
        board[index] = "images/o.png"; // Store image path for O
    }
};
//placePiece(1); //testing if placePiece updates the board

const checkForTie = () => {
    if (winner === true) {
        return
    }
    if (board.includes('')) {
        return
    }
    tie = true;
};

const switchPlayerTurn = () => {
    if (winner === true || tie === true) {
        return
    }
    switch(turn) {
        case "X":
            turn = "O";
            break;
        case "O":
            turn = "X";
            break
    }
    
};

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
    
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue; // Move to the next winning combo
        }

        if (board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
         }
}};


const handleClick = (event) => {
    const square = event.target;
    squareIndex = parseInt(square.id);

    // if the square is taken,game is tied or over, exit 
    if (square.textContent !== '' || winner === true || tie === true) {
        return
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
};

const updateBoard = () => {
    squareEls.forEach((square, idx ) => {
        square.textContent = board[idx];
        if (board[idx] === "images/x.png" || board[idx] === "images/o.png") {
            square.innerHTML = `<img src="${board[idx]}" alt="Player Move" class="piece-img">`;
        } else {
            square.innerHTML = ""; // Empty square if no move yet
        }
    })
};

const updateMessage = () => {

    if (winner) {
        messageEl.textContent = `Player ${turn} Wins! 🎉`;
        gameGifEl.src = "images/winner.gif"; // Change GIF for winner
    } else if (tie) {
        messageEl.textContent = "It's a Tie! 😐";
        gameGifEl.src = "images/tie.gif"; // Change GIF for a tie
    } else {
        messageEl.textContent = `Player ${turn}'s Turn 🤔 `;
        // gameGifEl.src = "images/thinking.gif"; // Change GIF when playing
        if (!board.every(cell => cell === '')) { 
            gameGifEl.src = "images/thinking.gif"; 
        }
    }
};

const render = () => {
    updateBoard();
    updateMessage();
};
/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('.board').addEventListener('click', (event) => {
    //checks if you're clicking on a valid square
    if (event.target.classList.contains('sqr')) {
        handleClick(event);
    }
    return;
});

resetBtnEl.addEventListener('click', () => {
    init();
});

init();
render();