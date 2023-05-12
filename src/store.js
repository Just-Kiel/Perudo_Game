// store.js
import { reactive } from 'vue'

export const store = reactive({
  nbOfPlayers: 0,
  players : [],
  globalNbOfDices: 5,
})