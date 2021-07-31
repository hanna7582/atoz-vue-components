<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div id="legend">
      <label v-for="(item, i) in radio" :key="i" @change="toggleLegend(item.name, item.active)">
        <i class="material-icons">
          {{ item.active ? 'radio_button_checked' : 'radio_button_unchecked' }}
        </i>
        {{ item.text }}
        <input type="radio" :value="item" v-model="currentRadio" />
      </label>
    </div>
    <div class="info">
      <button class="material-icons" @mouseenter="info = true" @mouseleave="info = false">
        info_outline
      </button>
      <div class="info-box expression" v-show="info">
        <div class="col">수행률</div>
        <div class="col">=</div>
        <div class="col fractional">
          <span>완료한 계획된 학습 수</span>
          <span>모든 계획된 학습 수</span>
        </div>
        <div class="col">x</div>
        <div class="col">100</div>
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
      currentRadio: {
        name: 'top',
        text: '상위',
        color: '#007aff',
        active: true
      },
      radio: [
        {
          name: 'top',
          text: '상위',
          color: '#007aff',
          active: true
        },
        {
          name: 'avg',
          text: '평균',
          color: '#007aff',
          active: false
        }
      ],
      item1: null,
      item2: null,
      top: null,
      avg: null,
      topData: 80,
      avgData: 40,
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
        obj.difference =
          item.item1 - item.item2 > 0
            ? `<span class="data plus">+${Math.abs(item.item1 - item.item2)}%p</span>`
            : item.item1 - item.item2 == 0
            ? `<span class="data">-</span>`
            : `<span class="data minus">-${Math.abs(item.item1 - item.item2)}%p</span>`
        obj.topDifference =
          this.topData - item.item1 > 0
            ? `<span class="data minus">-${Math.abs(this.topData - item.item1)}%p</span>`
            : this.topData - item.item1 == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.topData - item.item1)}%p</span>`
        obj.avgDifference =
          this.avgData - item.item1 > 0
            ? `<span class="data minus">-${Math.abs(this.avgData - item.item1)}%p</span>`
            : this.avgData - item.item1 == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.avgData - item.item1)}%p</span>`

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

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12
      chart.legend.width = am4core.percent(50)
      chart.legend.contentAlign = 'right'

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
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.cursorTooltipEnabled = false
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.fontSize = 12
      const minValue = _.min(this.getMinArr(this.data))
      const maxValue = _.max(this.getMaxArr(this.data))
      this.setMinMax(minValue, maxValue, lineAxis)

      // Add a guide
      const lineAxisGuide = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxisGuide.cursorTooltipEnabled = false
      lineAxisGuide.renderer.labels.template.disabled = true
      lineAxisGuide.renderer.opposite = true
      this.setMinMax(minValue, maxValue, lineAxisGuide)

      function createRange(value, color, name, hidden) {
        let range = lineAxisGuide.axisRanges.create()
        range.value = value
        range.grid.stroke = am4core.color(color)
        range.grid.strokeWidth = 2
        range.grid.strokeOpacity = 1
        range.grid.strokeDasharray = '3,3'
        // 라벨 속성
        range.label.text = name
        range.label.align = 'right'
        range.label.background.fill = am4core.color(color)
        range.label.fill = '#fff'
        range.label.fontSize = '12px'
        // 숨기기
        if (hidden) range.hide()

        return range
      }
      this.top = createRange(this.topData, '#03a9f4', '상위', false)
      this.avg = createRange(this.avgData, '#03a9f4', '평균', true)

      const vm = this
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

        if (vm.currentRadio.name === 'top') {
          lineSeries.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">{categoryX}</span>
                <span class="data">{item1}%</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">{item2Date}</span>
                <span class="data">{item2}%</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">상위</span>
                <span class="data">${vm.topData}%</span>
              </div>
              <div class="sub">
                <span class="name">상위 대비</span>
                {topDifference}
              </div>
            </div>
          </div>
          `
        } else {
          lineSeries.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">{categoryX}</span>
                <span class="data">{item1}%</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">{item2Date}</span>
                <span class="data">{item2}%</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">평균</span>
                <span class="data">${vm.avgData}%</span>
              </div>
              <div class="sub">
                <span class="name">평균 대비</span>
                {avgDifference}
              </div>
            </div>
          </div>
          `
        }

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
      axis.min = min - 10 < 0 ? 0 : min - 10
      axis.max = max + 10 > 100 ? 100 : max + 10
    },
    toggleLegend(name, active) {
      if (name == 'top' && !active) {
        this.top.show()
        this.avg.hide()
        this.radio.map(item => {
          if (item.name == name) {
            return (item.active = !active)
          } else if (item.name == 'avg') {
            return (item.active = active)
          }
        })
      }
      if (name == 'avg' && !active) {
        this.avg.show()
        this.top.hide()
        this.radio.map(item => {
          if (item.name == name) {
            return (item.active = !active)
          } else if (item.name == 'top') {
            return (item.active = active)
          }
        })
      }
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
#legend {
  display: flex;
  position: absolute;
  width: calc(50% - 20px);
  right: 20px;
  bottom: 20px;
}
#legend label {
  display: flex;
  align-items: center;
  height: 39px;
  margin-right: 10px;
  color: #03a9f4;
  font-size: 12px;
}
#legend label i {
  margin-right: 5px;
}
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
.tooltip .row:nth-child(3) .main .data {
  color: #289eff;
}
.tooltip .sub {
  font-size: 12px;
  width: 100%;
  text-align: right;
}
.tooltip .data {
  display: inline-block;
  width: 50px;
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
.fractional {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.fractional span + span {
  border-top: 1px solid #6c757d;
}
</style>
