<template>
  <div class="chart columnChart5">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="circle" v-html="difference"></div>
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
    difference() {
      const difference = this.data[1].count - this.data[0].count
      return difference > 0
        ? `<span class="plus">+${Math.abs(difference)}%</span>`
        : difference == 0
        ? `-`
        : `<span class="minus">-${Math.abs(difference)}%</span>`
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data

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
      valueAxis.max = 100

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

<style>
.columnChart5 .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  border-radius: 50%;
}
.columnChart5 .circle .plus {
  color: #e91e63;
}
.columnChart5 .circle .minus {
  color: #2196f3;
}
</style>
