<template>

<h1>Your dices !</h1>

<!-- Dices displayed with a vfor loop -->
<div class="dices">
    <!-- <SingleDice :dice="5" /> -->
    <SingleDice v-for="dice in store.players[0].dices" :key="dice.id" :dice="dice" />
</div>

<i-button v-on:click="rollDices()" color="primary">Roll dices</i-button>
</template>

<script>
import SingleDice from './SingleDice.vue'
import { getRandomDiceNumber } from '@/services/randomNumber.js'
import { store } from '../store.js'

export default {
    name: 'SinglePlayer',
    components: {
        SingleDice
    },
    props: {
    },
    data() {
        return {
            store,
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