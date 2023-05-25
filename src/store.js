// store.js
import { reactive } from 'vue'

export const store = reactive({
  nbOfPlayers: 0,
  players : [],
  globalNbOfDices: 5,
  currentPlayer: 0,
  dudoBet: null,
  calzaBet: null
})