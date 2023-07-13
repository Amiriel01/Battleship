import { createShip } from "./ships";

let gameBoard = () => {
    return {
        player1Board: {},
        player2Board: {},

        recieveAttack: function (player, row, column) {
            //which board is being used//
            let board = player === 1 ? this.player1Board : this.player2Board
            //check if a shot has been fired//
            //if shot has been fired already there then do nothing//
            let alreadyFired = this.shotFired(player, row, column);
            if (alreadyFired === null) {
                return;
            }
            //record value of shot in gameboard for player//
            if (!board[row]) {
                board[row] = {}
            }
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

function dragDrop() {
    let shipElement = document.querySelector(".ship-element");

    shipElement.addEventListener("dragstart", (event) => {
        console.log("dragstart");
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.target.id);
    })

    grid1.addEventListener("dragover", (event) => {
        console.log("dragover");
        event.preventDefault();
    })
    grid1.addEventListener("drop", (event) => {
        console.log("drop");
        event.preventDefault();
        event.dataTransfer.getData("text/plain", shipElement);
        if (event.target.id === "#player1-gameboard") {
            shipElement.parentNode.removeChild(shipElement);
            event.target.appendChild(shipElement);
        }
    })
}
function createShips(element) {
    let ships = [
        createShip("Carrier", 5),
        createShip("Carrier", 5),
        createShip("Battleship", 4),
        createShip("Battleship", 4),
        createShip("Submarine", 3),
        createShip("Submarine", 3),
        createShip("Destroyer", 3),
        createShip("Destroyer", 3),
        createShip("Patrol Boat", 2),
        createShip("Patrol Boat", 2)
    ]
    ships.forEach((ship) => {
        let shipElement = document.createElement("div");
        shipElement.innerText = ship.shipName;
        shipElement.id = "ship-element";
        element.appendChild(shipElement);
        shipElement.setAttribute('draggable', true);
    })
}

export {
    gameBoard,
    createGrids,
    createShips,
    dragDrop,
};
