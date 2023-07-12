import { createShip } from "./ships";

let gameBoard = (missed) => {
    return {
        player1Board: {},
        player2Board: {},
        shipMissed: missed,
        miss: function () {
            if (this.shipMissed === true) {
                this.shipMissed++
            }
        },
        recieveAttack: function (player, row, column) {
            //which board is being used//
            let board = player === 1 ? this.player1Board : this.player2Board
            //check if a shot has been fired//
            //if shot has been fired already there then do nothing//
            if (this.shotFired === false) {
                return;
                //if shot has not been fired check to see if ship is there//
            } else if (this.shotFired === true) {
                //false means they didn't hit a ship//
                if ([row][column] === false)
                    return this.shipMissed;
            } else {
                return this.shipHits++;
            }
            //record value of shot in gameboard for player//
            if (!board[row]) {
                board[row] = {}
            }
            //this is how/where to record value//
            //will be true or false depending on hit or not//
            board[row][column] = true
        },

        shotFired: function (player, row, column) {
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

function createGrids() {
    let grid1 = document.querySelector("#player1-gameboard");
    
    for (let r = 0; r < 10; r++) {
        let rows1 = document.createElement("div");
        rows1.classList.add("row")
        grid1.appendChild(rows1);
        
        for (let c = 0; c < 10; c++) {
            let columns1 = document.createElement("div");
            columns1.classList.add("column")
            grid1.appendChild(columns1);
        }
    }

    let grid2 = document.querySelector("#player2-gameboard");

    for (let r = 0; r < 10; r++) {
        let rows2 = document.createElement("div");
        rows2.classList.add("row")
        grid2.appendChild(rows2);
        
        for (let c = 0; c < 10; c++) {
            let columns2 = document.createElement("div");
            columns2.classList.add("column")
            grid2.appendChild(columns2);
        }
    }
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
export { createGrids };