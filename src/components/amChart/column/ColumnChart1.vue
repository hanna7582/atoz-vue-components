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
  computed: {
    reData() {
      this.data.forEach(item => delete item['king'])
      const sortData = this.$utils.descOrder(this.data, 'count')
      sortData[0].king = require('@/assets/img/i-king.png')
      return sortData
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.reData

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.labels.template.disabled = true
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.min = 0
      const maxCount = this.reData.reduce(function(previous, current) {
        return previous.count > current.count ? previous : current
      })
      valueAxis.max = maxCount.count + maxCount.count / 3

      //Create series
      const columnSeries = chart.series.push(new am4charts.ColumnSeries())
      columnSeries.dataFields.categoryX = 'category'
      columnSeries.dataFields.valueY = 'count'
      columnSeries.columns.template.propertyFields.fill = 'color'
      columnSeries.columns.template.width = 30
      columnSeries.strokeWidth = 0
      columnSeries.sequencedInterpolation = true // 단계별 진행
      columnSeries.defaultState.transitionDuration = 500 // 전환시간
      columnSeries.interpolationEasing = am4core.ease.linear // 애니메이션 곡선

      //Create bullet
      const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet())
      labelBullet.label.verticalCenter = 'bottom'
      labelBullet.label.dy = -2
      labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}"

      // 왕관이미지
      const image = labelBullet.createChild(am4core.Image)
      image.propertyFields.href = 'king'
      image.width = 41
      image.height = 31
      image.horizontalCenter = 'middle'
      image.verticalCenter = 'bottom'
      image.dy = -30

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
