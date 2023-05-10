<template>

<h1>Player {{id}}</h1>

<!-- Five dices displayed with a vfor loop -->
<div class="dices">
    <SingleDice v-for="dice in 5" :key="dice.id" :dice="dice" />
</div>

    
</template>

<script>
import SingleDice from './SingleDice.vue'

export default {
    name: 'SinglePlayer',
    components: {
        SingleDice
    },
    props: {
        id: Number
    },
}
</script>

<style scoped>
.dices {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>