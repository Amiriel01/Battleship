// import { createShip } from "./ships";
import { createGrids, dragDropInitializer, createGameBoard} from "./gameboard";
import gameManager from "./game-manager";
import { createShips } from "./player";
import { playAgain } from "./gameboard";
import { bindPlayAgainButton, bindRandomizeShipsButton } from "./dom-manager";
import { player } from "./player";


gameManager()
    .initialize();

// bindPlayAgainButton();
// bindRandomizeShipsButton();










