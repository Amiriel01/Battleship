import { player } from "./player";
import { createShip } from "./ships";
import { createGameBoard } from "./gameboard";

let instance = null;

export default () => {
    if (instance !== null) {
        return instance;
    }

    instance = {
        player1: player(document.getElementById("player1-controls"), "player1"),
        player2: player(document.getElementById("player2-controls"), "player2"),
        turn: 1,
        

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
}




// export { startGame }







