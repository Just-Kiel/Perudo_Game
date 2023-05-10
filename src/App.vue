<template>
  <LaunchMenu v-if="!gameLaunched" v-model:launch="launch"/>

  <!-- vfor of players -->
  <div v-if="gameLaunched" >
    <SinglePlayer v-for="player in nbOfPlayers" :key="player.id" :id="player" />
  </div>
</template>

<script>
import SinglePlayer from './components/SinglePlayer.vue'
import LaunchMenu from './components/LaunchMenu.vue'

export default {
  name: 'App',
  components: {
    SinglePlayer,
    LaunchMenu  
  },
  data() {
    return {
      nbOfPlayers: 0,
      gameLaunched: false
    }
  },
  // when launch button is clicked, gameLaunched is set to true with computed
  computed: {
    launch: {
      get() {
        return this.gameLaunched
      },
      set(value) {
        this.gameLaunched = value.gameLaunched
        this.nbOfPlayers = parseInt(value.nbOfPlayers)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
