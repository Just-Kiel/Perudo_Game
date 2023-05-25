<template>
    <h1>Statistics</h1>

  <Bar
    class="chart"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { store } from '../store.js'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
        store,
        chartData: {
            labels: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
            ],
            datasets: [ { 
                backgroundColor: '#f87979', 
                data: [store.diceCount[0].nb, store.diceCount[1].nb, store.diceCount[2].nb, store.diceCount[3].nb, store.diceCount[4].nb, store.diceCount[5].nb],
                label: 'Dices Count'
            } ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: true,
        }
    }
  }
}
</script>

<style scoped>
canvas {
    max-width: 25vw;
    max-height: 25vh;
}
</style>