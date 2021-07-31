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
      chart.seriesContainer.background.fill = '#F6F7FB'
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
      categoryAxis.renderer.labels.template.fill = '#414141'
      categoryAxis.fontSize = 12

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.strictMinMax = true
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 30
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.renderer.labels.template.disabled = true
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.fontSize = 12
      const lineAxisMin = _.min(this.getMinArr(this.data))
      const lineAxisMax = _.max(this.getMaxArr(this.data))
      this.gridCalc(lineAxisMin, lineAxisMax, lineAxis, 5, [0, 20, 40, 60, 80, 100], 'item')

      const durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
      durationAxis.baseUnit = 'second'
      durationAxis.strictMinMax = true
      durationAxis.renderer.opposite = true
      durationAxis.renderer.grid.template.disabled = true
      durationAxis.renderer.labels.template.disabled = true
      durationAxis.renderer.labels.template.fill = '#414141'
      durationAxis.fontSize = 12
      const durationAxisMin = _.minBy(this.data, 'sec').sec
      const durationAxisMax = _.maxBy(this.data, 'sec').sec
      this.gridCalc(durationAxisMin, durationAxisMax, durationAxis, 5, [0, 60, 120, 180, 240, 300], 'sec')

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

      function columnCreateSeries(field, name) {
        const gradient = new am4core.LinearGradient()
        gradient.addColor(am4core.color('#69CCC1'))
        gradient.addColor(am4core.color('#55E5D5'))
        gradient.rotation = -90

        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.valueY = field
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.name = name
        columnSeries.strokeWidth = 0
        columnSeries.yAxis = durationAxis
        columnSeries.columns.template.fill = gradient
        columnSeries.columns.template.width = am4core.percent(30)
        columnSeries.columns.template.column.cornerRadiusTopLeft = 100
        columnSeries.columns.template.column.cornerRadiusTopRight = 100
      }

      lineCreateSeries('item1', '아이템1', '#FFA628')
      lineCreateSeries('item2', '아이템2', '#42BDF1')
      columnCreateSeries('sec', '시간')

      this.chart = chart
    },
    gridCalc(min, max, axis, divide, gridInit, type) {
      const diff = (max - min) / divide
      let minAxis = min - diff
      if (minAxis < 0) minAxis = 0
      let maxAxis = max + diff
      if (type == 'item') {
        maxAxis = maxAxis > 100 ? 100 : maxAxis
      }
      let diffAxis = (maxAxis - minAxis) / divide

      if (min == max) {
        diffAxis = (min * 2) / divide
        minAxis = 0
        maxAxis = min * 2
        if (type == 'item') {
          diffAxis = 20
          maxAxis = 100
        }
      }

      if (this.data.length == 0 || (min == 0 && max == 0)) {
        axis.min = gridInit[0]
        axis.max = gridInit[divide]
        for (let index = 0; index <= divide; index++) {
          this.createGrid(axis, gridInit[index], type)
        }
      } else {
        axis.min = minAxis
        axis.max = maxAxis
        for (let index = 0; index <= divide; index++) {
          this.createGrid(axis, minAxis + diffAxis * index, type)
        }
      }
    },
    createGrid(axis, value, type) {
      let range = axis.axisRanges.create()
      range.value = value
      if (type == 'item') {
        range.label.text = parseInt(value) + '%'
      } else {
        range.label.text = this.$utils.durationFormatter(parseInt(value))
      }
    },
    getMaxArr(values) {
      return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item2').item2]
    },
    getMinArr(values) {
      return [_.minBy(values, 'item1').item1, _.minBy(values, 'item2').item2]
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
