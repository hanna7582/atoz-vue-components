# ColumnChart6
스택+클러스터 차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-clustered-column-chart/">stacked-clustered-column-chart</a>
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-waterfall-chart/">stacked-waterfall-chart</a>


## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="info">
      <button class="material-icons" @mouseenter="info = true" @mouseleave="info = false">
        info_outline
      </button>
      <div class="info-box expression" v-show="info">
        풀어서 제출한 문제 중 고쳐야 할<br />
        문제풀이 습관 수를 알 수 있어요.
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
      info: false
    }
  },
  computed: {
    reData() {
      let chartData = []
      this.data.forEach(item => {
        const obj = { ...item }
        obj.itemTotal = item.item1 + item.item2 + item.item3 + item.item4
        obj.prevItemTotal = item.prevItem1 + item.prevItem2 + item.prevItem3 + item.prevItem4
        obj.difference =
          obj.itemTotal - obj.prevItemTotal > 0
            ? `<span class="data plus">+${Math.abs(obj.itemTotal - obj.prevItemTotal)}일</span>`
            : obj.itemTotal - obj.prevItemTotal == 0
            ? `<span class="data">-</span>`
            : `<span class="data minus">-${Math.abs(obj.itemTotal - obj.prevItemTotal)}일</span>`
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
      chart.padding(10, 5, 5, 5)
      chart.numberFormatter.numberFormat = '#개'

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12

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

        series.tooltip.getFillFromObject = false
        series.tooltip.background.fill = '#fff'
        series.tooltip.label.interactionsEnabled = true
        series.tooltipHTML = `
          <div class="tooltip">
            <div class="row">
              <div class="main">
                <span class="name">{category}</span>
                <span class="data">{itemTotal}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">이전날짜</span>
                <span class="data">{itemPrevTotal}</span>
              </div>
              <div class="sub">
                <span class="name">이전 대비</span>
                {difference}
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">아이템1</span>
                <span class="data">{item1}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">아이템2</span>
                <span class="data">{item2}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">아이템3</span>
                <span class="data">{item3}</span>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <span class="name">아이템4</span>
                <span class="data">{item4}</span>
              </div>
            </div>
          </div>`

        if (total) {
          const bullet = series.bullets.push(new am4charts.LabelBullet())
          bullet.label.verticalCenter = 'bottom'
          bullet.label.fontSize = 12
          bullet.label.fill = am4core.color('#414141')
          bullet.label.text = prev ? '{prevItemTotal}' : '{itemTotal}'
          bullet.dy = -2
        }
      }

      createSeries('item1', '아이템1', '#3CDC84', false, false, false)
      createSeries('item2', '아이템2', '#F4CA19', true, false, false)
      createSeries('item3', '아이템3', '#F1667F', true, false, false)
      createSeries('item4', '아이템4', '#00bcd4', true, false, true)
      createSeries('prevItem1', '이전 아이템1', '#3CDC84', false, true, false)
      createSeries('prevItem2', '이전 아이템2', '#F4CA19', true, true, false)
      createSeries('prevItem3', '이전 아이템3', '#F1667F', true, true, false)
      createSeries('prevItem4', '이전 아이템4', '#00bcd4', true, true, true)

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
createSeries('item3', '아이템3', '#F1667F', true, false, false)
createSeries('item4', '아이템4', '#00bcd4', true, false, true)
createSeries('prevItem1', '이전 아이템1', '#3CDC84', false, true, false)
createSeries('prevItem2', '이전 아이템2', '#F4CA19', true, true, false)
createSeries('prevItem3', '이전 아이템3', '#F1667F', true, true, false)
createSeries('prevItem4', '이전 아이템4', '#00bcd4', true, true, true)
```
