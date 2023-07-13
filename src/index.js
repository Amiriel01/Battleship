// import { createShip } from "./ships";
import { createGrids, createShips, dragDrop } from "./gameboard";

createShips(document.getElementById("ship-options1"));
createShips(document.getElementById("ship-options2"));
createGrids();
dragDrop();
