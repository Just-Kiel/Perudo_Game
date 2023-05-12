<template>
    <div class="player">
        <h2>Player {{ player.id+1 }}</h2>
        <div class="enchere">
            {{ player.enchere.nb }}
            <SingleDice :dice="player.enchere.dice" />
        </div>
    </div>    
</template>

<script>
export default {
    name: 'SidebarPlayer',
    props: {
        player: Object
    }
}
</script>

<style scoped>
</style>