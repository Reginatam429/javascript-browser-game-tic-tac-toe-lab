//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');

const messageEl = document.getElementById('message');

const resetBtnEl = document.getElementById('reset');

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

    render(); // Re-render board
    console.log("Game reset!"); // Log reset action
};

const placePiece = (index) => {
    board[index] = turn;
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
    })
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        return messageEl.textContent = `Player's ${turn} Turn`;
    } else if (winner === false && tie === true) {
        return messageEl.textContent = "Game is Tied!";
    } else {
        return messageEl.textContent = `Winner is Player ${turn}!`;
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