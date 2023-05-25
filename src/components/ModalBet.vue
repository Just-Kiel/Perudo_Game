<template>
<i-button v-if="betAvailable" v-on:click="visibleModal=true" color="primary">Make a bet</i-button>
<i-button disabled v-else v-on:click="visibleModal=true">Make a bet</i-button>
    <i-modal v-model="visibleModal">
        <template #header>
            Make a bet !
        </template>

        <template #default>
            <i-number-input v-model="store.players[0].enchere.nb" :min="1" :max="store.globalNbOfDices * store.players.length" placeholder="Number of dices.." />

            <div class="dicesBet">
                <!-- TODO paco is higher than 6 so delete one and display 6 after -->
                <SingleDice v-on:click="clickDice(dice)" v-for="dice in 6" :key="dice.id" :dice="dice" />
            </div>
        </template>
        
        <template #footer>
            <!-- button confirm bet -->
            <i-button type="primary" @click="cancelBet()">Cancel</i-button>
            <i-button type="primary" @click="confirmBet()">Confirm</i-button>
        </template>
    </i-modal>
</template>

<script>
import { store } from '../store.js'
import SingleDice from './SingleDice.vue'

export default {
    name: 'ModalBet',
    components: {
        SingleDice
    },
    props: {
    },
    data() {
        return {
            store,
            visibleModal: false,
            betConfirmed: false,
            betAvailable: true
        }
    },
    watch: {
        visibleModal: function(val) {
          //do something when the data changes.
          if (!val && !this.betConfirmed) {
              this.cancelBet();
          }

          if (val && this.betAvailable){
                // remove background color from dices
                for (let i = 0; i < 6; i++) {
                    document.getElementsByClassName("dicesBet")[0].children[i].style.backgroundColor = "red";
                }

                store.players[0].enchere.dice = store.players[store.players.length-1].enchere.dice
                store.players[0].enchere.nb = store.players[store.players.length-1].enchere.nb

                if (store.players[0].enchere.dice != null) {
                    // set dice background color to blue to show it's selected
                    document.getElementsByClassName("dicesBet")[0].children[store.players[0].enchere.dice-1].style.backgroundColor = "blue";
                }
          }
        },
        "store.currentPlayer": function(val) {
            if (val == 0) {
                this.betAvailable = true
            }
        }
  },
    methods: {
        confirmBet() {
            if (store.players[0].enchere.nb == null || store.players[0].enchere.dice == null) {
                alert("You must select a dice and a number of dices !")
                return
            }

            // TODO if dice is higher, nb can be /2 +1 (if odd) or /2 (if even)

            // if nb faces is lower than previous bet
            if (store.players[0].enchere.nb < store.players[store.players.length-1].enchere.nb) {
                alert("Your bet must be higher than the previous one !")
                return
            }

            // if nb faces is equal to previous bet and dice is lower
            if (store.players[0].enchere.nb == store.players[store.players.length-1].enchere.nb && store.players[0].enchere.dice <= store.players[store.players.length-1].enchere.dice) {
                alert("Your bet must be higher than the previous one !")
                return
            }

            // if everything is ok, close modal
            this.betConfirmed = true
            this.visibleModal = false
            this.betAvailable = false

            store.currentPlayer += 1
        },
        cancelBet() {
            store.players[0].enchere.dice = null
            store.players[0].enchere.nb = null

            // remove background color from dices
            for (let i = 0; i < 6; i++) {
                document.getElementsByClassName("dicesBet")[0].children[i].style.backgroundColor = "red";
            }

            this.visibleModal = false
        },
        clickDice(dice) {
            store.players[0].enchere.dice = dice

            // set dice background color to blue to show it's selected
            document.getElementsByClassName("dicesBet")[0].children[dice-1].style.backgroundColor = "blue";

            // remove background color from other dices
            for (let i = 0; i < 6; i++) {
                if (i != dice-1) {
                    document.getElementsByClassName("dicesBet")[0].children[i].style.backgroundColor = "red";
                }
            }
        }
    }
}
</script>

<style scoped>
.dicesBet {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>