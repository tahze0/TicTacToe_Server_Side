//function to print results when game ends
function printGameResult(winningPlayer, cell1, cell2, cell3) {
    document.getElementById('print').innerHTML = "Player " + winningPlayer + " won";
    document.getElementById('print').style.opacity = 1; 

 if (winningPlayer == 'X') {
     cell1.classList.add('win-cell-x');
     cell2.classList.add('win-cell-x');
     cell3.classList.add('win-cell-x');
 } else if (winningPlayer == '0') {
     cell1.classList.add('win-cell-o');
     cell2.classList.add('win-cell-o');
     cell3.classList.add('win-cell-o');
 }


}

//clear board
function clearBoard() { 
    location.reload(); 
    c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = '';
    document.getElementById('print').style.opacity = 0; 
} 

//function to close all input cells when game ends
function disableAllCells() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.disabled = true;
    });
}


// called after a player populates a cell
function updateBoard() { 
  
    // getting cell values after each turn
    var c1, c2, c3, c4, c5, c6, c7, c8, c9; 

    c1 = document.getElementById("c1").value; 
    c2 = document.getElementById("c2").value; 
    c3 = document.getElementById("c3").value; 
    c4 = document.getElementById("c4").value; 
    c5 = document.getElementById("c5").value; 
    c6 = document.getElementById("c6").value; 
    c7 = document.getElementById("c7").value; 
    c8 = document.getElementById("c8").value; 
    c9 = document.getElementById("c9").value; 
    
    //geting cell buttons in order to change color according to turn and winning condition
    var c1btn, c2btn, c3btn, c4btn, c5btn,  
        c6btn, c7btn, c8btn, c9btn; 
          
    c1btn = document.getElementById("c1"); 
    c2btn = document.getElementById("c2"); 
    c3btn = document.getElementById("c3"); 
    c4btn = document.getElementById("c4"); 
    c5btn = document.getElementById("c5"); 
    c6btn = document.getElementById("c6"); 
    c7btn = document.getElementById("c7"); 
    c8btn = document.getElementById("c8"); 
    c9btn = document.getElementById("c9"); 
  
    // Checking if player won in 1st row
    if (((c1 == 'X') && (c2 == 'X') && (c3 == 'X')) 
    || ((c1 == '0') && (c2 == '0') && (c3 == '0'))) { 

        printGameResult(c1, c1btn, c2btn, c3btn);
        disableAllCells();

    } 
    // Checking if player won in 1st column
    else if (((c1 == 'X') && ( c4 == 'X') && (c7 == 'X')) ||
    ((c1 == '0') && (c4 == '0') && (c7 == '0'))) { 

        printGameResult(c1, c1btn, c4btn, c7btn);
        disableAllCells();
        

    } 

    // Checking if player won in 2nd row
    else if (((c4 == 'X') && (c5 == 'X') && (c6 == 'X')) ||
    ((c4 == '0') && (c5 == '0') && (c6 == '0'))) { 
        
        printGameResult(c4, c4btn, c5btn, c6btn);
        disableAllCells();

    }

    //Checking if player won in 2nd column
    else if (((c2 == 'X') && (c5 == 'X') && (c8 == 'X')) ||
    ((c2 == '0') && (c5 == '0') && (c8 == '0'))) { 
        
        printGameResult(c2, c2btn, c5btn, c8btn);
        disableAllCells();

    }

    //Checking if player won in 3rd row
    else if (((c7 == 'X') && (c8 == 'X') && (c9 == 'X')) ||
    ((c7 == '0') && (c8 == '0') && (c9 == '0'))) { 
        
        printGameResult(c7, c7btn, c8btn, c9btn);
        disableAllCells();

    }

    //Checking if player won in 3rd column
    else if (((c3 == 'X') && (c6 == 'X') && (c9 == 'X')) ||
    ((c3 == '0') && (c6 == '0') && (c9 == '0'))) { 
        
        printGameResult(c3, c3btn, c6btn, c9btn);
        disableAllCells();

    }

    //Checking if player won in 1st diagonal
    else if (((c1 == 'X') && (c5 == 'X') && (c9 == 'X')) ||
    ((c1 == '0') && (c5 == '0') && (c9 == '0'))) { 
        
        printGameResult(c1, c1btn, c5btn, c9btn);
        disableAllCells();

    }

    //Checking if player won in 2nd diagonal
    else if (((c3 == 'X') && (c5 == 'X') && (c7 == 'X')) ||
    ((c3 == '0') && (c5 == '0') && (c7 == '0'))) { 
        
        printGameResult(c3, c3btn, c5btn, c7btn);
        disableAllCells();
    }

    // Check Tie 
    else if ((c1 == 'X' || c1 == '0') && (c2 == 'X'|| c2 == '0') && (c3 == 'X' || c3 == '0') && 
        (c4 == 'X' || c4 == '0') && (c5 == 'X' || c5 == '0') && (c6 == 'X' || c6 == '0') && 
        (c7 == 'X' || c7 == '0') && (c8 == 'X' || c8 == '0') && (c9 == 'X' || c9 == '0')) { 

        document.getElementById('print').innerHTML = "Match Tie";
        document.getElementById('print').style.opacity = 1; 
        disableAllCells();
    } 

    //no game-ending condition is met, continue incrementing game controller
    else { 

        if (flag == 1) { 
            document.getElementById('print').innerHTML = "Player X Turn"; 
        } 
        else { 
            document.getElementById('print').innerHTML = "Player 0 Turn"; 
        } 
    } 
} 
  
 //Game Controller 
// populate based on turn of player 0 or X controlled by flag

let flag = 1; //player X starts

function populate(cellId) {
    let cell = document.getElementById(cellId);
    if (flag === 1) {
        cell.value = "X";
        flag = 0;
    } else {
        cell.value = "0";
        flag = 1;
    }
    cell.disabled = true;
}