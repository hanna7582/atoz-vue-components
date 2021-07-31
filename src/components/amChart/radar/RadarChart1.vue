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
      const chart = am4core.create(this.$refs.chartdiv, am4charts.RadarChart)
      chart.data = this.data
      chart.seriesContainer.zIndex = 0

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      const label = categoryAxis.renderer.labels.template
      label.fontWeight = 'bold'
      label.fontSize = '14px'
      label.fill = '#555'

      window.addEventListener('resize', function() {
        const deviceWidth = document.body.clientWidth
        if (deviceWidth < 420) {
          label.maxWidth = 70
          label.truncate = true
          label.tooltipText = '{category}'
        } else {
          label.truncate = false
          label.tooltipText = ''
        }
      })
      window.dispatchEvent(new Event('resize'))

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2)
      valueAxis.renderer.axisFills.template.fillOpacity = 0.05
      valueAxis.renderer.gridType = 'polygons'
      valueAxis.min = 0
      valueAxis.max = 100
      valueAxis.zIndex = 1
      valueAxis.numberFormatter.numberFormat = "#.#'%'"
      valueAxis.renderer.labels.template.horizontalCenter = 'right'
      valueAxis.renderer.labels.template.fontSize = '14px'

      //Create series
      const series = chart.series.push(new am4charts.RadarSeries())
      series.dataFields.categoryX = 'category'
      series.dataFields.valueY = 'count'
      series.bulletsContainer.parent = chart.seriesContainer
      series.name = 'Sales'
      series.strokeWidth = 3
      series.stroke = '#fb9813'

      //Create bullet
      const circleBullet = series.bullets.push(new am4charts.CircleBullet())
      circleBullet.circle.strokeWidth = 0
      circleBullet.circle.radius = 5
      circleBullet.circle.fill = '#fb9813'

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
