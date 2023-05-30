<template>
    <h1>Statistics</h1>

  <Bar
    class="chart"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />


  <h2>Maths Law</h2>
  <div class="laws">
  <div class="law">
    <h3>Binomial Law</h3>
    <Bar
      class="chart"
      id="my-chart-id"
      :options="chartOptions"
      :data="binomialData"
    />
  </div>

  <div class="law">
    <h3>Normal Law</h3>
    <Bar
      class="chart"
      id="my-chart-id"
      :options="chartOptions"
      :data="normalData"
    />
  </div>

  <div class="law">
    <h3>Exponential Law</h3>
    <Bar
      class="chart"
      id="my-chart-id"
      :options="chartOptions"
      :data="exponentialData"
    />
  </div>

  <div class="law">
    <h3>Uniform Law</h3>
    <Bar
      class="chart"
      id="my-chart-id"
      :options="chartOptions"
      :data="uniformData"
    />
  </div>
  </div>
</template>

<script>
import { store } from '../store.js'
import { Bar } from 'vue-chartjs'
// import { Line } from 'vue-chartjs'
// import {
//   PointElement,
//   LineElement,
// } from 'chart.js'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto'

import { loiBinomiale, loiNormale, densiteDeProbabiliteNormale, loiExponentielle, densiteDeProbabiliteExponentielle, loiUniformeIntervalle, densiteDeProbabiliteUniforme } from "../services/maths";

// ChartJS.register(CategoryScale, LinearScale,PointElement, LineElement, BarElement, Title, Tooltip, Legend)

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
        },
        binomialData: {
            labels: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
            ],
            datasets: [ { 
              type: 'line',
                backgroundColor: '#f87979', 
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'p = 1/2 and n = 6'
            },
            { 
              type: 'line',
                backgroundColor: '#79f879', 
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'p = 1/3 and n = 6'
            },
            { 
              type: 'line',
                backgroundColor: '#7979f8', 
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'p = 1/4 and n = 6'
            }
            ]
        },
        normalData: {
            labels: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10'
            ],
            datasets: [ { 
                backgroundColor: '#f87979', 
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                label: 'mu = 5 and sigma = 1'
            },
            {
              backgroundColor: '#79f879', 
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              label: 'mu = 1 and sigma = 1'
            },
            {
              type: 'line',
              borderColor: '#7979f8',
              tension: 0.5,
              backgroundColor: '#7979f8', 
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              label: 'density function for first normal law'
            }
            ]
        },
        exponentialData: {
            labels: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
            ],
            datasets: [ { 
                backgroundColor: '#f87979', 
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'lambda = 1'
            },
            {
              type: 'line',
              borderColor: '#7979f8',
              tension: 0.5,
              backgroundColor: '#7979f8', 
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              label: 'density function for exponential law'
            }
            ]
        },
        uniformData: {
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
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'a = 1 and b = 6'
            },
            {
              type: 'line',
              borderColor: '#7979f8',
              tension: 0.5,
              backgroundColor: '#7979f8', 
              data: [0, 0, 0, 0, 0, 0, 0],
              label: 'density function for uniform law'
            }
            ]
        }
    }
  },
  created(){
    const nb = 300
    for (let i = 0; i < nb; i++) {
      this.binomialData.datasets[0].data[loiBinomiale(6, 0.5)] += 1
      this.binomialData.datasets[1].data[loiBinomiale(6, 1/3)] += 1
      this.binomialData.datasets[2].data[loiBinomiale(6, 1/4)] += 1

      this.normalData.datasets[0].data[Math.round(loiNormale(5, 1))] += 1
      this.normalData.datasets[1].data[Math.round(loiNormale(1, 1))] += 1

      this.exponentialData.datasets[0].data[Math.trunc(loiExponentielle(1))] += 1

      this.uniformData.datasets[0].data[Math.trunc(loiUniformeIntervalle(0, 6))] += 1
    }

    for (let j = 0; j < 10; j++) {
      this.normalData.datasets[2].data[j] = densiteDeProbabiliteNormale(j, 5, 1)*nb
      this.exponentialData.datasets[1].data[j] = densiteDeProbabiliteExponentielle(j, 1)*nb
    }

    for (let k = 0; k < 6; k++) {
      this.uniformData.datasets[1].data[k] = densiteDeProbabiliteUniforme(k, 0, 6)*nb
    }
  }
}
</script>

<style scoped>
canvas {
    max-width: 25vw;
    max-height: 25vh;
}

.law {
  width: 25vw;
}

.laws {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>