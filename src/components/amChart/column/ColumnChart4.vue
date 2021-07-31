<template>
  <div class="chart">
    <div class="row">
      <ColumnChart4Child :data="data_1" yAxis="theme" class="col1" />
      <ColumnChart4Child :data="data_2" yAxis="sec" class="col2" />
    </div>
  </div>
</template>

<script>
import ColumnChart4Child from '@/components/amChart/column/ColumnChart4Child'
export default {
  components: {
    ColumnChart4Child
  },
  props: ['data'],
  computed: {
    reData() {
      const chartData = []
      this.data.forEach(el => {
        const obj = {}
        if (el.category == 'theme1') {
          obj.category = '테마1'
          obj.item1 = el.item1Theme1
          obj.item2 = el.item2Theme1
        } else if (el.category == 'theme2') {
          obj.category = '테마2'
          obj.item1 = el.item1Theme2
          obj.item2 = el.item2Theme2
        } else if (el.category == 'theme3') {
          obj.category = '테마3'
          obj.item1 = el.item1Theme3
          obj.item2 = el.item2Theme3
        } else if (el.category == 'sec') {
          obj.category = '시간'
          obj.item1 = el.item1Sec
          obj.item2 = el.item2Sec
          obj.item1Format = this.$utils.durationFormatter(el.item1Sec)
          obj.item2Format = this.$utils.durationFormatter(el.item2Sec)
        }
        chartData.push(obj)
      })
      return chartData
    },
    data_1() {
      return this.reData.slice(0, 3)
    },
    data_2() {
      return this.reData.slice(3)
    }
  }
}
</script>
<style scoped>
.chart {
  position: static;
}
.row {
  position: relative;
  display: flex;
}
.col1 {
  width: 70%;
  height: 250px;
}
.col2 {
  width: 30%;
  height: 250px;
}
</style>
