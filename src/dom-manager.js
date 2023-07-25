

function bindPlayAgainButton() {
    document.querySelector("#play-again").addEventListener("click", function () {
        document.location.reload();
    })

}

export { bindPlayAgainButton }