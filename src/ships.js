//create the ship factory function//
//all boats start with 0 hits and are floating//
let createShip = (name, length, hits = 0) => {
   return {
      shipName: name,
      shipLength: length,
      shipHits: hits,
      hit: function () {
         if (this.shipHits +1 <= this.shipLength){
            this.shipHits++
         } 
      },
      isSunk: function () {
         return this.shipHits >= this.shipLength
      },
   };
}

export { createShip }