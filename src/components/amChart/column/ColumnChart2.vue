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
      chart.padding(15, 0, 0, 0)

      chart.seriesContainer.background.fill = '#eee'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      chart.legend = new am4charts.Legend()
      chart.legend.fontSize = 12

      //Create category axis
      const categoryAxisTotal = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxisTotal.dataFields.category = 'total'
      categoryAxisTotal.renderer.minGridDistance = 50
      categoryAxisTotal.renderer.grid.template.disabled = true
      categoryAxisTotal.renderer.labels.template.adapter.add('html', function() {
        return `<span style="display: inline-block;
                  padding: 0 1mm;
                  border-radius: 1mm;
                  background: orange;
                  color: white;">{total}명</span>`
      })
      categoryAxisTotal.renderer.inside = true
      categoryAxisTotal.renderer.cellStartLocation = 0.1
      categoryAxisTotal.renderer.cellEndLocation = 0.9
      categoryAxisTotal.fontSize = 12
      categoryAxisTotal.height = 10
      categoryAxisTotal.dy = 20

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.fontSize = 12

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.numberFormatter = new am4core.NumberFormatter()
      valueAxis.numberFormatter.numberFormat = "#'명'"
      valueAxis.renderer.minGridDistance = 20
      valueAxis.fontSize = 12
      valueAxis.min = 0
      const item1Max = _.maxBy(this.data, 'item1').item1
      const item2Max = _.maxBy(this.data, 'item2').item2
      const item3Max = _.maxBy(this.data, 'item3').item3
      const maxCount = _.max([item1Max, item2Max, item3Max])
      valueAxis.max = maxCount

      //Create series
      function createSeries(value, name, color) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'total'
        series.columns.template.fill = color
        series.columns.template.width = am4core.percent(80)
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100
        series.name = name
        series.strokeWidth = 0

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.label.fontSize = 8
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#000')
        bullet.dy = -10

        return series
      }
      createSeries('item1', '아이템1', '#3cdc84')
      createSeries('item2', '아이템2', '#f4ca19')
      createSeries('item3', '아이템3', '#f1667f')

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
