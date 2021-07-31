<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="columnChart1-legend" ref="legend"></div>
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

      //Create legend
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
      const gridNum = [0, 25, 50, 75, 100]
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.numberFormatter = new am4core.NumberFormatter()
      valueAxis.numberFormatter.numberFormat = "#.#'%'"
      valueAxis.renderer.labels.template.disabled = true
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.min = 0
      valueAxis.max = 100
      valueAxis.renderer.labels.template.fill = '#414141'
      valueAxis.fontSize = 12

      for (let index = 0; index < 5; index++) {
        createGrid(gridNum[index])
      }

      function createGrid(value) {
        const range = valueAxis.axisRanges.create()
        range.value = value
        range.label.text = '{value}'
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
        series.yAxis = valueAxis
        bullet.label.text = '{valueY}'
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
.columnChart1-legend {
  height: 40px;
  position: absolute;
  width: 100%;
}
</style>
