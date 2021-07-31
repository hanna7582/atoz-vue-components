# LineChart2
멀티 라인 차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/multiple-value-axes/">Multiple Value Axes</a>
  
### NPM Install
```javascript
npm install lodash
```

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
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
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
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

      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 1
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.fontSize = 12
      let label = categoryAxis.renderer.labels.template
      label.fill = '#414141'
      label.maxWidth = 80
      label.wrap = true
      label.textAlign = 'middle'

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.fontSize = 12
      const minValue = _.min(this.getMinArr(this.data))
      const maxValue = _.max(this.getMaxArr(this.data))
      this.setMinMax(minValue, maxValue, lineAxis)

      // Create series
      function lineCreateSeries(field, name, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.name = name
        lineSeries.stroke = am4core.color(color)
        lineSeries.strokeWidth = 1
        lineSeries.zIndex = 1
        lineSeries.yAxis = lineAxis
        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.stroke = am4core.color('#fff')
      }

      lineCreateSeries('item1', '아이템1', '#EE5557')
      lineCreateSeries('item2', '아이템2', '#FFA628')
      lineCreateSeries('item3', '아이템3', '#42BDF1')

      this.chart = chart
    },
    getMaxArr(values) {
      return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item3').item3, _.maxBy(values, 'item2').item2]
    },
    getMinArr(values) {
      return [_.minBy(values, 'item1').item1, _.minBy(values, 'item3').item3, _.minBy(values, 'item2').item2]
    },
    setMinMax(min, max, axis) {
      axis.min = min - 10 < 0 ? 0 : min - 10
      axis.max = max + 10 > 100 ? 100 : max + 10
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
**data의 최대/최소값 기준 ValueAxis max, min 구하기**
```javascript
// 고정 min, max 
lineAxis.min = 0
lineAxis.max = 100

// data의 최대/최소값 기준 ValueAxis min, max구하기
const minValue = _.min(this.getMinArr(this.data))
const maxValue = _.max(this.getMaxArr(this.data))
this.setMinMax(minValue, maxValue, lineAxis)

getMaxArr(values) {
  return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item3').item3, _.maxBy(values, 'item2').item2]
},
getMinArr(values) {
  return [_.minBy(values, 'item1').item1, _.minBy(values, 'item3').item3, _.minBy(values, 'item2').item2]
},
setMinMax(min, max, axis) {
  axis.min = min - 10 < 0 ? 0 : min - 10
  axis.max = max + 10 > 100 ? 100 : max + 10
}
```

**label 최대 넓이 제한 및 라인개행**
```javascript
let label = categoryAxis.renderer.labels.template
label.maxWidth = 80
label.wrap = true
label.textAlign = 'middle'
```