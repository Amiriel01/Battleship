/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-manager.js":
/*!****************************!*\
  !*** ./src/dom-manager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");


let instance = null;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    if (instance !== null) {
        return instance;
    }

    instance = {

        bindPlayAgainButton: function () {
            document.querySelector("#play-again").addEventListener("click", function () {
                document.location.reload();
            })
        },

        bindOrientationButton: function (player) {
            let button = player.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                player.flipOrientation();
                button.innerText = player.orientation;
            });
        },

        bindRandomizeShipsButton: function (player) {
            let button = player.root.querySelector(".randomize-button");
            button.addEventListener("click", () => {
                player.randomizeShips();
            });
        },

    }
    return instance
});


/***/ }),

/***/ "./src/game-manager.js":
/*!*****************************!*\
  !*** ./src/game-manager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _dom_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-manager */ "./src/dom-manager.js");







let instance = null;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    if (instance !== null) {
        return instance;
    }

    instance = {
        player1: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player1-controls"), "player1"),
        player2: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player2-controls"), "player2"),
        turn: 2,
        playerVsAI: false,
        allShipsSunk: false,
        timeOut: false,


        initialize: function () {
            this.player1.initialize();
            this.player2.initialize();
            document.querySelector("#player-vs-computer").addEventListener("click", () => {
                this.playerVsAI = true
                this.player2.randomizeShips()
            });
            document.querySelector("#player-vs-player").addEventListener("click", () => this.playerVsAI = false);
        },

        alternateTurns: function () {
            // if (this.allShipsSunk === true) {
            //     clearTimeout(this.timeOut);
            //     return;
            // }
            if (this.turn === 1) {
                this.turn = 2;
            } else {
                this.turn = 1;
                if (this.playerVsAI === true) {
                    this.timeOut = setTimeout(() => {
                        if (!this.allShipsSunk) {
                            let target = this.getComputerChoice();
                            this.recieveAttackGame(target, this.player1);
                        }
                    }, 2000)
                }
            }
            // console.log(this.tileIndex)
            console.log(this.turn);
        },

        turnOrder: function (playerObject) {
            if (this.turn === 1) {
                return this.player1 === playerObject;
            } else {
                return this.player2 === playerObject;
            }
        },

        getPlayerTurnObject: function () {
            if (this.turn === 1) {
                return this.player1;
            } else {
                return this.player2;
            }
        },

        recieveAttackGame: function (tileIndex, originatingPlayerGameboard) {

            let player = this.getPlayerTurnObject();

            if (player !== originatingPlayerGameboard) {
                return;
            }

           

            let tile = player.gameBoard.myBoard[tileIndex];
            if (!tile.isHit && !tile.isMiss){
                player.gameBoard.recieveAttack(1, tileIndex);
                this.alternateTurns();
                this.allSunk();
            }
           
        },

        canStartGame: function () {
            return !(this.player1.ships.filter(ship => ship.shipPlaced).length < 5
                || this.player2.ships.filter(ship => ship.shipPlaced).length < 5);
        },

        hideShips: function () {

            this.player1.getGameBoard().querySelectorAll(".ship-here").forEach(element => {
                element.classList.remove("ship-here");
            });
            this.player2.getGameBoard().querySelectorAll(".ship-here").forEach(element => {
                element.classList.remove("ship-here");
            });
        },

        allSunk: function () {
            let player1ShipsSunk = this.player1.ships.every((ship) => ship.isSunk())
            let player2ShipsSunk = this.player2.ships.every((ship) => ship.isSunk())

            if (player1ShipsSunk) {
                if (this.playerVsAI === false) {
                    document.querySelector("#instructions").style.color = "purple";
                    document.querySelector("#instructions").innerText = "Player 2 Wins!";
                    this.allShipsSunk = true;
                } else {
                    document.querySelector("#instructions").style.color = "purple";
                    document.querySelector("#instructions").innerText = "The Computer Wins!";
                    this.allShipsSunk = true;
                }
            } else if (player2ShipsSunk) {
                document.querySelector("#instructions").style.color = "purple";
                document.querySelector("#instructions").innerText = "Player 1 Wins!";
                this.allShipsSunk = true;
            }
        },

        //computer selection//
        getComputerChoice: function () {
            let computerSelection = null;

            while (computerSelection === null) {
                let index = Math.floor(Math.random() * 100);
                let tile = this.player1.gameBoard.myBoard[index];
                if (tile.isHit === false && tile.isMiss === false) {
                    computerSelection = index;
                }
            }
            return computerSelection;
        }
    };
    return instance;
});




// export { startGame }









/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGameBoard: () => (/* binding */ createGameBoard),
/* harmony export */   createGrids: () => (/* binding */ createGrids)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _game_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-manager */ "./src/game-manager.js");


// import { startGame } from "./game-manager";
// import { player } from "./player";


let createGameBoard = () => {
    return {
        // player1Board: {},
        // player2Board: {},

        myBoard: [],
        enemyBoard: [],

        recieveAttack: function (player, tileIndex) {
            //which board is being used//
            // let board = player === 1 ? this.myBoard : this.enemyBoard
            //check if a shot has been fired//
            //if shot has been fired already there then do nothing//
            // startGame();

            let alreadyFired = this.shotFired(player, tileIndex);

            let board = player === 1 ? this.myBoard : this.enemyBoard

            let tile = board[tileIndex];

            // console.log(tileIndex)
            if (alreadyFired) {
                return;
            }
            //record value of shot in gameboard for player//
            if (tile.ship) {
                tile.isHit = true;
                tile.ship.hit();
                tile.tile.classList.add("hit");
                document.querySelector("#instructions").style.color = "#FF003F";
                if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().playerVsAI === false) {
                    if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().turn === 2) {
                        document.querySelector("#instructions").innerText = "Player One hit a ship."
                    } else {
                        document.querySelector("#instructions").innerText = "Player Two hit a ship."
                    }
                } else {
                    if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().turn === 2) {
                        document.querySelector("#instructions").innerText = "Player One hit a ship."
                    } else {
                        document.querySelector("#instructions").innerText = "The Computer hit a ship."
                    }
                }
                // tile.ship.isSunk().count = 0;

                if (tile.ship.isSunk()) {
                    // console.log("Ship is Sunk!");
                    console.log(tile.ship.isSunk())
                }
            } else {
                tile.isMiss = true;
                tile.tile.classList.add("miss");
                document.querySelector("#instructions").style.color = "#7fcdff";
                document.querySelector("#instructions").style.textShadow = "-1px 1px 2px #064273,1px 1px 2px #064273, 1px -1px 0 #064273,-1px -1px 0 #064273";
                if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().playerVsAI === false) {
                    if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().turn === 2) {
                        document.querySelector("#instructions").innerText = "Player One missed the ships."
                    } else {
                        document.querySelector("#instructions").innerText = "Player Two missed the ships."
                    }
                } else {
                    if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().turn === 2) {
                        document.querySelector("#instructions").innerText = "Player One missed the ships."
                    } else {
                        document.querySelector("#instructions").innerText = "The Computer missed the ships."
                    }
                }
            }
        },


        shotFired: function (player, tileIndex) {
            //if player = 1 ?(is true/false) true take option 1 and false take option 2//
            let board = player === 1 ? this.myBoard : this.enemyBoard

            let tile = board[tileIndex];

            return tile.isHit === true || tile.isMiss === true;
        },
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

function createGrids(gridElement, gameBoardObject, player) {

    for (let r = 0; r < 10; r++) {

        for (let c = 0; c < 10; c++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            gridElement.appendChild(tile);
            let myGridTile = createTile(tile, r, c);
            let enemyGridTile = createTile(tile, r, c);
            gameBoardObject.myBoard.push(myGridTile);
            gameBoardObject.enemyBoard.push(enemyGridTile);
           

            tile.addEventListener("click", () => {
 
                let tileIndex = (r * 10) + c;
                
                if (!(0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().canStartGame()) {
                    document.querySelector("#instructions").style.color = "#FF4500";
                    document.querySelector("#instructions").innerText = "Place all ships on the boards before starting the game!"
                    return;
                } else if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().allShipsSunk === true) {
                    return;
                } else {
                    if ((0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().turn === 1 && (0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().playerVsAI === true){
                        return;
                    }
                    (0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().recieveAttackGame(tileIndex, player);
                }

                // let clickLocation = [r, c];
                // console.log(clickLocation)

            })
        }

    }

}






/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _game_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-manager */ "./src/game-manager.js");
/* harmony import */ var _dom_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-manager */ "./src/dom-manager.js");





let player = (rootElement, playerName) => {

    return {
        root: rootElement,
        shipDragCurrent: null,
        orientation: "Horizontal",
        playerName: playerName,
        ships: [],
        gameBoard: (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(),

        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },

        initialize: function () {
            (0,_dom_manager__WEBPACK_IMPORTED_MODULE_3__["default"])().bindRandomizeShipsButton(this);
            (0,_dom_manager__WEBPACK_IMPORTED_MODULE_3__["default"])().bindOrientationButton(this);
            this.ships = this.createShips(this.root.querySelector("#ship-options"));
            (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGrids)(this.getGameBoard(), this.gameBoard, this);
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
                    ;(0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().hideShips();
                }, 2000)
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
            const maxY = 99;
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
                        yOffset = yOffset - (maxY - (roundedIndex + yOffset ));
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
                (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Carrier", 5),
                (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Battleship", 4),
                (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Submarine", 3),
                (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Destroyer", 3),
                (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Patrol Boat", 2),
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






/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createShip: () => (/* binding */ createShip)
/* harmony export */ });
//create the ship factory function//
//all boats start with 0 hits and are floating//
let createShip = (name, length, row, column, orientation = "Horizontal", hits = 0) => {
   return {
      shipName: name,
      shipLength: length,
      shipRow: row,
      shipColumn: column,
      shipPlaced: false,
      shipOrientation: orientation,
      shipHits: hits,
      hit: function () {
         if (this.shipHits + 1 <= this.shipLength) {
            this.shipHits++
         }
      },
      isSunk: function () {
         return this.shipHits >= this.shipLength
      },
   };
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _game_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-manager */ "./src/game-manager.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-manager */ "./src/dom-manager.js");
// import { createShip } from "./ships";








(0,_game_manager__WEBPACK_IMPORTED_MODULE_1__["default"])()
    .initialize();

// bindPlayAgainButton();
// bindRandomizeShipsButton();











})();

/******/ })()
;
//# sourceMappingURL=main.js.map