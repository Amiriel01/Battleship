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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    
    return {
        player1: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player1-controls")),
        player2: (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)(document.getElementById("player2-controls")),
        initialize: function () {
            console.log(this.player1)
            this.player1.initialize();
            this.player2.initialize();
        }
    };
});

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrids: () => (/* binding */ createGrids),
/* harmony export */   dragDropInitializer: () => (/* binding */ dragDropInitializer),
/* harmony export */   gameBoard: () => (/* binding */ gameBoard),
/* harmony export */   shipDragStart: () => (/* binding */ shipDragStart)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
// import { createShips } from "./player";


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
            (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderShips)(shipBank, ships);
            
        })
    })
}

// function createShips(element) {
//     let ships = [
//         createShip("Carrier", 5),
//         createShip("Battleship", 4),
//         createShip("Submarine", 3),
//         createShip("Destroyer", 3),
//         createShip("Patrol Boat", 2),
//     ]
//     renderShips(element, ships);
//     return ships;
// }

// function renderShips(element, ships) {
//     element.innerHTML = "";

//     ships.forEach((ship, shipIndex) => {
//         if (ship.shipPlaced === false) {
//             let shipElement = document.createElement("div");
//             shipElement.innerText = ship.shipName;
//             shipElement.classList.add("ship-element");
//             element.appendChild(shipElement);
//             shipElement.setAttribute('draggable', true);
//             shipElement.addEventListener("dragstart", (e) => shipDragStart(e, shipIndex));
//         }
//     })
// }

function shipDragStart(e, shipIndex) {
    console.log("dragstart");
    console.log(shipIndex);
    e.dataTransfer.clearData();
    // e.dataTransfer.setData("text/plain", e.shipElement);
    e.dataTransfer.setData("ship", shipIndex);
}

function shipDrop(e, tileIndex, ship, gameBoardObject) {
    // console.log(ship);
    // console.log(gameBoardObject);
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




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createShips: () => (/* binding */ createShips),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   renderShips: () => (/* binding */ renderShips)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");



let player = (rootElement) => {
    return {
        root: rootElement,
        orientation: "Horizontal",
        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },

        initialize: function () {
            this.bindOrientationButton();

        },

        bindOrientationButton: function () {
            let button = this.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });
        },
    }
}

function createShips(element) {
    let ships = [
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Carrier", 5),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Battleship", 4),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Submarine", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Destroyer", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Patrol Boat", 2),
    ]
    renderShips(element, ships);
    return ships;
}

function renderShips(element, ships) {
    element.innerHTML = "";

    ships.forEach((ship, shipIndex) => {
        if (ship.shipPlaced === false) {
            let shipElement = document.createElement("div");
            shipElement.innerText = ship.shipName;
            shipElement.classList.add("ship-element");
            element.appendChild(shipElement);
            shipElement.setAttribute('draggable', true);
            shipElement.addEventListener("dragstart", (e) => (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.shipDragStart)(e, shipIndex));
        }
    })
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
let createShip = (name, length, row, column, hits = 0) => {
   return {
      shipName: name,
      shipLength: length,
      shipRow: row,
      shipColumn: column,
      shipPlaced: false,
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

let player1Ships = (0,_player__WEBPACK_IMPORTED_MODULE_2__.createShips)(document.getElementById("ship-options1"));
let player2Ships = (0,_player__WEBPACK_IMPORTED_MODULE_2__.createShips)(document.getElementById("ship-options2"));

let gameBoard1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
let gameBoard2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();

(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGrids)(document.getElementById("player1-gameboard"), gameBoard1);
(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGrids)(document.getElementById("player2-gameboard"), gameBoard2);

(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.dragDropInitializer)("player1", player1Ships, gameBoard1);
(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.dragDropInitializer)("player2", player2Ships, gameBoard2);



})();

/******/ })()
;
//# sourceMappingURL=main.js.map