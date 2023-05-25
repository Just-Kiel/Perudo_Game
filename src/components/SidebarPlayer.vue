<template>
    <div class="player">
        <h2>Player {{ player.id }}</h2>
        <div>
            <p v-if="player.enchere.nb == null">No bet made yet</p>

            <div v-else class="enchere">
                
                {{ player.enchere.nb }} x
                <SingleDice :dice="player.enchere.dice" />
            </div>
        </div>
    </div>    
</template>

<script>
import { store } from '../store.js'
import { getRandomDiceNumber } from '@/services/randomNumber.js'
import SingleDice from './SingleDice.vue'
import { calza, dudo } from '@/services/dudo.js'

export default {
    name: 'SidebarPlayer',
    components: {
        SingleDice
    },
    props: {
        player: Object
    },
    data() {
        return {
            store
        }
    },
    watch: {
        'store.currentPlayer': function(val) {
            //do something when the data changes.
            if (val == this.player.id && val != 0) {
                let proba = Math.random()

                if (proba < 0.3) {
                    console.log("dudo")

                    store.dudoBet = dudo(store)
                } else if (proba < 0.6) {
                    console.log("calza")

                    store.calzaBet = calza(store)

                    console.log(store.players[store.currentPlayer].dices)
                } else {
                    console.log("bet")

                    // make a random valid bet
                    let dice = getRandomDiceNumber()
                    while (dice < store.players[store.currentPlayer-1].enchere.dice) {
                        dice = getRandomDiceNumber()
                    }

                    store.players[store.currentPlayer].enchere.dice = dice

                    // if dice is equal to previous bet, make a random bet number higher than previous one
                    if (dice == store.players[store.currentPlayer-1].enchere.dice) {
                        // TODO to modify to make it more random
                        store.players[store.currentPlayer].enchere.nb = Math.floor(Math.random() * ((store.globalNbOfDices*store.players.length) - store.players[store.currentPlayer-1].enchere.nb + 1) + store.players[store.currentPlayer-1].enchere.nb)
                    } else {
                        store.players[store.currentPlayer].enchere.nb = store.players[store.currentPlayer-1].enchere.nb
                    }

                    // if last player, reset current player to 1
                    if (val == store.players.length-1) {
                        store.currentPlayer = 0
                    } else {
                        store.currentPlayer += 1
                    }
                }
            } 
        }
    }
}
</script>

<style scoped>
.enchere {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>