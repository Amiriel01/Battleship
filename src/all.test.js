import { createShip } from "./ships";

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