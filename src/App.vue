<template>
  <LaunchMenu v-if="!gameLaunched" v-model:launch="launch"/>

  <!-- vfor of players -->
  <div v-if="gameLaunched" >
    <i-layout vertical>
      <div id="mainPlayer">
        <SinglePlayer />
      </div>

      <!-- TODO to remove -->
      {{store}}
      
      <SideBar />
    </i-layout>
  </div>

  <ModalReveal/>
</template>

<script>
import SinglePlayer from './components/SinglePlayer.vue'
import LaunchMenu from './components/LaunchMenu.vue'
import SideBar from './components/SideBar.vue'
import { store } from './store.js'
import { rollAllDices } from '@/services/randomNumber.js'
import ModalReveal from './components/ModalReveal.vue'

export default {
  name: 'App',
  components: {
    SinglePlayer,
    LaunchMenu,
    SideBar,
    ModalReveal
  },
  data() {
    return {
      store,
      gameLaunched: false,
      currentPlayer: 1,
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
            }
          }

          // Generate random dices for each player
          for (let j = 0; j < store.globalNbOfDices; j++) {
            console.log("Generate dices")
            store.players[i].dices.push(0)
            rollAllDices(store)
          }
        }
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
  color: #fff;
}
#mainPlayer{
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
