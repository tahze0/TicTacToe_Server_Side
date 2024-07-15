<?php
session_start();

//initialize game state if not exists
if (!isset($_SESSION['game_state'])) {
    $_SESSION['game_state'] = [
        'board' => array_fill(0, 9, ''),
        'current_player' => 'X',
        'game_over' => false,
        'winner' => null
    ];
}

//initialize leaderboard if not exists
if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

function checkWinner($board) {
    $winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    foreach ($winningCombos as $combo) {
        if ($board[$combo[0]] != '' &&
            $board[$combo[0]] == $board[$combo[1]] &&
            $board[$combo[0]] == $board[$combo[2]]) {
            return $board[$combo[0]];
        }
    }

    return null;
}

function isBoardFull($board) {
    return !in_array('', $board);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST')  {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'move':
                if (isset($data['cell']) && !$_SESSION['game_state']['game_over']) {
                    $cell = $data['cell'];
                    if ($_SESSION['game_state']['board'][$cell] === '') {
                        $_SESSION['game_state']['board'][$cell] = $_SESSION['game_state']['current_player'];
                        
                        $winner =  checkWinner($_SESSION['game_state']['board']);
                        if ($winner) {
                            $_SESSION['game_state']['game_over'] = true;
                            $_SESSION['game_state']['winner'] = $winner;
                            //add to leaderboard
                            $_SESSION['leaderboard'][] = $winner;
                            $_SESSION['leaderboard'] = array_slice($_SESSION['leaderboard'], -10);
                        } elseif (isBoardFull($_SESSION['game_state']['board'])) {
                            $_SESSION['game_state']['game_over'] = true;
                        } else {
                            $_SESSION['game_state']['current_player'] = ($_SESSION['game_state']['current_player'] === 'X') ? 'O' : 'X';
                        }
                    }
                }
                break;
            case 'reset':
                $_SESSION['game_state'] = [
                    'board' => array_fill(0, 9, ''),
                    'current_player' => 'X',
                    'game_over' => false,
                    'winner' => null
                ];
                break;
        }
    }
    
    header('Content-Type: application/json');
    echo json_encode([
        'game_state' => $_SESSION['game_state'],
        'leaderboard' => $_SESSION['leaderboard']
    ]);
}
?>
