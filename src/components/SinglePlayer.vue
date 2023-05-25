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

<i-button disabled v-if="store.players[store.players.length-1].enchere.nb == null">Calza</i-button>
<!-- v else -->
<i-button v-else v-on:click="calza()" color="primary">Calza</i-button>

<!-- display if dudo was true or false -->
<div v-if="store.dudoBet">
    <p>Player {{store.currentPlayer-1}} was right !</p>

    <!-- button to roll new dices -->
    <i-button v-on:click="rollAllDices()" color="primary">Roll new dices</i-button>
</div>
<div v-else-if="store.dudoBet == false">
    <p>Player {{store.currentPlayer-1}} was wrong !</p>

    <i-button v-on:click="rollAllDices()" color="primary">Roll new dices</i-button>
</div>

<div v-if="store.calzaBet">
    <p>Player {{store.currentPlayer}} was exact !</p>

    <!-- button to roll new dices -->
    <i-button v-on:click="rollAllDices()" color="primary">Roll new dices</i-button>
</div>
<div v-else-if="store.calzaBet == false">
    <p>Player {{store.currentPlayer}} was not exact !</p>

    <i-button v-on:click="rollAllDices()" color="primary">Roll new dices</i-button>
</div>


<!-- if the player has made a bet show it here -->
<div v-if="store.players[0].enchere.dice != null">
    <p>Your bet : {{ store.players[0].enchere.nb }} <SingleDice :dice="store.players[0].enchere.dice" /></p>
</div>

</template>

<script>
import SingleDice from './SingleDice.vue'
import { rollAllDices } from '@/services/randomNumber.js'
import { store } from '../store.js'
import ModalBet from './ModalBet.vue'
import { dudo } from '@/services/dudo.js'

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
        }
    },
    methods: {
        dudo() {
            store.dudoBet = dudo(store)

            if (store.dudoBet) {
                store.players[0].dices.pop()
            } else {
                store.players[store.players.length-1].dices.pop()
            }
        },
        rollAllDices() {
            // store.dudoBet = null
            // store.calzaBet = null

            // // remove all bets from players
            // for (let i = 0; i < store.players.length; i++) {
            //     store.players[i].enchere.dice = null
            //     store.players[i].enchere.nb = null
            // }

            // store.currentPlayer = 0

            rollAllDices(store)

            console.log(store.players)
        },
        calza() {
            store.calzaBet = true

            if (!store.calzaBet) {
                store.players[0].dices.pop()
            } else {
                store.players[store.players.length-1].dices.pop()
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