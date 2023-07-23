import { renderShips } from "./player";
import { createShip } from "./ships";
// import { startGame } from "./game-manager";
// import { player } from "./player";
import gameManager from "./game-manager";

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
                if (!gameManager().canStartGame()) {
                    document.querySelector("#instructions").style.color = "#FF4500";
                    document.querySelector("#instructions").innerText = "Place all ships on the boards before starting the game!"
                    return;
                } else {
                    gameManager().recieveAttackGame(tileIndex);
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

export {
    createGameBoard,
    createGrids,
    playAgain,
   
};
