/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrids: () => (/* binding */ createGrids),
/* harmony export */   createShips: () => (/* binding */ createShips),
/* harmony export */   dragDrop: () => (/* binding */ dragDrop),
/* harmony export */   gameBoard: () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");


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
    let shipElement = document.querySelectorAll(".ship-element");


    shipElement.addEventListener("dragstart", (event) => {
        console.log("dragstart");
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.shipElement);
    })



    let grid1 = document.querySelector("#player1-gameboard");
    let grid2 = document.querySelector("#player2-gameboard");

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

    grid2.addEventListener("dragover", (event) => {
        console.log("dragover");
        event.preventDefault();
    })

    grid2.addEventListener("drop", (event) => {
        console.log("drop");
        event.preventDefault();
        event.dataTransfer.getData("text/plain", shipElement);
        if (event.target.id === "#player2-gameboard") {
            shipElement.parentNode.removeChild(shipElement);
            event.target.appendChild(shipElement);
        }
    })
}
function createShips(element) {
    let ships = [
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Carrier", 5),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Carrier", 5),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Battleship", 4),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Battleship", 4),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Submarine", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Submarine", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Destroyer", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Destroyer", 3),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Patrol Boat", 2),
        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.createShip)("Patrol Boat", 2)
    ]
    ships.forEach((ship) => {
        let shipElement = document.createElement("div");
        shipElement.innerText = ship.shipName;
        shipElement.classList.add("ship-element");
        element.appendChild(shipElement);
        shipElement.setAttribute('draggable', true);
    })
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

// let shipOptions = document.querySelector(".ship-options")

// createShip("Carrier", 5);

// let carrier = document.querySelector("#carrier");
// shipOptions.appendChild(carrier);



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
// import { createShip } from "./ships";


(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(document.getElementById("ship-options1"));
(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(document.getElementById("ship-options2"));
(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGrids)();
(0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.dragDrop)();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map