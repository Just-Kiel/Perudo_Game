// store.js
import { reactive } from 'vue'

export const store = reactive({
  nbOfPlayers: 0,
  players : [],
  globalNbOfDices: 5,
  currentPlayer: 0,
  dudoBet: null,
  calzaBet: null,
  diceCount: [
    {value: 1, nb: 0},
    {value: 2, nb: 0},
    {value: 3, nb: 0},
    {value: 4, nb: 0},
    {value: 5, nb: 0},
    {value: 6, nb: 0},
  ],
})