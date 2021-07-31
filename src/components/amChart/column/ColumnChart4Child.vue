<template>
  <div>
    <div class="chart-container" ref="chartdiv"></div>
    <div class="columnChart-legend" ref="legend" v-if="yAxis == 'theme'"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true
am4core.options.autoDispose = true

export default {
  props: ['data', 'yAxis'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
      chart.maskBullets = false
      chart.padding(25, 0, 0, 0)
      chart.seriesContainer.background.fill = '#F6F7FB'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      if (this.yAxis == 'theme') {
        chart.legend = new am4charts.Legend()
        chart.legend.itemContainers.template.clickable = false
        chart.legend.itemContainers.template.focusable = false
        chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default
        chart.legend.labels.template.fill = '#414141'
        chart.legend.fontSize = 12

        /* Create a separate container to put legend in */
        const legendContainer = am4core.create(this.$refs.legend, am4core.Container)
        legendContainer.width = am4core.percent(100)
        legendContainer.height = am4core.percent(20)
        chart.legend.parent = legendContainer
      }

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
      let valueAxis, durationAxis
      const gridNum = [0, 60, 120, 180, 240, 300]

      if (this.yAxis == 'theme') {
        valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.numberFormatter = new am4core.NumberFormatter()
        valueAxis.numberFormatter.numberFormat = "#.#'%'"
        valueAxis.min = 0
        valueAxis.max = 100
        valueAxis.renderer.minGridDistance = 30
        valueAxis.renderer.labels.template.fill = '#414141'
        valueAxis.fontSize = 12
      } else {
        durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
        durationAxis.strictMinMax = true
        durationAxis.renderer.opposite = true
        durationAxis.renderer.labels.template.disabled = true
        durationAxis.renderer.grid.template.disabled = true
        durationAxis.renderer.labels.template.fill = '#414141'
        durationAxis.fontSize = 12
        const divide = 5
        const item1 = this.data[0].item1
        const item2 = this.data[0].item2
        const min = Math.min(item1, item2)
        const max = Math.max(item1, item2)
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
            this.createGrid(durationAxis, gridNum[index])
          }
        } else {
          durationAxis.min = minAxis
          durationAxis.max = maxAxis
          for (let index = 0; index <= divide; index++) {
            this.createGrid(durationAxis, minAxis + diffAxis * index)
          }
        }
      }

      //Create series
      function createSeries(value, name, color, yAxis) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.strokeWidth = 0
        series.columns.template.fill = color
        series.columns.template.width = 30
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100

        const bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.label.fontSize = 10
        bullet.label.fill = am4core.color('#414141')
        bullet.label.truncate = false
        bullet.dy = -10

        if (yAxis == 'theme') {
          series.yAxis = valueAxis
          bullet.label.text = '{valueY}'
        } else {
          series.yAxis = durationAxis
          if (value == 'item1') {
            bullet.label.text = '{item1Format}'
          } else {
            bullet.label.text = '{item2Format}'
          }
        }
      }
      createSeries('item1', '아이템1', '#F47920', this.yAxis)
      createSeries('item2', '아이템2', '#00D2ED', this.yAxis)

      this.chart = chart
    },
    createGrid(axis, value) {
      let range = axis.axisRanges.create()
      range.value = value
      range.label.text = this.$utils.durationFormatter(parseInt(value))
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    data() {
      if (this.chart) {
        this.initChart()
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
}
.columnChart-legend {
  height: 40px;
  position: absolute;
  width: 100%;
}
</style>
