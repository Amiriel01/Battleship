import { createShip } from "./ships"
import { createGrids, createGameBoard } from "./gameboard";
import gameManager from "./game-manager";
import domManager from "./dom-manager";

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
            domManager().bindRandomizeShipsButton(this);
            domManager().bindOrientationButton(this);
            this.ships = this.createShips(this.root.querySelector("#ship-options"));
            createGrids(this.getGameBoard(), this.gameBoard, this);
            this.dragDropInitializer();
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
                setTimeout(() => {
                    //give a css animation for fade out//
                    gameManager().hideShips();
                }, 3000)
            }
        },


        randomizeShips() {
            this.ships.forEach((ship) => {
                if (!ship.shipPlaced) {
                    let index = Math.floor(Math.random() * 100);
                    let randomChance = Math.floor(Math.random() * 100);
                    if (randomChance > 50) {
                        this.flipOrientation();
                    }
                    this.shipDrop(null, index, ship);
                }
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

            //this checks to make sure ship isn't in a corner and wraps properly if it is//
            if (this.orientation === "Horizontal") {
                let endRow = Math.floor(endIndex / 10);
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
            //this line checks to see if we need a closest index//
            let shipFits = this.getValidTiles(index, ship, this.gameBoard).every((tile) => tile.ship === null);
            // console.log(shipFits)
            let xOffset = 0;
            let yOffset = 0;
            let incrementingX = true;
            let incrementingY = true;
            let currentFurthestX = 0;
            let currentFurthestY = 0;
            let direction = "Horizontal";
            const maxY = 100;
            let newIndex = index;
            while (shipFits === false) {
                console.log(`newIndex ${newIndex} xOffset ${xOffset} yOffset ${yOffset}`)
                if (direction === "Horizontal") {
                    //if the index + offset is less than zero or it is greater than the maxX then we want to flip directions//
                    //if we've gone further than we've gone before we also want to flip directions//
                    xOffset = incrementingX ? xOffset + 1 : xOffset - 1;
                    let flipDirection = false;
                    if ((index + xOffset) <= 0) {
                        flipDirection = true;
                        xOffset = xOffset + (Math.abs(index + xOffset));
                    }

                    let currentRow = Math.floor((index + yOffset) / 10);
                    let newRow = Math.floor((index + xOffset + yOffset) / 10);
                    if (currentRow !== newRow) {
                        if (currentRow < newRow) {
                            xOffset = xOffset + ((index + yOffset) - (index + xOffset + yOffset));
                        } else {
                            xOffset = xOffset - ((index + yOffset) - (index + xOffset + yOffset));
                        }
                        flipDirection = true;
                    }

                    if (currentFurthestX < Math.abs(xOffset)) {
                        flipDirection = true;
                        currentFurthestX = Math.abs(xOffset);
                    }

                    if (flipDirection === true) {
                        direction = "Vertical";
                        incrementingX = !incrementingX;
                    }

                } else if (direction === "Vertical") {
                    let roundedIndex = Math.floor(index / 10 )* 10;
                    yOffset = incrementingY ? yOffset + 10 : yOffset - 10;
                    let flipDirection = false;
                    if ((roundedIndex + yOffset) <= 0) {
                        flipDirection = true;
                        yOffset = yOffset + (Math.abs(roundedIndex + yOffset));
                    }

                    if (roundedIndex + yOffset >= maxY) {
                        flipDirection = true;
                        yOffset = yOffset - (maxY - (roundedIndex + yOffset));
                    }

                    if (currentFurthestY < Math.abs(yOffset)) {
                        flipDirection = true;
                        currentFurthestY = Math.abs(yOffset);
                    }

                    if (flipDirection === true) {
                        direction = "Horizontal";
                        incrementingY = !incrementingY;
                    }
                }
                newIndex = (yOffset + xOffset + index);
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
