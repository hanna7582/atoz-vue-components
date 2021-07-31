# LineChart4
범례 라디오 차트(시간)

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/logarithmic-scale/">기준선 참고</a>
- <a target="_blank" href="https://www.amcharts.com/docs/v4/concepts/axes/duration-axis/">시간 포맷</a>
  
### NPM Install
```javascript
npm install lodash
```

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
        이전 주차와 비교해 규칙적으로<br />
        학습을 하고 있는지 알 수 있어요!
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
```

## 주요 속성
**시간 포맷**
```javascript
chart.durationFormatter.durationFormat = "hh':'mm"
```

**y축 그리드 그리기**
```javascript
// 최소/최대값 구하기
const minValue = _.min(this.getMinArr(this.data))
const maxValue = _.max(this.getMaxArr(this.data))

this.gridCalc(minValue, maxValue, lineAxis, 5)

gridCalc(min, max, axis, divide) {
  const diff = (max - min) / divide
  let minAxis = min - diff
  if (minAxis < 0) minAxis = 0

  let maxAxis = max + diff
  // 24시 넘을 경우 최대는 24시
  if (max >= 86400) {
    maxAxis = 86400
  }
  let diffAxis = (maxAxis - minAxis) / divide

  // 0 - 24시간으로 표기 
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
  // 포맷 형식으로 출력
  range.label.text = '{value.formatDuration()}'
}
```

**시간차 구하기**
```javascript
// 현재시간
const nowDateArr = this.$utils.durationFormatterArr(item.item1)
// 이전시간
const prevDateArr = this.$utils.durationFormatterArr(item.item2)
// 시간차 구하기
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

// utils.js
// 초 => 시간, 분(배열)
durationFormatterArr(data) {
  const hour = parseInt(data / 3600)
  const min = parseInt((data % 3600) / 60)
  return [hour, min]
},
// 시간 비교
timeDifference(now, prev) {
  const diffMSec = now.getTime() - prev.getTime()
  const hours = Math.abs(parseInt((diffMSec / (1000 * 60 * 60)) % 24))
  const min = Math.abs((diffMSec / (1000 * 60)) % 60)
  const sign = diffMSec > 0 ? '+' : '-'
  return `${sign}${hours}시간 ${min}분`
}    
```