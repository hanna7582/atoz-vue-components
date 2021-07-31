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
      this.data.forEach(obj => {
        const keys = Object.keys(obj)
        const time = []
        for (let index = 1; index < keys.length - 4; index++) {
          const key = keys[index]
          const itemTime = obj[key]
          time[index - 1] = this.$utils.durationFormatter(itemTime)
        }
        obj.time = time
        obj.totalTime = this.$utils.durationFormatter(obj.total)
      })
      return this.data
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.reData
      chart.scrollbarX = new am4core.Scrollbar()
      chart.scrollbarY = new am4core.Scrollbar()
      chart.scrollbarY.marginRight = 0
      chart.scrollbarX.marginTop = 0

      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.renderer.labels.template.disabled = true

      // Create series
      function lineCreateSeries(field, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.stroke = am4core.color(color)
        lineSeries.strokeWidth = 2
        lineSeries.tensionX = 0.7
        lineSeries.zIndex = 1
        lineSeries.yAxis = lineAxis

        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.strokeWidth = 2

        const labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.text = '{totalTime}'
        labelBullet.label.fill = am4core.color(color)
        labelBullet.label.fontSize = 14
        labelBullet.label.fontWeight = 'bold'
        labelBullet.label.y = -10
      }
      lineCreateSeries('total', '#fa7d28')

      function columnCreateSeries(field, color, radius, name, time, count) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.name = name
        columnSeries.stacked = true
        columnSeries.strokeWidth = 0
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.dataFields.valueY = field
        columnSeries.dataItems.template.locations.categoryX = 0.5
        columnSeries.tooltip.pointerOrientation = 'vertical'
        columnSeries.tooltip.getFillFromObject = false
        columnSeries.tooltip.background.fill = '#fff'
        columnSeries.columns.template.width = 30
        columnSeries.columns.template.fill = color
        columnSeries.columns.template.column.cornerRadiusTopRight = radius
        columnSeries.columns.template.column.cornerRadiusTopLeft = radius
        columnSeries.columns.template.tooltipText =
          '[' +
          color +
          ' bold font-size:14px]{name}\n[/]' +
          '[#555 font-size:12px padding-bottom:10px]count: ' +
          count +
          '개\n' +
          '[#555 font-size:12px]time: ' +
          time
        const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.locationY = 0.5
        // 카테고리명으로 노출
        // labelBullet.interactionsEnabled = false
        // labelBullet.label.text = name
        // labelBullet.label.fill = am4core.color('#ffffff')
        // labelBullet.label.truncate = false
        // labelBullet.label.wrap = true
        // labelBullet.label.fontSize = 12
        // 이미지로 노출
        const image = labelBullet.createChild(am4core.Image)
        image.href = 'https://www.amcharts.com/lib/images/star.svg'
        image.width = 10
        image.height = 10
        image.horizontalCenter = 'middle'
        image.verticalCenter = 'middle'
        image.tooltipText = columnSeries.columns.template.tooltipText
        image.filters.push(new am4core.DropShadowFilter())
      }

      this.data.forEach(obj => {
        const keys = Object.keys(obj)
        for (let index = 1; index < keys.length - 6; index++) {
          const key = keys[index]
          let radius = 0
          let color = obj.color[0]
          if (index == keys.length - 7) radius = 10
          if (index % 2 == 0) color = obj.color[1]
          columnCreateSeries(
            key,
            color,
            radius,
            obj.item[index - 1],
            obj.time[index - 1],
            obj.count[index - 1]
          )
        }
      })

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
