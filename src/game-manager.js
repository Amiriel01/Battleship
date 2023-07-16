import { player } from "./player";

export default () => {
    
    return {
        player1: player(document.getElementById("player1-controls")),
        player2: player(document.getElementById("player2-controls")),
        initialize: function () {
            console.log(this.player1)
            this.player1.initialize();
            this.player2.initialize();
        }
    };
}