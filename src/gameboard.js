import { renderShips } from "./player";

let gameBoard = () => {
    return {
        player1Board: {},
        player2Board: {},

        myBoard: [],
        enemyBoard: [],

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

let createTile = (gridTile, row, column) => {
    return {
        //tile is the element tile in the DOM created for the grid (it's what you hover over)//
        tile: gridTile,
        //isHit represents whether shot was fired and is a hit//
        isHit: false,
        //isMiss represents whether shot was fired and is a miss//
        isMiss: false,
        //ship is the ship object if the ship is in the tile//
        ship: null,
        //row is the x coord//
        row: row,
        //column is the y coord//
        column: column,
    };

}

function createGrids(gridElement, gameBoardObject) {

    for (let r = 0; r < 10; r++) {

        for (let c = 0; c < 10; c++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            gridElement.appendChild(tile);
            let myGridTile = createTile(tile, r, c);
            let enemyGridTile = createTile(tile, r, c);
            gameBoardObject.myBoard.push(myGridTile);
            gameBoardObject.enemyBoard.push(enemyGridTile);
        }
    }
}

function dragDropInitializer(player, ships, gameBoardObject) {

    let grid;
    let shipBank;

    if (player === "player1") {
        grid = document.querySelector("#player1-gameboard");
        shipBank = document.querySelector("#ship-options1")
    } else if (player === "player2") {
        grid = document.querySelector("#player2-gameboard");
        shipBank = document.querySelector("#ship-options2");
    }

    let tiles = grid.querySelectorAll(".tile");

    tiles.forEach((tile, tileIndex) => {
        tile.addEventListener("dragover", (e) => gridHoverOver(e));
        tile.addEventListener("dragleave", (e) => gridLeaveHover(e));

        tile.addEventListener("drop", (event) => {
            console.log("drop");
            event.preventDefault();
            shipDrop(event, tileIndex, getShip(event, ships), gameBoardObject);
            renderShips(shipBank, ships);
            
        })
    })
}

function shipDragStart(e, shipIndex) {
    console.log("dragstart");
    console.log(shipIndex);
    e.dataTransfer.clearData();
    e.dataTransfer.setData("ship", shipIndex);
}

function shipDrop(e, tileIndex, ship, gameBoardObject) {
    let tileObject = gameBoardObject.myBoard[tileIndex];
    console.log(tileObject);
    tileObject.ship = ship;
    ship.shipPlaced = true;
    tileObject.tile.classList.add("ship-here");
}

function gridHoverOver(e) {
    e.preventDefault();
    let element = e.target;
    element.classList.add("ship-hover-marker");
}

function gridLeaveHover(e) {
    e.preventDefault();
    let element = e.target;
    element.classList.remove("ship-hover-marker");
}

function getShip(e, ships) {
    //get data called ship, expect ship to be a number(index) and this number represents where in the array the ship is and it will return the ship object//
    let shipIndex = e.dataTransfer.getData("ship");
    return ships[parseInt(shipIndex)];
}

export {
    gameBoard,
    createGrids,
    dragDropInitializer,
    shipDragStart,
};
