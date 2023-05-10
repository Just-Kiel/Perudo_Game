<template>
    <i-header class="_text-align:center">
        <h1>Perudo Game</h1>
        <p>This is a perudo game made by Maxime Mathevet and Aurore Lafaurie.</p>
        <i-number-input v-model="nbOfPlayers" :min="2" :max="6" placeholder="Number of players.." />

        <!-- Make a button to launch the game -->
        <i-button v-on:click="$emit('update:launch', {gameLaunched: true, nbOfPlayers})" color="primary">Launch Game</i-button>
    </i-header>
</template>

<script>

export default {
    name: 'LaunchMenu',
    data() {
        return {
            nbOfPlayers: 2
        }
    }
}

</script>

<style scoped>
</style>