<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true

export default {
  props: ['data'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
      chart.maskBullets = false
      chart.paddingRight = 0
      chart.paddingLeft = 0
      chart.paddingBottom = 0
      chart.paddingTop = 25
      chart.seriesContainer.background.fill = '#F6F7FB'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9
      categoryAxis.renderer.labels.template.fill = '#414141'
      categoryAxis.fontSize = 12

      //Create value axis
      const gridNum = [0, 60, 120, 180, 240]
      const durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
      durationAxis.baseUnit = 'second'
      durationAxis.strictMinMax = true
      durationAxis.renderer.opposite = true
      durationAxis.renderer.grid.template.disabled = true
      durationAxis.renderer.labels.template.disabled = true
      durationAxis.renderer.labels.template.fill = '#414141'
      durationAxis.fontSize = 12
      const divide = 4
      const count1 = this.data[0].count1
      const count2 = this.data[0].count2
      const min = Math.min(count1, count2)
      const max = Math.max(count1, count2)
      const diff = (max - min) / divide
      let minAxis = min - diff
      if (minAxis < 0) minAxis = 0
      let maxAxis = max + diff
      let diffAxis = (maxAxis - minAxis) / divide

      if (min == max) {
        diffAxis = (min * 2) / divide
        minAxis = 0
        maxAxis = min * 2
      }

      if ((min == null && max == null) || (min == 0 && max == 0)) {
        durationAxis.min = gridNum[0]
        durationAxis.max = gridNum[divide]
        for (let index = 0; index <= divide; index++) {
          createGrid(gridNum[index])
        }
      } else {
        durationAxis.min = minAxis
        durationAxis.max = maxAxis
        for (let index = 0; index <= divide; index++) {
          createGrid(minAxis + diffAxis * index)
        }
      }

      function createGrid(value) {
        let range = durationAxis.axisRanges.create()
        range.value = value
        if (value <= 3600) {
          range.label.text = "{value.formatDuration('m분')}"
        } else {
          range.label.text = "{value.formatDuration('h시간m분')}"
        }
      }

      //Create series
      function createSeries(value, name, color) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        // series.showOnInit = false
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.fill = color
        series.strokeWidth = 0
        series.columns.template.width = 30
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100

        const bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.dy = -10
        bullet.label.fontSize = 10
        bullet.label.fill = am4core.color('#414141')
        bullet.label.truncate = false
        series.yAxis = durationAxis
        if (value == 'count1') {
          bullet.label.text = '{count1Format}'
        } else {
          bullet.label.text = '{count2Format}'
        }
        return series
      }
      createSeries('count1', '우리 기관', '#F47920')
      createSeries('count2', '홈런 상위 10%', '#00D2ED')

      chart.zoomOutButton.disabled = false

      this.chart = chart
    }
  },
  mounted() {
    if (this.data.length == 0) {
      this.initChart()
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (this.chart) {
          if (newData.length !== 0) {
            this.chart.dispose()
          }
        }
        if (newData.length !== 0) {
          this.initChart()
        }
      }
    }
  }
}
</script>

<style scoped>
.chart {
  position: static;
  height: 250px;
}
</style>
