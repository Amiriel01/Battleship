//create the ship factory function//
//all boats start with 0 hits and are floating//
let createShip = (name, length, row, column, hits = 0) => {
   return {
      shipName: name,
      shipLength: length,
      shipRow: row,
      shipColumn: column,
      shipHits: hits,
      hit: function () {
         if (this.shipHits + 1 <= this.shipLength) {
            this.shipHits++
         }
      },
      isSunk: function () {
         return this.shipHits >= this.shipLength
      },
   };
}

// let shipOptions = document.querySelector(".ship-options")

// createShip("Carrier", 5);

// let carrier = document.querySelector("#carrier");
// shipOptions.appendChild(carrier);

export { createShip }