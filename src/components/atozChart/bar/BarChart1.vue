<template>
  <div class="chart">
    <div class="chart-container row">
      <div class="col" v-for="(col, colIndex) in 2" :key="'col_' + colIndex">
        <div class="title">{{ title[colIndex] }}</div>
        <div
          class="bar-chart"
          :class="colIndex == 0 ? 'reverse' : ''"
          v-for="(row, rowIndex) in data"
          :key="'row_' + rowIndex"
        >
          <span class="bar-chart-label">{{ row.category }}</span>
          <span class="bar-chart-bar" :style="style('bar', row, colIndex)"></span>
          <span class="bar-chart-value" :style="style('value', row, colIndex)">{{
            colIndex == 0 ? row.value1 : row.value2
          }}</span>
          <span
            class="line"
            v-for="lineIndex in parseInt((colIndex == 0 ? row.value1 : row.value2) / 10)"
            :key="lineIndex"
            :style="style('line', row, colIndex, lineIndex)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      device: '',
      title: ['chart1', 'chart2']
    }
  },
  methods: {
    style(type, row, colIndex, lineIndex) {
      const bgColor = 'background-color:' + row.color
      const value = colIndex == 0 ? row.value1 : row.value2
      const direction = colIndex == 0 ? 'reverse' : ''
      let directionNm = 'left:'
      if (direction && !this.device) directionNm = 'right:'
      if (type == 'bar') {
        return bgColor + '; width:' + value + '%'
      } else if (type == 'value') {
        return directionNm + value + '%'
      } else {
        return directionNm + lineIndex * 10 + '%'
      }
    },
    animate() {
      this.data.forEach(item => {
        const count = 0
        const speed = 10
        const { value1: max1, value2: max2 } = item
        const fnTimer = function(count, max, value, speed) {
          return function() {
            const ani = setInterval(() => {
              if (count == max) clearInterval(ani)
              item[value] = count++
            }, speed)
          }
        }
        fnTimer(count, max1, 'value1', speed)()
        fnTimer(count, max2, 'value2', speed)()
      })
    }
  },
  mounted() {
    this.animate()
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth
      this.device = windowWidth <= 767 ? 'mobile' : ''
    })
    window.dispatchEvent(new Event('resize'))
  },
  watch: {
    data() {
      this.animate()
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .col {
    width: calc(50% - 100px);
    padding: 0 50px;
    &:nth-child(1) {
      transform: translateX(25px);
    }
    &:nth-child(2) {
      transform: translateX(-25px);
    }
    .title {
      text-align: center;
      line-height: 30px;
    }
  }
}
.bar-chart {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &.reverse {
    flex-direction: row-reverse;
    .bar-chart-label {
      display: none;
    }
    .bar-chart-label {
      right: 0;
    }
  }
  &-label {
    position: absolute;
    left: -50px;
    width: 50px;
    text-align: center;
  }
  &-bar {
    display: flex;
    height: 30px;
  }
  &-value {
    position: absolute;
    width: 50px;
    text-align: center;
  }
  .line {
    position: absolute;
    border-left: 1px solid #fff;
    height: 100%;
  }
}

@media screen and (max-width: 767px) {
  .chart {
    height: auto !important;
  }
  .row .col {
    width: 100%;
    transform: none !important;
    &:nth-child(1) {
      margin-bottom: 30px;
    }
  }
  .bar-chart.reverse {
    flex-direction: row;
    .bar-chart-label {
      display: inline-block;
    }
  }
}
</style>
