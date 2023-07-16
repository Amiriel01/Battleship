let player = (rootElement) => {
    return {
        root: rootElement,
        orientation: "Horizontal",
        flipOrientation: function () {
            if (this.orientation === "Horizontal") {
                this.orientation = "Vertical";
            } else {
                this.orientation = "Horizontal";
            }
        },

        initialize: function () {
            this.bindOrientationButton();

        },

        bindOrientationButton: function () {
            let button = this.root.querySelector("#ship-orientation");
            button.addEventListener("click", () => {
                this.flipOrientation();
                button.innerText = this.orientation;
            });

        },
    }
}

//computer selection//
function getComputerChoice() {
    let computerSelection = Math.floor(Math.random() * 100);
    // return choices[computerSelection];
}

export { player }
