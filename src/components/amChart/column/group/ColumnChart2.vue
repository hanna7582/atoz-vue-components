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

      //Create legend
      chart.legend = new am4charts.Legend()
      chart.legend.itemContainers.template.clickable = false
      chart.legend.itemContainers.template.focusable = false
      chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12

      //Create category axis
      const categoryAxisTotal = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxisTotal.dataFields.category = 'category'
      categoryAxisTotal.renderer.minGridDistance = 50
      categoryAxisTotal.renderer.grid.template.location = 0
      categoryAxisTotal.renderer.grid.template.disabled = true
      if (this.data.length > 0) {
        categoryAxisTotal.renderer.labels.template.adapter.add('html', function() {
          return `<span style="display: inline-block;
                    padding: 1mm;
                    border-radius: 1mm;
                    background: #F9A11B;
                    color: white;">{total}명</span>`
        })
      }
      categoryAxisTotal.fontSize = 12
      categoryAxisTotal.dy = 0
      categoryAxisTotal.height = 30

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9
      categoryAxis.fontSize = 12
      categoryAxis.height = 30

      let label = categoryAxis.renderer.labels.template
      label.maxWidth = 80
      label.fill = '#414141'
      label.wrap = true
      label.textAlign = 'middle'

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.numberFormatter = new am4core.NumberFormatter()
      valueAxis.numberFormatter.numberFormat = "#'명'"
      valueAxis.renderer.minGridDistance = 20
      valueAxis.renderer.labels.template.fill = '#414141'
      valueAxis.fontSize = 12
      valueAxis.min = 0
      if (this.data.length > 0) {
        const signal1Max = _.maxBy(this.data, 'signal1').signal1
        const signal2Max = _.maxBy(this.data, 'signal2').signal2
        const signal3Max = _.maxBy(this.data, 'signal3').signal3
        const maxCount = _.max([signal1Max, signal2Max, signal3Max])
        valueAxis.max = maxCount
      } else {
        valueAxis.max = 100
      }

      //Create series
      function createSeries(value, name, color) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        // series.showOnInit = false
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.fill = color
        series.strokeWidth = 0
        series.columns.template.width = am4core.percent(80)
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.dy = -10
        bullet.label.fontSize = 8
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#000')

        return series
      }
      createSeries('signal1', '칭찬', '#3CDC84')
      createSeries('signal2', '유지', '#F4CA19')
      createSeries('signal3', '독려', '#F1667F')

      chart.zoomOutButton.disabled = false

      this.chart = chart
      this.$emit('end', true)
    }
  },
  mounted() {
    if (this.data.length == 0) {
      this.initChart()
    }
  },
  watch: {
    data: {
      handler() {
        if (this.chart) {
          this.chart.dispose()
        }
        this.initChart()
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 320px;
}
</style>
