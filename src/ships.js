//create the ship factory function//
//all boats start with 0 hits and are floating//
let createShip = (name, length, hits = 0, floating = true) => {
    return {
    shipName: name,
     shipLength: length,
      shipHits: hits,
     hitCount: function() {
        this.hits++
     },
     shipFloating: floating,
     floatStatus: function() {
      this.floating
     }
};
}
let carrier = createShip('Carrier', 5);
let battleship = createShip('Battleship', 4);
let 
console.log(createShip(carrier));
console.log(carrier.shipName);
console.log(carrier.shipLength);
console.log(carrier.shipHits);
console.log(carrier.shipFloating);
export { createShip }