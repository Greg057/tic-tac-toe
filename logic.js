const restartGameBtn = document.querySelector("#restart-game");
const cells = document.querySelectorAll(".cell");
const winner = document.querySelector("#winner");
const showPoints = document.querySelector("#point-count");




const Player = (name, symbol) => {
    let points = 0;
    const WinPoints = () => {
        points++;
        showPoints.textContent = `${name} has now ${points} points`;
    }
    return { name, symbol, WinPoints };
}

const Game = () => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let activePlayer = player1;
    let round = 0;

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {PutSymbol(cell, activePlayer.symbol);
        });
    });

    const PutSymbol = (cell, symbol) => {
        round++;
        console.log(round);
        cell.textContent = symbol;
        cell.disabled = true;
        if(CheckWin(symbol) == true) {
            cells.forEach((cell) => {
                cell.disabled = true; 
            });
            winner.textContent = `Game done, ${activePlayer.name} wins!`;
            return activePlayer.WinPoints();     
        };
        if (round === 9) {
            cells.forEach((cell) => {
                cell.disabled = true; 
            });
            return winner.textContent = `Game done, this is a tie!`;
        }
        SwitchActivePlayer();           
    }

    const SwitchActivePlayer = () => {
        if(activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    const CheckWin = (symbol) => {
        for(let i = 1; i < 8; i+=3) {
            if((document.getElementById(`${i}`).textContent == symbol && document.getElementById(`${i}`).textContent == document.getElementById(`${i+1}`).textContent && document.getElementById(`${i+1}`).textContent == document.getElementById(`${i+2}`).textContent)) {   
                return true;
            }
        }
        for(let i = 1; i < 4; i++) {
            if((document.getElementById(`${i}`).textContent == symbol && document.getElementById(`${i}`).textContent == document.getElementById(`${i+3}`).textContent && document.getElementById(`${i+3}`).textContent == document.getElementById(`${i+6}`).textContent)) {    
                return true;
            }
        }
        if((document.getElementById(`1`).textContent == symbol && (document.getElementById(`1`).textContent == document.getElementById(`5`).textContent && document.getElementById(`5`).textContent == document.getElementById(`9`).textContent)) 
        || (document.getElementById(`7`).textContent == symbol && (document.getElementById(`7`).textContent == document.getElementById(`5`).textContent && document.getElementById(`5`).textContent == document.getElementById(`3`).textContent))) {
            return true
        }
        
    }

    restartGameBtn.addEventListener("click", () => {
        cells.forEach((cell) => { 
            cell.textContent = "";
            cell.disabled = false;
            activePlayer = player1;
            round = 0;
        });

    });
}

Game();


