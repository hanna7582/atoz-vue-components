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

      chart.padding(5, 5, 5, 5)

      //Create category axis
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.minGridDistance = 0

      //Create value axis
      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.labels.template.disabled = true
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.min = 0
      if (this.data.length > 0) {
        valueAxis.max = _.maxBy(this.data, 'count').count
      }

      //Create series
      const columnSeries = chart.series.push(new am4charts.ColumnSeries())
      columnSeries.dataFields.categoryY = 'category'
      columnSeries.dataFields.valueX = 'count'
      columnSeries.columns.template.propertyFields.fill = 'color'
      columnSeries.columns.template.height = 10
      columnSeries.strokeWidth = 0
      columnSeries.sequencedInterpolation = true

      categoryAxis.sortBySeries = columnSeries
      categoryAxis.renderer.inversed = true

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
