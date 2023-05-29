import { loiBinomiale } from "./maths";
import { store } from "../store";

function getRandomDiceNumber() {
    const diceProbabilities = store.probabilities[0].nb;
    console.log(diceProbabilities)
    return loiBinomiale(6, diceProbabilities);
}

function rollAllDices(store) {
    for (let i = 0; i < store.players.length; i++) {
        for (let j = 0; j < store.players[i].dices.length; j++) {
            let dice = getRandomDiceNumber();
            store.players[i].dices[j] = dice;
            store.diceCount[dice-1].nb += 1;
        }
    }

    // dudo and calza
    if (store.dudoBet !== null) {
        if (store.dudoBet) {
            store.players[store.currentPlayer].dices.pop()
        } else if (!store.dudoBet) {
            if (store.currentPlayer === 0) {
                store.players[store.players.length - 1].dices.pop()
            } else {
                store.players[store.currentPlayer-1].dices.pop()
            }
        }
    }

    if (store.calzaBet !== null) {
        if (!store.calzaBet) {
            store.players[store.currentPlayer].dices.pop()
        } else if (store.calzaBet) {
            // if current player has under 5 dices, add one
            if (store.players[store.currentPlayer].dices.length < 5) {
                store.players[store.currentPlayer].dices.push(getRandomDiceNumber())
            }
        }
    }

    store.dudoBet = null
    store.calzaBet = null

    // remove all bets from players
    for (let i = 0; i < store.players.length; i++) {
        store.players[i].enchere.dice = null
        store.players[i].enchere.nb = null
    }

    // check if one player has no more dices
    for (let i = 0; i < store.players.length; i++) {
        if (store.players[i].dices.length === 0) {
            store.players.splice(i, 1)
        }
    }

    store.currentPlayer = 0
}

export {getRandomDiceNumber, rollAllDices};