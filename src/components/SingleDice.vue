<template>
    <div class="dice" :id="dice">
        {{ dice }}
    </div>
</template>

<script>
export default {
    name: 'SingleDice',
    props: {
        dice: Number
    },
}
</script>

<style scoped>
    .dice {
        width: 50px;
        height: 50px;
        background-color: red;
        border-radius: 10px;
        margin: 10px;
        text-align: center;
        vertical-align: middle;
        color: white;
    }
</style>