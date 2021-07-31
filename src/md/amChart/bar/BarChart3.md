# BarChart3
범례라디오차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-bar-chart-with-negative-values/">Stacked bar chart with negative values</a>

### NPM Install
```javascript
npm install lodash
```

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
        계획한 날짜와 비교해서<br />
        얼마나 잘 출석했는지 알 수 있어요!
      </div>
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
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
      topData: 5,
      avgData: 3,
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
        obj.item1Plan = item.item1Plan
        obj.item2Plan = item.item2Plan
        obj.item1Info = `${item.item1}/${item.item1Plan}일`
        obj.item2Info = `${item.item2}/${item.item2Plan}일`
        obj.difference =
          item.item1 - item.item2 > 0
            ? `<span class="data plus">+${Math.abs(item.item1 - item.item2)}일</span>`
            : item.item1 - item.item2 == 0
            ? `<span class="data">-</span>`
            : `<span class="data minus">-${Math.abs(item.item1 - item.item2)}일</span>`
        obj.topDifference =
          this.topData - item.item1 > 0
            ? `<span class="data minus">-${Math.abs(this.topData - item.item1)}일</span>`
            : this.topData - item.item1 == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.topData - item.item1)}일</span>`
        obj.avgDifference =
          this.avgData - item.item1 > 0
            ? `<span class="data minus">-${Math.abs(this.avgData - item.item1)}일</span>`
            : this.avgData - item.item1 == 0
            ? `<span class="data">-</span>`
            : `<span class="data plus">+${Math.abs(this.avgData - item.item1)}일</span>`

        chartData.push(obj)
      })

      return chartData
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.reData
      chart.paddingBottom = 0
      chart.seriesContainer.background.fill = '#F6F7FB'
      chart.seriesContainer.background.fillOpacity = 0.3
      chart.zoomOutButton.disabled = true
      chart.numberFormatter.numberFormat = '#일'

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
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.cursorTooltipEnabled = false
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.labels.template.disabled = true
      function createCategoryRange(y) {
        let range = categoryAxis.axisRanges.create()
        range.grid.stroke = am4core.color('#000')
        range.grid.dy = y
        range.grid.maxWidth = 200
        console.log('range', range.grid)
      }
      createCategoryRange(42)
      createCategoryRange(124)

      //Create value axis
      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.cursorTooltipEnabled = false
      valueAxis.min = 0
      valueAxis.max = 7

      // https://www.amcharts.com/demos/stacked-bar-chart-with-negative-values/
      function createRange(value, color, name, hidden) {
        let range = valueAxis.axisRanges.create()
        range.value = value
        range.grid.stroke = am4core.color(color)
        range.grid.strokeWidth = 2
        range.grid.strokeOpacity = 1
        range.grid.strokeDasharray = '3,3'
        // 라벨 속성
        range.label.text = name
        range.label.dy = -180
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
      function createColumn(field, name, color) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.categoryY = 'category'
        columnSeries.dataFields.valueX = field
        columnSeries.name = name
        columnSeries.columns.template.fill = color
        columnSeries.columns.template.height = 30
        columnSeries.strokeWidth = 0

        const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.dx = -20
        labelBullet.label.text = '{valueX}'
        labelBullet.label.fontWeight = 'bold'

        columnSeries.tooltip.getFillFromObject = false
        columnSeries.tooltip.background.fill = '#fff'
        columnSeries.tooltip.label.interactionsEnabled = true
        columnSeries.tooltip.pointerOrientation = 'vertical'

        if (vm.currentRadio.name === 'top') {
          columnSeries.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">출석/계획일 수</span>
                <span class="data">{item1Info}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">이전 출석/계획일 수</span>
                <span class="data">{item2Info}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">상위</span>
                <span class="data">${vm.topData}일</span>
              </div>
              <div class="sub">
                <span class="name">상위 대비</span>
                {topDifference}
              </div>
            </div>
          </div>
          `
        } else {
          columnSeries.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">출석/계획일 수</span>
                <span class="data">{item1Info}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">이전 출석/계획일 수</span>
                <span class="data">{item2Info}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">평균</span>
                <span class="data">${vm.avgData}일</span>
              </div>
              <div class="sub">
                <span class="name">평균 대비</span>
                {avgDifference}
              </div>
            </div>
          </div>
          `
        }

        return columnSeries
      }
      createColumn('item1', '아이템1', '#FFA628')
      createColumn('item2', '아이템2', '#b8b8b8')

      function createPlanDt(y, value) {
        let range = valueAxis.axisRanges.create()
        range.value = value
        range.label.inside = true
        range.label.dy = y
        range.label.adapter.add('html', function() {
          return `<div class="column-label">
                      <span class="bar"></span>
                      <span class="text">학습계획일</span>
                  </div>`
        })

        return range
      }
      createPlanDt(-75, 6)
      createPlanDt(10, 2)

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
**데이터 포맷**
```javascript
chart.numberFormatter.numberFormat = '#일'
```

**x, y 커서 비활성화**
```javascript
categoryAxis.cursorTooltipEnabled = false
valueAxis.cursorTooltipEnabled = false
```


**legend 크기 및 위치**
- 컨텐츠 50% 왼쪽 정렬 후 내용 오른쪽 배치
```javascript
chart.legend = new am4charts.Legend()
chart.legend.labels.template.fill = '#414141'
chart.legend.fontSize = 12
chart.legend.width = am4core.percent(50)
chart.legend.contentAlign = 'right'
```

**카테고리 grid 추가**
```javascript
const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
let range = categoryAxis.axisRanges.create()
function createCategoryRange(y) {
  let range = categoryAxis.axisRanges.create()
  range.grid.stroke = am4core.color('#000')
  range.grid.dy = y
}
createCategoryRange(42)
createCategoryRange(124)
```

**value grid 추가**
```javascript
const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
let range = categoryAxis.axisRanges.create()
function createCategoryRange(y) {
  let range = categoryAxis.axisRanges.create()
  range.grid.stroke = am4core.color('#000')
  range.grid.dy = y
}
createCategoryRange(42)
createCategoryRange(124)
```