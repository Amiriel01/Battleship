import { player } from "./player";
import { createShip } from "./ships";
import { createGameBoard } from "./gameboard";
import domManager from "./dom-manager";

let instance = null;

export default () => {
    if (instance !== null) {
        return instance;
    }

    instance = {
        player1: player(document.getElementById("player1-controls"), "player1"),
        player2: player(document.getElementById("player2-controls"), "player2"),
        turn: 2,
        playerVsAI: false,


        initialize: function () {
            this.player1.initialize();
            this.player2.initialize();
            document.querySelector("#player-vs-computer").addEventListener("click", () => {
                this.playerVsAI = true
                this.player2.randomizeShips()
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
}




// export { startGame }







