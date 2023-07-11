import { createShip } from "./ships";

let gameBoard = () => {
    return {
        player1Board: {},
        player2Board: {},
        recieveAttack: function (player, row, column) {
            //which board is being used//
            
            //check if a shot has been fired//
            //if shot has been fired already there then do nothing//
            //if shot has not been fired check to see if ship is there//
            //record value of shot in gameboard for player//
            let board = player === 1 ? this.player1Board : this.player2Board
            if (!board[row]) {
                board[row] = {}
            }
            //this is how/where to record value//
            //will be true or false depending on hit or not//
            board[row][column] = true
        },
        shotFired(player, row, column) {
            //if player = 1 ?(is true/false) true take option 1 and false take option 2//
            let board = player === 1 ? this.player1Board : this.player2Board
            // longer way to write it
            // let board;
            // if (player === 1) {
            //     board = this.player1Board;
            // } else {
            //     board = this.player2Board;
            // }
            if (board[row]) {
                if (board[row][column]) {
                    let value = board[row][column];
                    return value;
                }
            }
            return null;
        }
    };
}


// let pickShip = function () {
//     if (ship.name === "Carrier") {
//         createShip("Carrier", 5);
//     } else if (ship.name === "Battleship") {
//         createShip("Battleship", 4);
//     } else if (ship.name === "Destroyer") {
//         createShip("Destroyer", 4);
//     } else if (ship.name === "Submarine") {
//         createShip("Submarine", 3);
//     } else {
//         createShip("Patrol Boat", 3);
//     }
// }


export { gameBoard };