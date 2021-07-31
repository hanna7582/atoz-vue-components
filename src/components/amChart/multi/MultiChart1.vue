<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true
am4core.options.autoDispose = true

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
      chart.seriesContainer.background.fill = '#eee'
      chart.seriesContainer.background.fillOpacity = 0.3
      chart.zoomOutButton.disabled = true

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12

      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 1
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.fontSize = 12

      let label = categoryAxis.renderer.labels.template
      label.maxWidth = 80
      label.fill = '#414141'
      label.wrap = true
      label.textAlign = 'middle'

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 30
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.min = 0
      lineAxis.max = 100
      lineAxis.fontSize = 12

      const columnAxis = chart.yAxes.push(new am4charts.ValueAxis())
      columnAxis.renderer.opposite = true
      columnAxis.renderer.grid.template.disabled = true
      columnAxis.renderer.labels.template.disabled = true
      columnAxis.renderer.labels.template.fill = '#414141'
      columnAxis.fontSize = 12
      columnAxis.strictMinMax = true
      columnAxis.min = 0

      const divide = 5
      const gridNum = [0, 10, 20, 30, 40, 50]
      let maxStud = 0

      if (this.data.length > 0) {
        maxStud = _.maxBy(this.data, 'count').count
      }
      if (maxStud == null || maxStud == 0) {
        columnAxis.max = gridNum[divide]
        gridNum.forEach(el => this.createGrid(columnAxis, el))
      } else {
        const diff = Math.round(maxStud / divide)
        const maxAxis = maxStud + diff
        const diffAxis = Math.round(maxAxis / divide)
        columnAxis.max = diffAxis * divide
        for (let i = 0; i <= divide; i++) {
          this.createGrid(columnAxis, diffAxis * i)
        }
      }

      // Create series
      function lineCreateSeries(field, name, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.name = name
        lineSeries.stroke = am4core.color(color)
        lineSeries.strokeWidth = 1
        lineSeries.zIndex = 1
        lineSeries.yAxis = lineAxis
        lineSeries.tensionX = 0.7
        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.stroke = am4core.color('#fff')
      }

      const gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color('#826eff'))
      gradient.addColor(am4core.color('#a79aff'))
      gradient.rotation = -90

      function columnCreateSeries(field, name) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.valueY = field
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.name = name
        columnSeries.strokeWidth = 0
        columnSeries.yAxis = columnAxis
        columnSeries.columns.template.fill = gradient
        columnSeries.columns.template.width = am4core.percent(30)
        columnSeries.columns.template.column.cornerRadiusTopLeft = 100
        columnSeries.columns.template.column.cornerRadiusTopRight = 100
      }

      lineCreateSeries('item1', '아이템1', '#ee5557')
      lineCreateSeries('item2', '아이템2', '#ffa628')
      lineCreateSeries('item3', '아이템3', '#42bdf1')
      columnCreateSeries('count', '개')

      this.chart = chart
    },
    createGrid(axis, value) {
      let range = axis.axisRanges.create()
      range.value = value
      range.label.text = this.numberWithCommas(value) + '개'
    },
    numberWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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

<style></style>
