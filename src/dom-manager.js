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

        bindOrientationButton: function () {
            let button = document.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });
        },

        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },


        // export { 
        //     bindPlayAgainButton, 
        //     bindOrientationButton
        // }
    }
    return instance
}