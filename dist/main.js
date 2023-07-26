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

        bindOrientationButton: function () {
            let button = document.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });
        },

        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },


        // export { 
        //     bindPlayAgainButton, 
        //     bindOrientationButton
        // }
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


        initialize: function () {
            this.player1.initialize();
            this.player2.initialize();
            document.querySelector("#player-vs-computer").addEventListener("click", () => {
                this.playerVsAI = true
                
            });
            document.querySelector("#player-vs-player").addEventListener("click", () => this.playerVsAI = false);
        },

        alternateTurns: function () {
            if (this.turn === 1) {
                this.turn = 2;
                console.log(this.turn)
            } else {
                this.turn = 1;
                if (this.playerVsAI === true) {
                    computerSelection();
                }
                console.log(this.turn)
            }
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
            player.gameBoard.recieveAttack(1, tileIndex);
            this.alternateTurns();
            this.allSunk();
            
            // console.log(this.turn)
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
                document.querySelector("#instructions").style.color = "#ff0080";
                document.querySelector("#instructions").innerText = "Player 2 Wins!";
            } else if (player2ShipsSunk) {
                document.querySelector("#instructions").style.color = "#ff0080";
                document.querySelector("#instructions").innerText = "Player 1 Wins!";
            }
        },

        //computer selection//
        getComputerChoice: function () {
            let computerSelection = null;
            
            while (computerSelection === null) {
                Math.floor(Math.random() * 100);
                if (computerSelection !== null) {
                this.player2
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
                document.querySelector("#instructions").innerText = "You hit a ship!"
                // tile.ship.isSunk().count = 0;

                if (tile.ship.isSunk()) {
                    console.log("Ship is Sunk!");
                    console.log(tile.ship.isSunk())
                }
            } else {
                tile.isMiss = true;
                tile.tile.classList.add("miss");
                document.querySelector("#instructions").style.color = "#047fb0";
                document.querySelector("#instructions").innerText = "You missed the ships."
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
                } else {
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
        // flipOrientation: function () {
        //     if (this.orientation === "Horizontal") {
        //         this.orientation = "Vertical";
        //     } else {
        //         this.orientation = "Horizontal";
        //     }
        // },

        initialize: function () {
            (0,_dom_manager__WEBPACK_IMPORTED_MODULE_3__["default"])().bindOrientationButton();
            this.ships = this.createShips(this.root.querySelector("#ship-options"));
            (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGrids)(this.getGameBoard(), this.gameBoard, this);
            this.dragDropInitializer();
            this.bindRandomizeShipsButton();
            
        },

        // bindOrientationButton: function () {
        //     let button = this.root.querySelector("#ship-orientation");
        //     button.addEventListener("click", () => {
        //         this.flipOrientation();
        //         button.innerText = this.orientation;
        //     });
        // },

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
                ;(0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().hideShips();
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

            //this checks to make sure there isn't already a ship there and wraps properly if there is//
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