import { player } from "./player";

let instance = null;

export default () => {
    if (instance !== null) {
        return instance;
    }

    instance = {

        bindPlayAgainButton: function () {
            document.querySelector("#play-again").addEventListener("click", function () {
                document.location.reload();
            })
        },

        bindOrientationButton: function (player) {
            let button = player.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                player.flipOrientation();
                button.innerText = player.orientation;
            });
        },

        bindRandomizeShipsButton: function (player) {
            let button = player.root.querySelector(".randomize-button");
            button.addEventListener("click", () => {
                player.randomizeShips();
            });
        },

    }
    return instance
}
