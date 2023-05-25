function getRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollAllDices(store) {
    for (let i = 0; i < store.players.length; i++) {
        for (let j = 0; j < store.players[i].dices.length; j++) {
            store.players[i].dices[j] = getRandomDiceNumber();
        }
    }

    store.dudoBet = null
    store.calzaBet = null

    // remove all bets from players
    for (let i = 0; i < store.players.length; i++) {
        store.players[i].enchere.dice = null
        store.players[i].enchere.nb = null
    }

    store.currentPlayer = 0
}

export {getRandomDiceNumber, rollAllDices};