import { createShip } from "./ships"
import { shipDragStart } from "./gameboard";

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

function createShips(element) {
    let ships = [
        createShip("Carrier", 5),
        createShip("Battleship", 4),
        createShip("Submarine", 3),
        createShip("Destroyer", 3),
        createShip("Patrol Boat", 2),
    ]
    renderShips(element, ships);
    return ships;
}

function renderShips(element, ships) {
    element.innerHTML = "";

    ships.forEach((ship, shipIndex) => {
        if (ship.shipPlaced === false) {
            let shipElement = document.createElement("div");
            shipElement.innerText = ship.shipName;
            shipElement.classList.add("ship-element");
            element.appendChild(shipElement);
            shipElement.setAttribute('draggable', true);
            shipElement.addEventListener("dragstart", (e) => shipDragStart(e, shipIndex));
        }
    })
}

//computer selection//
function getComputerChoice() {
    let computerSelection = Math.floor(Math.random() * 100);
    // return choices[computerSelection];
}

export { 
    player,
    createShips,
    renderShips,
}
