const Player = (name, symbol) => {
    let points = 0;
    const WinPoints = () => {
        points++;
        console.log(`${name} has now ${points} points`);
    }
    return { name, symbol, WinPoints };
}

const Gameboard = () => {
    const row = 3;
    const column = 3;
    const gameboard = []; 

    for(let i = 0; i < row; i++) {
        gameboard[i] = [];
        for(let j = 0; j < column; j++) {
            gameboard[i].push([""]);
        }
    }

    const PutSymbol = (symbol) => {
        const row = prompt("which row to put your symbol? ");
        const column = prompt("which column to put your symbol? ");
        if (gameboard[row-1][column-1] != "X" && gameboard[row-1][column-1] != "O") {
            gameboard[row-1][column-1] = symbol;
            console.log(gameboard);
            return false;
        }
        else {
            console.log("spot already taken, try again");
            return true;
        }
            
        
    }

    return { gameboard, PutSymbol };
}

const Game = () => {
    const board = Gameboard();
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let activePlayer = player1;
    let round = 0;

    const PlayRound = () => {
        round++;
        while(board.PutSymbol(activePlayer.symbol)) {
            board.PutSymbol(activePlayer.symbol);
        }
        if(CheckWin(activePlayer.symbol) == true) {
            console.log(`Game done, ${activePlayer.name} wins!`);
            return activePlayer.WinPoints();
        };
        if (round === 9) {
            return console.log(`Game done, this is a tie!`);
        }
        SwitchActivePlayer();
        PlayRound();
    }

    const SwitchActivePlayer = () => {
        if(activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    const CheckWin = (symbol) => {
        for(let i = 0; i < 3; i++) {
            if((board.gameboard[i][0] == symbol && board.gameboard[i][0] == board.gameboard[i][1] && board.gameboard[i][1] == board.gameboard[i][2])
                || (board.gameboard[0][i] == symbol && board.gameboard[0][i] == board.gameboard[1][i] && board.gameboard[1][i] == board.gameboard[2][i])) {
                    return true;

            }
        }
        if(board.gameboard[1][1] == symbol && ((board.gameboard[0][0] == board.gameboard[1][1] && board.gameboard[1][1] == board.gameboard[2][2]) || (board.gameboard[2][0] == board.gameboard[1][1] && board.gameboard[1][1] == board.gameboard[0][2]))) {
            return true
        }
        
    }
    PlayRound();
}

Game(); 
