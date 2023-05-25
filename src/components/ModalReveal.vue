<template>
    <i-modal v-model="visible">
        <template #header>
            Bet reveal !
        </template>
        
        <!-- Display the dices of all players -->
        <div class="allPlayers">
            <div v-for="player in store.players" :key="player.id" class="player">
                <p>Player {{ player.id }}</p>
                <div class="dices">
                    <SingleDice v-for="dice in player.dices" :key="dice.id" :dice="dice" />
                </div>
            </div>
        </div>

        <!-- Result of bet -->
        <div v-if="store.dudoBet">
            <p>Player {{previousPlayer}} was right !</p>
        </div>
        <div v-else-if="store.dudoBet == false">
            <p>Player {{previousPlayer}} was wrong !</p>
        </div>

        <!-- Result of calza -->
        <div v-if="store.calzaBet">
            <p>Player {{store.currentPlayer}} was exact !</p>
        </div>
        <div v-else-if="store.calzaBet == false">
            <p>Player {{store.currentPlayer}} was not exact !</p>
        </div>
        
        <template #footer>
            <i-button type="primary" @click="rollAllDices()">Roll all dices</i-button>
        </template>
    </i-modal>
</template>

<script>
import { store } from '../store.js'
import { rollAllDices } from '@/services/randomNumber.js'
import SingleDice from './SingleDice.vue'

export default {
    name: 'ModalReveal',
    components: {
        SingleDice
    },    data() {
        return {
            store,
            visible: false
        }
    },
    // computed previous player waiting if store.dudoBet is false
    computed: {
        previousPlayer() {
            return store.currentPlayer == 0 ? store.players.length -1 : store.currentPlayer - 1
        }
    },
    methods: {
        rollAllDices() {
            rollAllDices(store)
            this.visible = false
        }
    },
    watch: {
        "store.dudoBet": function(val) {
            if (val === null) return
            this.visible = true
            console.log("dudo reveal")
        },
        "store.calzaBet": function(val) {
            if (val === null) return
            this.visible = true
            console.log("calza reveal")
        },
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