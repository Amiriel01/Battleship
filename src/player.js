import { createShip } from "./ships"
import { createGrids, createGameBoard } from "./gameboard";


let player = (rootElement, playerName) => {
    return {
        root: rootElement,
        shipDragCurrent: null,
        orientation: "Horizontal",
        playerName: playerName,
        ships: [],
        gameBoard: createGameBoard(),
        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },

        initialize: function () {
            this.bindOrientationButton();
            this.ships = this.createShips(this.root.querySelector("#ship-options"));
            createGrids(this.getGameBoard(), this.gameBoard);
            this.dragDropInitializer();
        },

        bindOrientationButton: function () {
            let button = this.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });
        },

        getGameBoard() {
            return document.getElementById(`${this.playerName}-gameboard`);
        },

        dragDropInitializer() {

            let grid = this.getGameBoard();
            let shipBank = this.root.querySelector("#ship-options");

            let tiles = grid.querySelectorAll(".tile");

            tiles.forEach((tile, tileIndex) => {
                tile.addEventListener("dragover", (e) => {
                    // console.log(getShip(e, ships))
                    e.preventDefault();
                    this.gridHoverOver(e, tileIndex, this.gameBoard);
                });

                tile.addEventListener("dragleave", (e) => this.gridLeaveHover(e));

                tile.addEventListener("drop", (event) => {
                    // console.log("drop");
                    event.preventDefault();
                    this.shipDrop(event, tileIndex, this.getShip(event, this.ships));
                    this.renderShips(shipBank, this.ships);
                })

               
            })

            
        },

        shipDragStart(e, shipIndex) {
            // console.log("dragstart");

            e.dataTransfer.effectAllowed = "all";
            e.dataTransfer.setData("ship", shipIndex);
            this.shipDragCurrent = shipIndex;
            // console.log(shipIndex)
        },

        shipDrop(e, tileIndex, ship) {
            ship.shipPlaced = true;
            this.getValidTiles(e, tileIndex, ship, this.gameBoard).forEach((tile) => {
                //places ship on multiple tiles, not just one tile//
                tile.ship = ship;
                tile.tile.classList.add("ship-here");
            })
        },

        gridHoverOver(e, tileIndex, gameBoard) {
            e.preventDefault();
            let ship = this.ships[this.shipDragCurrent];

            //this will make sure all the valid tiles are highlighted//
            // console.log(ship)
            this.getValidTiles(e, tileIndex, ship, gameBoard).forEach((tile) => {
                tile.tile.classList.add("ship-hover-marker");
            });
        },

        getValidTiles(e, tileIndex, ship, gameBoard) {
            let tile = gameBoard.myBoard[tileIndex];
            // console.log(tile);
            let startIndex = tileIndex;
            let endIndex = startIndex + ship.shipLength;
            let offset = 0;

            if (this.orientation === "Horizontal") {
                let endRow = Math.floor(endIndex / 10);
                if (endRow > tile.row) {
                    offset = endIndex % 10;
                    console.log(offset);
                }
            } else {
                let returnTiles = [];
                let startRow = Math.floor(startIndex / 10);
                let endRow = startRow + ship.shipLength;
                if (endRow > 10) {
                    offset = endRow - 10;
                    startRow = startRow - offset;
                    endRow = endRow - offset;
                }
                let columnValue = startIndex % 10;
                for (let i = 0; i < ship.shipLength; i++) {
                    let indexToGrab = (i * 10) + (startRow * 10) + columnValue;
                    console.log(indexToGrab)
                    returnTiles.push(gameBoard.myBoard[indexToGrab]);
                }
                return returnTiles;
            }

            startIndex = startIndex - offset;
            endIndex = endIndex - offset;
            // let decimalValue = ((startIndex % 10) - Math.floor(startIndex));

            // console.log(ship.shipLength);
            // console.log(this.orientation);
            // console.log(startIndex);
            // console.log(endIndex);

            // if (ship.shipLength === 5 && decimalValue === .6 && startIndex <= 95 || ship.shipLength === 4 && decimalValue === .7 && startIndex <= 96 || ship.shipLength === 3 && decimalValue === .8 && startIndex <= 97 || ship.shipLength === 2 && decimalValue === .9 && startIndex <= 98) {
            //     // console.log(decimalValue);
            //     return gameBoard.myBoard.slice(startIndex, endIndex);
            // } else {
            //     return [];
            // }
            return gameBoard.myBoard.slice(startIndex, endIndex);
        },

        gridLeaveHover(e) {
            e.preventDefault();
            this.getGameBoard().querySelectorAll(".ship-hover-marker").forEach((element) => {
                element.classList.remove("ship-hover-marker");
            })
        },

        getShip(e, ships) {
            //get data called ship, expect ship to be a number(index) and this number represents where in the array the ship is and it will return the ship object//

            let shipIndex = e.dataTransfer.getData("ship");
            // console.log(shipIndex)
            return ships[parseInt(shipIndex)];
        },

        

            createShips(element) {
        let ships = [
            createShip("Carrier", 5),
            createShip("Battleship", 4),
            createShip("Submarine", 3),
            createShip("Destroyer", 3),
            createShip("Patrol Boat", 2),
        ]
        this.renderShips(element, ships);
        return ships;
    },

    renderShips(element, ships) {
        element.innerHTML = "";

        ships.forEach((ship, shipIndex) => {
            if (ship.shipPlaced === false) {
                let shipElement = document.createElement("div");
                shipElement.innerText = ship.shipName;
                shipElement.classList.add("ship-element");
                element.appendChild(shipElement);
                shipElement.setAttribute('draggable', true);
                shipElement.addEventListener("dragstart", (e) => this.shipDragStart(e, shipIndex));
            }
        })
    },


}
}





//computer selection//
function getComputerChoice() {
    let computerSelection = Math.floor(Math.random() * 100);
    // return choices[computerSelection];
}

export {
    player
}
