// import { createShip } from "./ships";
import { createGrids, dragDropInitializer, gameBoard } from "./gameboard";
import gameManager from "./game-manager";
import { createShips } from "./player";

gameManager()
    .initialize();

let player1Ships = createShips(document.getElementById("ship-options1"));
let player2Ships = createShips(document.getElementById("ship-options2"));

let gameBoard1 = gameBoard();
let gameBoard2 = gameBoard();

createGrids(document.getElementById("player1-gameboard"), gameBoard1);
createGrids(document.getElementById("player2-gameboard"), gameBoard2);

dragDropInitializer("player1", player1Ships, gameBoard1);
dragDropInitializer("player2", player2Ships, gameBoard2);


