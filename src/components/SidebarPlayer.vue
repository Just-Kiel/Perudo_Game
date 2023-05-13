<template>
    <div class="player">
        <h2>Player {{ player.id+1 }}</h2>
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
            if (val == this.player.id) {
                // make a random valid bet
                let dice = getRandomDiceNumber()
                while (dice < store.players[store.currentPlayer-1].enchere.dice) {
                    dice = getRandomDiceNumber()
                }

                store.players[store.currentPlayer].enchere.dice = dice

                // if dice is equal to previous bet, make a random bet number higher than previous one
                if (dice == store.players[store.currentPlayer-1].enchere.dice) {
                    store.players[store.currentPlayer].enchere.nb = store.players[store.currentPlayer-1].enchere.nb + Math.floor(Math.random() * 5)
                } else {
                    store.players[store.currentPlayer].enchere.nb = store.players[store.currentPlayer-1].enchere.nb
                }
            }

            // if last player, reset current player to 1
            if (val == store.players.length) {
                store.currentPlayer = 0
            } else {
                store.currentPlayer += 1
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