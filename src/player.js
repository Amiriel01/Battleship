import { createShip } from "./ships"
import { createGrids, createGameBoard } from "./gameboard";
import gameManager from "./game-manager";


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
            createGrids(this.getGameBoard(), this.gameBoard, this);
            this.dragDropInitializer();
            this.bindRandomizeShipsButton();
        },

        bindOrientationButton: function () {
            let button = this.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });
        },

        bindRandomizeShipsButton: function () {
            let button = this.root.querySelector(".randomize-button");
            button.addEventListener("click", () => {
                this.randomizeShips();
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
            if (e) {
                e.preventDefault();
            }
            ship.shipPlaced = true;
            this.getValidPlacement(tileIndex, ship, this.gameBoard).forEach((tile) => {
                //places ship on multiple tiles, not just one tile//
                tile.ship = ship;
                tile.tile.classList.add("ship-here");
            })
            let allShipsPlaced = this.ships.filter((ship) => ship.shipPlaced).length === 5;
            if (allShipsPlaced) {
                this.getGameBoard().querySelectorAll(".ship-hover-marker").forEach((element) => {
                    element.classList.remove("ship-hover-marker");
                })
                gameManager().hideShips();
            }
        },


        randomizeShips() {
            this.ships.forEach((ship) => {
                let index = Math.floor(Math.random() * 100);
                this.shipDrop(null, index, ship);
            })
            this.renderShips(this.root.querySelector("#ship-options"), this.ships);

        },

        gridHoverOver(e, tileIndex, gameBoard) {
            e.preventDefault();
            let ship = this.ships[this.shipDragCurrent];

            //this will make sure all the valid tiles are highlighted//
            // console.log(ship)
            this.getValidPlacement(tileIndex, ship, gameBoard).forEach((tile) => {
                tile.tile.classList.add("ship-hover-marker")
            })
        },

        getValidPlacement(tileIndex, ship, gameBoard) {
            let newIndex = this.getClosestIndex(tileIndex, ship);
            return this.getValidTiles(newIndex, ship, gameBoard);
        },

        getValidTiles(tileIndex, ship, gameBoard) {
            let tile = gameBoard.myBoard[tileIndex];
            // console.log(tile);
            let startIndex = tileIndex;
            let endIndex = startIndex + ship.shipLength;
            let offset = 0;
            // console.log(startIndex)
            // console.log(endIndex)

            //this checks to make sure there isn't already a shipt there and wraps properly if there is//
            if (tile.ship !== null && this.orientation === "Horizontal") {
                
            } else if (tile.ship !== null && this.orientation === "Vertical") {

            }
            //this checks to make sure ship isn't in a corner and wraps properly if it is//
            if (this.orientation === "Horizontal") {
                let endRow = Math.floor(endIndex / 10) / 10;
                if (endRow > tile.row) {
                    offset = endIndex % 10;
                    // console.log(offset);
                }
                startIndex = startIndex - offset;
                endIndex = endIndex - offset;

                return gameBoard.myBoard.slice(startIndex, endIndex);

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
                    // console.log(indexToGrab)
                    returnTiles.push(gameBoard.myBoard[indexToGrab]);
                }
                return returnTiles;
            }

        },

        //if ship does not fit gameboard will try to place ship in the closest location//
        getClosestIndex(index, ship) {
            let shipFits = false;
            let xOffset = 0;
            let yOffset = 0;
            let incrementingX = true;
            let incrementingY = true;
            let currentFurthestX = 0;
            let currentFurthestY = 0;
            let direction = "Horizontal";
            const maxX = 9;
            const maxY = 100;
            let newIndex = index;
            while (shipFits === false) {
                if (direction === "Horizontal") {
                    if ((currentFurthestX >= Math.abs(xOffset) + 1) || (index + xOffset < 0)) {
                        //continue will continue to loop but not do anything else within the loop for just this round and resets loop to start//
                        direction = "Vertical";
                        incrementingX = !incrementingX;
                        continue;
                    }
                    xOffset = incrementingX ? xOffset +1 : xOffset -1 
                    if (Math.abs(xOffset) >= maxX) {
                        xOffset = incrementingX ? maxX : maxX * -1; 
                    }
                    // let originalRow = Math.floor(index / 10);
                    // let newRow = Math.floor((newIndex + xOffset +  ship.shipLength) / 10);
                    // if (newRow < originalRow) {
                    //     xOffset = (index - (originalRow * 10)) * - 1;
                    // } else if (newRow > originalRow) {
                    //     xOffset = (newRow * 10) -index;
                    // }
                    if (currentFurthestX > Math.abs(xOffset)) {
                        currentFurthestX = Math.abs(xOffset);
                    }
                } else if (direction === "Vertical") {
                    if ((currentFurthestY >= Math.abs(yOffset) + 1)|| (index + (yOffset * 10) < 0)) {
                        //continue will continue to loop but not do anything else within the loop for just this round and resets loop to start//
                        direction = "Horizontal";
                        incrementingY = !incrementingY;
                        continue;
                    }
                    yOffset = incrementingY ? yOffset +1 : yOffset -1 
                    if (Math.abs(yOffset) * 10 >= maxY) {
                        yOffset = incrementingY ? maxY : maxY * -1; 
                    }
                    if (currentFurthestY > Math.abs(yOffset)) {
                        currentFurthestY = Math.abs(yOffset);
                    }
                }
                newIndex = (yOffset * 10) + xOffset + index;
                console.log(`newIndex ${newIndex} xOffset ${xOffset} yOffset ${yOffset}`)
                let tiles = this.getValidTiles(newIndex, ship, this.gameBoard);
                shipFits = tiles.every((tile) => tile.ship === null);
            }
            return newIndex;
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



export {
    player
}
