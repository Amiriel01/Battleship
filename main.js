/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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




let instance = null;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    if (instance !== null) {
        return instance;
    }

    instance = {
        player1: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player1-controls"), "player1"),
        player2: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player2-controls"), "player2"),
        turn: 2,
        

        initialize: function () {
            console.log(this.player1)
            this.player1.initialize();
            this.player2.initialize();
        },

        alternateTurns: function () {
            if (this.turn === 1) {
                this.turn = 2;
                
            } else {
                this.turn = 1;
                
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

        recieveAttackGame: function (tileIndex) {
            
            let player = this.getPlayerTurnObject();
            player.gameBoard.recieveAttack(1, tileIndex);
            this.alternateTurns();
            console.log(this.turn)
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
/* harmony export */   createGrids: () => (/* binding */ createGrids),
/* harmony export */   playAgain: () => (/* binding */ playAgain)
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

            console.log(tileIndex)
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


                if (tile.ship.isSunk()) {
                    // document.querySelector("#instructions").innerText = "You sunk a ship!"
                    console.log("Ship is Sunk!");
                }
            } else {
                tile.isMiss = true;
                tile.tile.classList.add("miss");
                document.querySelector("#instructions").style.color = "#047fb0";
                document.querySelector("#instructions").innerText = "You missed the ships."

            }

            // if (!board[row]) {
            //     board[row] = {}
            // }
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
                    (0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().recieveAttackGame(tileIndex);
                }

                // let clickLocation = [r, c];
                // console.log(clickLocation)

            })
        }

    }

}

function playAgain() {
    document.querySelector("#play-again").addEventListener("click", function () {
        document.location.reload();
    })

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
            this.bindOrientationButton();
            this.ships = this.createShips(this.root.querySelector("#ship-options"));
            (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGrids)(this.getGameBoard(), this.gameBoard, this);
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
            let allShipsPlaced = this.ships.filter((ship) => ship.shipPlaced).length === 5;
            if (allShipsPlaced) {
                (0,_game_manager__WEBPACK_IMPORTED_MODULE_2__["default"])().hideShips();
            }
        },

        gridHoverOver(e, tileIndex, gameBoard) {
            e.preventDefault();
            let ship = this.ships[this.shipDragCurrent];

            //this will make sure all the valid tiles are highlighted//
            // console.log(ship)
            this.getValidTiles(e, tileIndex, ship, gameBoard).forEach((tile) => {
                tile.tile.classList.add("ship-hover-marker")
                setTimeout(function() {
                    tile.tile.classList.remove("ship-hover-marker");
                }, 500);
            })
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
                    // console.log(offset);
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
                    // console.log(indexToGrab)
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





//computer selection//
function getComputerChoice() {
    let computerSelection = Math.floor(Math.random() * 100);
    // return choices[computerSelection];
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
// import { createShip } from "./ships";





(0,_game_manager__WEBPACK_IMPORTED_MODULE_1__["default"])()
    .initialize();

(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.playAgain)();









})();

/******/ })()
;
//# sourceMappingURL=main.js.map