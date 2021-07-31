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
am4core.options.autoDispose = true

export default {
  props: ['data'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
      chart.padding(15, 0, 0, 0)
      chart.seriesContainer.background.fill = '#eee'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'bottom'
      chart.legend.fontSize = 12
      chart.legend.labels.template.fill = '#414141'

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.labels.template.fill = '#414141'
      categoryAxis.fontSize = 12

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 20
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.min = 0
      lineAxis.max = 100
      lineAxis.fontSize = 12

      // Create series
      const lineSeries = chart.series.push(new am4charts.LineSeries())
      lineSeries.dataFields.valueY = 'item1'
      lineSeries.dataFields.categoryX = 'category'
      lineSeries.name = '아이템1'
      lineSeries.stroke = am4core.color('#42bdf1')
      lineSeries.strokeWidth = 1
      lineSeries.yAxis = lineAxis
      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
      bullet.circle.fill = am4core.color('#42bdf1')
      bullet.circle.stroke = am4core.color('#fff')
      const gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color('#7E6AFF'))
      gradient.addColor(am4core.color('#AB9EFF'))
      gradient.rotation = -90
      lineSeries.fillOpacity = 0.5
      lineSeries.fill = gradient

      this.chart = chart
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
