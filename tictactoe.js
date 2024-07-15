//function to make AJAX calls
function makeAjaxCall(action, data = {}) {
    return fetch('game_server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, ...data }),
    }).then(response => response.json());
}

//function to update the board UI
function updateBoard(gameState) {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`c${i+1}`).value = gameState.board[i];
    }
    document.getElementById('print').innerHTML = gameState.game_over
        ? (gameState.winner ? `Player ${gameState.winner} won` : "Match Tie")
        : `Player ${gameState.current_player} Turn`;
    
    if (gameState.game_over && gameState.winner) {
        highlightWinningCells(gameState.board, gameState.winner);
    }
}

//function to highlight winning cells
function highlightWinningCells(board, winner) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let combo of winningCombos) {
        if (board[combo[0]] === winner && board[combo[1]] === winner && board[combo[2]] === winner) {
            combo.forEach(index => {
                document.getElementById(`c${index + 1}`).classList.add(winner === 'X' ? 'win-cell-x' : 'win-cell-o');
            });
            break;
        }
    }
}

//function to update the leaderboard UI
function updateLeaderboard(leaderboard) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '<h2>Leaderboard</h2>';
    leaderboard.forEach((winner, index) => {
        leaderboardElement.innerHTML += `<p>${index + 1}. Player ${winner}</p>`;
    });
}

//function to handle cell click
function populate(cellId) {
    const cellIndex = parseInt(cellId.substr(1)) - 1;
    makeAjaxCall('move', { cell: cellIndex }).then(response => {
        updateBoard(response.game_state);
        updateLeaderboard(response.leaderboard);
    });
}

//function to reset the game
function clearBoard() {
    makeAjaxCall('reset').then(response => {
        updateBoard(response.game_state);
        updateLeaderboard(response.leaderboard);
        //remove winning cell highlights
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('win-cell-x', 'win-cell-o');
        });
    });
}

//initial board setup
makeAjaxCall('reset').then(response => {
    updateBoard(response.game_state);
    updateLeaderboard(response.leaderboard);
});