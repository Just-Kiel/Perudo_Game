<template>
  <LaunchMenu v-if="!gameLaunched && !endOfGame" v-model:launch="launch"/>

  <!-- vfor of players -->
  <div v-if="gameLaunched" >
    <i-layout vertical>
      <div id="mainPlayer">
        <SinglePlayer />

        <!-- button to stop the game -->
        <i-button v-on:click="stopGame()" color="primary">Stop the game</i-button>
      </div>
      
      <SideBar />
    </i-layout>
  </div>

  <ModalReveal/>

  <StatisticsInfos v-if="endOfGame"/>
</template>

<script>
import SinglePlayer from './components/SinglePlayer.vue'
import LaunchMenu from './components/LaunchMenu.vue'
import SideBar from './components/SideBar.vue'
import { store } from './store.js'
import { rollAllDices } from '@/services/randomNumber.js'
import ModalReveal from './components/ModalReveal.vue'
import StatisticsInfos from './components/Statistics.vue'

export default {
  name: 'App',
  components: {
    SinglePlayer,
    LaunchMenu,
    SideBar,
    ModalReveal,
    StatisticsInfos
  },
  data() {
    return {
      store,
      gameLaunched: false,
      currentPlayer: 1,
      endOfGame: false,
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

        console.log("Generate players") 

        // generate players
        for (let i = 0; i < store.nbOfPlayers; i++) {
          store.players[i] = {
            id: i,
            dices: [],
            enchere: {
              nb: null,
              dice: null
            },
            state: "calza"
          }

          console.log("Generate dices")
          // Generate random dices for each player
          for (let j = 0; j < store.globalNbOfDices; j++) {
            store.players[i].dices.push(0)
          }
        }
        rollAllDices(store)
      }
    }
  },
  // watch if store.players.length has changed
  watch: {
    "store.players.length": function(val) {
      if (val === 1) {
        this.stopGame()
      }
    }
  },
  methods: {
    stopGame() {
      this.gameLaunched = false
      this.endOfGame = true
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
  color: #fff;
}
#mainPlayer{
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
