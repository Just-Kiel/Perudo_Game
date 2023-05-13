<template>

<h1>Your dices !</h1>

<!-- Dices displayed with a vfor loop -->
<div class="dices">
    <SingleDice v-for="dice in store.players[0].dices" :key="dice.id" :dice="dice" />
</div>

<ModalBet />

<!-- button to make dudo just if the player before as made a bet -->
<i-button disabled v-if="store.players[store.players.length-1].enchere.nb == null">Dudo</i-button>
<!-- v else -->
<i-button v-else v-on:click="dudo()" color="primary">Dudo</i-button>


<!-- if the player has made a bet show it here -->
<div v-if="store.players[0].enchere.dice != null">
    <p>Your bet : {{ store.players[0].enchere.nb }} <SingleDice :dice="store.players[0].enchere.dice" /></p>
</div>

</template>

<script>
import SingleDice from './SingleDice.vue'
import { getRandomDiceNumber } from '@/services/randomNumber.js'
import { store } from '../store.js'
import ModalBet from './ModalBet.vue'

export default {
    name: 'SinglePlayer',
    components: {
        SingleDice,
        ModalBet
    },
    props: {
    },
    data() {
        return {
            store,
            visible: false
        }
    },
    methods: {
        rollDices() {
            // generate random dices for each player
            for (let i = 0; i < store.globalNbOfDices; i++) {
                store.players[0].dices[i] = getRandomDiceNumber()
            }
        }
    }
}
</script>

<style scoped>
.dices {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>