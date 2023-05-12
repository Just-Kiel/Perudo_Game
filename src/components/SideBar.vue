<template>
    <i-sidebar v-model="open">
        <h1>Other Players</h1>

        <SidebarPlayer v-for="player in players"  :key="player.id" :player="player" />
    </i-sidebar>
</template>

<script>
import SidebarPlayer from './SidebarPlayer.vue'
import { store } from '../store.js'

export default {
    name: 'SideBar',
    components: {
        SidebarPlayer
    },
    data() {
        return {
            store,
            open: true
        }
    },
    computed: {
        players() {
            return store.players.slice(1, store.players.length)
        }
    }
}
</script>

<style scoped>
</style>