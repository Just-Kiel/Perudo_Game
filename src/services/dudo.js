function dudo(store) {
    let previousPlayer;
    if (store.currentPlayer === 0) {
        previousPlayer = store.players.length - 1;
    } else {
        previousPlayer = store.currentPlayer - 1;
    }

    // Get from all dices the number of dices with the value of the previous player and the paco
    let countOfDices = 0;
    for (let i = 0; i < store.players.length; i++) {
        for (let j = 0; j < store.players[i].dices.length; j++) {
            if (store.players[i].dices[j] === store.players[previousPlayer].enchere.dice || store.players[i].dices[j] === 1) {
                countOfDices++;
            }
        }
    }

    if (countOfDices >= store.players[previousPlayer].enchere.nb) {
        return true;
    } else {
        return false;
    }
}

function calza(store) {
    let previousPlayer;
    if (store.currentPlayer === 0) {
        previousPlayer = store.players.length - 1;
    } else {
        previousPlayer = store.currentPlayer - 1;
    }

    // Get from all dices the number of dices with the value of the previous player and the paco
    let countOfDices = 0;
    for (let i = 0; i < store.players.length; i++) {
        for (let j = 0; j < store.players[i].dices.length; j++) {
            if (store.players[i].dices[j] === store.players[previousPlayer].enchere.dice || store.players[i].dices[j] === 1) {
                countOfDices++;
            }
        }
    }

    console.log("Calza " + store.currentPlayer);
    if (countOfDices == store.players[previousPlayer].enchere.nb) {
        return true;
    } else {
        return false;
    }
}

export {dudo, calza};