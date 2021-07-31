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

      //Create category axis
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'

      //Create value axis
      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.max = 100

      //Create series
      const columnSeriesBackground = chart.series.push(new am4charts.ColumnSeries())
      columnSeriesBackground.dataFields.categoryY = 'category'
      columnSeriesBackground.dataFields.valueX = 'background'
      columnSeriesBackground.columns.template.fill = '#eee'
      columnSeriesBackground.columns.template.height = 20
      columnSeriesBackground.strokeWidth = 0
      columnSeriesBackground.showOnInit = false

      const columnSeries = chart.series.push(new am4charts.ColumnSeries())
      columnSeries.dataFields.categoryY = 'category'
      columnSeries.dataFields.valueX = 'score'
      columnSeries.columns.template.propertyFields.fill = 'color'
      columnSeries.columns.template.height = 20
      columnSeries.strokeWidth = 0
      columnSeries.sequencedInterpolation = true
      columnSeries.clustered = false

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

<style scoped>
.chart {
  height: 170px;
}
</style>
