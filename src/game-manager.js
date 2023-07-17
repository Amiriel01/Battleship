import { player } from "./player";

export default () => {
    
    return {
        player1: player(document.getElementById("player1-controls"), "player1"),
        player2: player(document.getElementById("player2-controls"), "player2"),
        initialize: function () {
            console.log(this.player1)
            this.player1.initialize();
            this.player2.initialize();
        }
    };
}