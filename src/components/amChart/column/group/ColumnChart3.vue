<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div id="legend" v-if="yAxis == '퍼센트'"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true

export default {
  name: 'ColumnChart3',
  props: ['data', 'yAxis'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data

      chart.maskBullets = false
      chart.paddingRight = 0
      chart.paddingLeft = 0
      chart.paddingTop = 25

      chart.seriesContainer.background.fill = '#eee'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      if (this.yAxis == '퍼센트') {
        chart.legend = new am4charts.Legend()
        chart.legend.itemContainers.template.clickable = false
        chart.legend.itemContainers.template.focusable = false
        chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default

        /* Create a separate container to put legend in */
        var legendContainer = am4core.create('legend', am4core.Container)
        legendContainer.width = am4core.percent(100)
        legendContainer.height = am4core.percent(20)
        chart.legend.parent = legendContainer
      }

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9

      //Create value axis
      let valueAxis, durationAxis
      const gridNum1 = [0, 25, 50, 75, 100]

      function createGrid1(value) {
        let range = valueAxis.axisRanges.create()
        range.value = value
        range.label.text = '{value}'
      }
      function createGrid2(value) {
        let range = durationAxis.axisRanges.create()
        range.value = value
        if (value <= 3600) {
          range.label.text = "{value.formatDuration('m분')}"
        } else {
          range.label.text = "{value.formatDuration('h시간m분')}"
        }
      }

      if (this.yAxis == '퍼센트') {
        valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.numberFormatter = new am4core.NumberFormatter()
        valueAxis.numberFormatter.numberFormat = "#.#'%'"
        valueAxis.renderer.labels.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.min = 0
        valueAxis.max = 100
        valueAxis.fontSize = 14
        // valueAxis.renderer.minGridDistance = 45
        for (let index = 0; index < 5; index++) {
          createGrid1(gridNum1[index])
        }
      } else {
        durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
        durationAxis.baseUnit = 'second'
        durationAxis.renderer.opposite = true
        durationAxis.strictMinMax = true
        durationAxis.renderer.labels.template.disabled = true
        durationAxis.renderer.grid.template.disabled = true
        durationAxis.fontSize = 14
        const count1 = this.data[0].count1
        const count2 = this.data[0].count2
        const min = Math.min(count1, count2)
        const max = Math.max(count1, count2)
        const diff = (max - min) / 4
        let minAxis = min - diff
        if (minAxis < 0) minAxis = 0
        let maxAxis = max + diff
        let diffAxis = (maxAxis - minAxis) / 4

        if (diffAxis <= 60) {
          diffAxis = (min * 2) / 4
          minAxis = 0
          maxAxis = min * 2
        }

        for (let index = 0; index < 5; index++) {
          createGrid2(minAxis + diffAxis * index)
        }

        durationAxis.min = minAxis
        durationAxis.max = maxAxis
      }

      //Create series
      function createSeries(value, name, color, yAxis) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.fill = color
        series.strokeWidth = 0
        series.columns.template.width = 30
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.dy = -10
        bullet.label.fontSize = 12
        bullet.label.fill = am4core.color('#000')
        bullet.label.truncate = false

        if (yAxis == '퍼센트') {
          series.yAxis = valueAxis
          bullet.label.text = '{valueY}'
        } else {
          series.yAxis = durationAxis
          if (value == 'count1') {
            if (chart.data[0].count1 <= 3600) {
              bullet.label.text = "{valueY.formatDuration('m분')}"
            } else {
              bullet.label.text = "{valueY.formatDuration('h시간m분')}"
            }
          } else {
            if (chart.data[0].count2 <= 3600) {
              bullet.label.text = "{valueY.formatDuration('m분')}"
            } else {
              bullet.label.text = "{valueY.formatDuration('h시간m분')}"
            }
          }
        }
        return series
      }
      createSeries('count1', '우리 기관', '#f47920', this.yAxis)
      createSeries('count2', '홈런 상위 10%', '#00d2ed', this.yAxis)

      this.chart = chart
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style scoped>
.chart {
  position: static;
  height: 300px;
}
.chart-container {
  width: 100%;
  height: 100%;
}
#legend {
  height: 40px;
  position: absolute;
  width: 100%;
}
</style>
