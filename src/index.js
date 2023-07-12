// import { createShip } from "./ships";
import { createGrids, createShips } from "./gameboard";


// createShip();
createGrids();
createShips(document.getElementById("ship-options1"));
createShips(document.getElementById("ship-options2"));