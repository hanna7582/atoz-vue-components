<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="info">
      <button class="material-icons" @mouseenter="info = true" @mouseleave="info = false">
        info_outline
      </button>
      <div class="info-box expression" v-show="info">
        이전 주차와 비교해 규칙적으로<br />
        학습을 하고 있는지 알 수 있어요!
      </div>
    </div>
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
  data() {
    return {
      info: false
    }
  },
  computed: {
    reData() {
      let chartData = []
      this.data.forEach(item => {
        const obj = {}
        obj.category = item.category
        obj.item1 = item.item1
        obj.item2 = item.item2
        obj.item2Date = item.item2Date
        const nowDateArr = this.$utils.durationFormatterArr(item.item1)
        const prevDateArr = this.$utils.durationFormatterArr(item.item2)
        const diffTime = this.$utils.timeDifference(
          new Date(2021, 1, 1, nowDateArr[0], nowDateArr[1]),
          new Date(2021, 1, 1, prevDateArr[0], prevDateArr[1])
        )
        obj.difference =
          item.item1 - item.item2 > 0
            ? `<span class="data plus">${diffTime}</span>`
            : item.item1 - item.item2 == 0
            ? `<span class="data">-</span>`
            : `<span class="data minus">${diffTime}</span>`
        chartData.push(obj)
      })

      return chartData
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.reData
      chart.maskBullets = false
      chart.paddingRight = 0
      chart.paddingLeft = 0
      chart.paddingBottom = 0
      chart.seriesContainer.background.fill = '#F6F7FB'
      chart.seriesContainer.background.fillOpacity = 0.3
      chart.zoomOutButton.disabled = true
      // 시간 포맷
      chart.durationFormatter.durationFormat = "hh':'mm"

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12

      /* Create a cursor */
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.maxTooltipDistance = -1
      chart.cursor.lineY.disabled = true
      chart.cursor.behavior = 'none'

      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.cursorTooltipEnabled = false
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 1
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.fontSize = 12

      let label = categoryAxis.renderer.labels.template
      label.fill = '#414141'
      label.wrap = true
      label.maxWidth = 80
      label.textAlign = 'middle'

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.DurationAxis())
      lineAxis.baseUnit = 'second'
      lineAxis.cursorTooltipEnabled = false
      lineAxis.strictMinMax = true
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.fontSize = 12
      const minValue = _.min(this.getMinArr(this.data))
      const maxValue = _.max(this.getMaxArr(this.data))
      // this.setMinMax(minValue, maxValue, lineAxis)
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.renderer.labels.template.disabled = true
      this.gridCalc(minValue, maxValue, lineAxis, 5)

      // Create series
      function lineCreateSeries(field, name, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.name = name
        lineSeries.stroke = am4core.color(color)
        lineSeries.zIndex = 1
        lineSeries.yAxis = lineAxis
        lineSeries.strokeWidth = 2
        if (field === 'item1') {
          lineSeries.strokeWidth = 4
        }
        lineSeries.tooltip.getFillFromObject = false
        lineSeries.tooltip.background.fill = '#fff'
        lineSeries.tooltip.label.interactionsEnabled = true
        lineSeries.tooltip.pointerOrientation = 'vertical'
        lineSeries.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">로그인 시간</span>
                <span class="data">{item1.formatDuration()}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">이전 로그인 시간</span>
                <span class="data">{item2.formatDuration()}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
          </div>`

        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.stroke = am4core.color('#fff')
        bullet.circle.radius = 6

        return lineSeries
      }

      this.item1 = lineCreateSeries('item1', '아이템1', '#FFA628')
      this.item2 = lineCreateSeries('item2', '아이템2', '#b8b8b8')

      this.chart = chart
    },
    getMaxArr(values) {
      return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item2').item2]
    },
    getMinArr(values) {
      return [_.minBy(values, 'item1').item1, _.minBy(values, 'item2').item2]
    },
    setMinMax(min, max, axis) {
      axis.min = min - 3600 < 0 ? 0 : min - 3600
      axis.max = max + 3600 > 86400 ? 86400 : max + 3600
    },
    gridCalc(min, max, axis, divide) {
      const diff = (max - min) / divide
      let minAxis = min - diff
      if (minAxis < 0) minAxis = 0

      let maxAxis = max + diff
      if (max >= 86400) {
        maxAxis = 86400
      }
      let diffAxis = (maxAxis - minAxis) / divide

      if (min == max) {
        minAxis = 0
        maxAxis = 86400
        diffAxis = maxAxis / divide
      }

      axis.min = minAxis
      axis.max = maxAxis
      for (let index = 0; index <= divide; index++) {
        this.createGrid(axis, minAxis + diffAxis * index)
      }
    },
    createGrid(axis, value) {
      let range = axis.axisRanges.create()
      range.value = value
      range.label.text = '{value.formatDuration()}'
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
    },
    currentRadio() {
      this.initChart()
    }
  }
}
</script>
<style>
.tooltip {
  color: #000;
}
.tooltip .row + .row {
  margin-top: 10px;
}
.tooltip .main {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.tooltip .row:nth-child(1) .main .data {
  color: #ffa628;
}
.tooltip .row:nth-child(2) .main .data {
  color: #b8b8b8;
}
.tooltip .sub {
  font-size: 12px;
  width: 100%;
  text-align: right;
}
.tooltip .data {
  display: inline-block;
  width: 70px;
  text-align: right;
  color: #b8b8b8;
}
.tooltip .data.plus {
  color: #e91e63;
}
.tooltip .data.minus {
  color: #2196f3;
}
.info button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: none;
  cursor: pointer;
}
.info .info-box {
  position: absolute;
  bottom: 65px;
  left: 12px;
  display: flex;
  align-items: center;
  border: 1px solid #6c757d;
  background: #fff;
  padding: 10px;
  font-size: 12px;
}
.info .info-box::after {
  content: '';
  position: absolute;
  bottom: -20px;
  border-top: 20px solid #6c757d;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0;
}
</style>
