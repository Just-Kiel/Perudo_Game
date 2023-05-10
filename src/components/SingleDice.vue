<template>
    <div class="dice">
        {{ dice }}
    </div>
</template>

<script>
import { getRandomDiceNumber } from "@/services/randomNumber.js"
export default {
    name: 'SingleDice',
    data() {
        return {
            dice: getRandomDiceNumber()
        }
    },
}
</script>

<style scoped>
    .dice {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 10px;
        margin: 10px;
    }
</style>