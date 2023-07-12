import { createShip } from "./ships";
import { gameBoard } from "./gameboard";

describe("the ship", () => {
    test("takes a hit", () => {
        let battleship = createShip("battleship", 4);
        battleship.hit();
        expect(battleship.shipHits).toBe(1);
    });

    test("sinks", () => {
        let battleship = createShip("battleship", 1);
        battleship.hit();
        expect(battleship.isSunk()).toBe(true);
    });
});

describe("the board has", () => {
    test("shots fired", () => {
        let row = null;
        let column = null;
        
        let createGameboard = gameBoard();
        createGameboard.shotFired(true);
        
        expect(createGameboard.recieveAttack()).toBe(1);
    })
    
});

// test("shots fired", () => {
//     let createGameboard = gameBoard();
//     createGameboard.shotFired();
//     expect(createGameboard.recieveAttack()).toBe("shotHit");
// });

