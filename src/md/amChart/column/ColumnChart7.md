# ColumnChart7
스택+클러스터 라디오 차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-clustered-column-chart/">stacked-clustered-column-chart</a>
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-waterfall-chart/">stacked-waterfall-chart</a>


## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
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
        계획한 학습 중 완료한 학습 수를 알 수 있어요.
      </div>
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
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
      topData: 20,
      avgData: 15,
      info: false
    }
  },
  computed: {
    reData() {
      let chartData = []
      this.data.forEach(item => {
        const obj = { ...item }
        obj.itemTotal = item.item1 + item.item2
        obj.prevItemTotal = item.prevItem1 + item.prevItem2
        obj.difference =
          obj.itemTotal - obj.prevItemTotal > 0
            ? `<span class="data plus">+${Math.abs(obj.itemTotal - obj.prevItemTotal)}개</span>`
            : obj.itemTotal - obj.prevItemTotal == 0
            ? `<span class="data">-</span>`
            : `<span class="data minus">-${Math.abs(obj.itemTotal - obj.prevItemTotal)}개</span>`
        obj.topDifference =
          this.topData - obj.itemTotal > 0
            ? `<span class="data minus">-${Math.abs(this.topData - obj.itemTotal)}개</span>`
            : this.topData - obj.itemTotal == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.topData - obj.itemTotal)}개</span>`
        obj.avgDifference =
          this.avgData - obj.itemTotal > 0
            ? `<span class="data minus">-${Math.abs(this.avgData - obj.itemTotal)}개</span>`
            : this.avgData - obj.itemTotal == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.avgData - obj.itemTotal)}개</span>`
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
      chart.padding(10, 0, 0, 0)
      chart.numberFormatter.numberFormat = '#개'
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

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.cursorTooltipEnabled = false
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.cellStartLocation = 0.2
      categoryAxis.renderer.cellEndLocation = 0.8
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.cursorTooltipEnabled = false
      valueAxis.min = 0
      if (this.reData.length > 0) {
        valueAxis.max = _.maxBy(this.reData, 'itemTotal').itemTotal
      }

      const lineAxisGuide = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxisGuide.cursorTooltipEnabled = false
      lineAxisGuide.renderer.labels.template.disabled = true
      lineAxisGuide.renderer.opposite = true
      lineAxisGuide.min = 0
      if (this.reData.length > 0) {
        lineAxisGuide.max = _.maxBy(this.reData, 'itemTotal').itemTotal
      }

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
      //Create series
      function createSeries(field, name, color, stacked, prev, total) {
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = field
        series.dataFields.categoryX = 'category'
        series.name = name
        series.stacked = stacked
        series.strokeWidth = 0
        series.columns.template.fill = color
        if (prev) series.columns.template.fillOpacity = 0.5
        if (stacked) series.hiddenInLegend = true

        series.events.on('hidden', toggleAxes)
        series.events.on('shown', toggleAxes)

        series.tooltip.getFillFromObject = false
        series.tooltip.background.fill = '#fff'
        series.tooltip.label.interactionsEnabled = true
        if (vm.currentRadio.name === 'top') {
          series.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">{categoryX}</span>
                <span class="data">{itemTotal}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">{prevDate}</span>
                <span class="data">{prevItemTotal}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">상위</span>
                <span class="data">${vm.topData}개</span>
              </div>
              <div class="sub">
                <span class="name">상위 대비</span>
                {topDifference}
              </div>
            </div>
          </div>
          `
        } else {
          series.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">{categoryX}</span>
                <span class="data">{itemTotal}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">{prevDate}</span>
                <span class="data">{prevItemTotal}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">평균</span>
                <span class="data">${vm.avgData}개</span>
              </div>
              <div class="sub">
                <span class="name">평균 대비</span>
                {avgDifference}
              </div>
            </div>
          </div>
          `
          if (total) {
            const bullet = series.bullets.push(new am4charts.LabelBullet())
            bullet.label.verticalCenter = 'bottom'
            bullet.label.fontSize = 12
            bullet.label.fill = am4core.color('#414141')
            bullet.label.text = prev ? '{prevItemTotal}' : '{itemTotal}'
            bullet.dy = -2
          }
        }

        if (total) {
          const bullet = series.bullets.push(new am4charts.LabelBullet())
          bullet.label.verticalCenter = 'bottom'
          bullet.label.fontSize = 12
          bullet.label.fill = am4core.color('#414141')
          bullet.label.text = prev ? '{prevItemTotal}' : '{itemTotal}'
          bullet.dy = -2
        }

        return series
      }

      createSeries('item1', '아이템1', '#ff9800', false, false, false)
      const item2 = createSeries('item2', '아이템2', '#ffcc80', true, false, true)
      createSeries('prevItem1', '이전 아이템1', '#b8b8b8', false, true, false)
      const prevItem2 = createSeries('prevItem2', '이전 아이템2', '#e3e3e3', true, true, false)

      function toggleAxes(ev) {
        const axis = ev.target
        if (axis.dataFields.valueY === 'item1') {
          if (!axis.isHiding && !axis.isHidden) {
            item2.show()
          } else {
            item2.hide()
          }
        } else if (axis.dataFields.valueY === 'prevItem1') {
          if (!axis.isHiding && !axis.isHidden) {
            prevItem2.show()
          } else {
            prevItem2.hide()
          }
        }
      }

      this.chart = chart
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
```

## 주요 속성
**스택 처리**
- 스택차트의 시작 false 그 다음 쌓는 컬럼부터 true 
- 다음 스택의 시작 false
```javascript
function createSeries(field, name, color, stacked, prev, total) {
  ...
  series.stacked = stacked
  ...
}
createSeries('item1', '아이템1', '#3CDC84', false, false, false)
createSeries('item2', '아이템2', '#F4CA19', true, false, false)
createSeries('prevItem1', '이전 아이템1', '#3CDC84', false, true, false)
createSeries('prevItem2', '이전 아이템2', '#F4CA19', true, true, false)
```
