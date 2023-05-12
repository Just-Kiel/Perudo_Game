<template>
    <div class="dice">
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
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 10px;
        margin: 10px;
    }
</style>