<template>
    <i-header class="_text-align:center">
        <h1>Perudo Game</h1>
        <p>This is a perudo game made by Maxime Mathevet and Aurore Lafaurie.</p>
        <i-number-input v-model="store.nbOfPlayers" :min="2" :max="6" placeholder="Number of players.." />

        <!-- Make a button to launch the game -->
        <i-button v-on:click="$emit('update:launch', {gameLaunched: true})" color="primary">Launch Game</i-button>
    </i-header>
</template>

<script>
import { store } from '../store.js'

export default {
    name: 'LaunchMenu',
    data() {
        return {
            store
        }
    }
}

</script>

<style scoped>
</style>