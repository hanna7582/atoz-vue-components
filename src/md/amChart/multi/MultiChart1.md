# MultiChart1
라인차트 + 컬럼차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/column-and-line-mix/">Column and Line mix</a>
- <a target="_blank" href="https://www.amcharts.com/docs/v4/tutorials/wrapping-and-truncating-axis-labels">Wrapping, truncating, and auto-rotating axis labels</a>
  
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
      chart.seriesContainer.background.fill = '#eee'
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
      label.maxWidth = 80
      label.fill = '#414141'
      label.wrap = true
      label.textAlign = 'middle'

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 30
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.min = 0
      lineAxis.max = 100
      lineAxis.fontSize = 12

      const columnAxis = chart.yAxes.push(new am4charts.ValueAxis())
      columnAxis.renderer.opposite = true
      columnAxis.renderer.grid.template.disabled = true
      columnAxis.renderer.labels.template.disabled = true
      columnAxis.renderer.labels.template.fill = '#414141'
      columnAxis.fontSize = 12
      columnAxis.strictMinMax = true
      columnAxis.min = 0

      const divide = 5
      const gridNum = [0, 10, 20, 30, 40, 50]
      let maxStud = 0

      if (this.data.length > 0) {
        maxStud = _.maxBy(this.data, 'count').count
      }
      if (maxStud == null || maxStud == 0) {
        columnAxis.max = gridNum[divide]
        gridNum.forEach(el => this.createGrid(columnAxis, el))
      } else {
        const diff = Math.round(maxStud / divide)
        const maxAxis = maxStud + diff
        const diffAxis = Math.round(maxAxis / divide)
        columnAxis.max = diffAxis * divide
        for (let i = 0; i <= divide; i++) {
          this.createGrid(columnAxis, diffAxis * i)
        }
      }

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
        lineSeries.tensionX = 0.7
        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.stroke = am4core.color('#fff')
      }

      const gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color('#826eff'))
      gradient.addColor(am4core.color('#a79aff'))
      gradient.rotation = -90

      function columnCreateSeries(field, name) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.valueY = field
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.name = name
        columnSeries.strokeWidth = 0
        columnSeries.yAxis = columnAxis
        columnSeries.columns.template.fill = gradient
        columnSeries.columns.template.width = am4core.percent(30)
        columnSeries.columns.template.column.cornerRadiusTopLeft = 100
        columnSeries.columns.template.column.cornerRadiusTopRight = 100
      }

      lineCreateSeries('item1', '아이템1', '#ee5557')
      lineCreateSeries('item2', '아이템2', '#ffa628')
      lineCreateSeries('item3', '아이템3', '#42bdf1')
      columnCreateSeries('count', '개')

      this.chart = chart
    },
    createGrid(axis, value) {
      let range = axis.axisRanges.create()
      range.value = value
      range.label.text = this.numberWithCommas(value) + '명'
    },
    numberWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
**차트 여백**
- padding(top, right, bottom, left)메서드를 사용 (default 15)
- paddingRight와 같이 속성을 사용
```javascript
chart.paddingRight = 5
chart.paddingLeft = 5
chart.padding(15, 5, 15, 5)
```

**블릿이 그리드 최대/최소에 걸쳤을 때 잘리지 않음**
```javascript
chart.maskBullets = false
```

**y축값 오른쪽방향으로 지정**
```javascript
columnAxis.renderer.opposite = true
```

**범례 길어질때 라인개행**
```javascript
  let label = categoryAxis.renderer.labels.template
  label.maxWidth = 80
  label.wrap = true
  label.textAlign = 'middle'
```

**배경 gradient 적용**
```javascript
const gradient = new am4core.LinearGradient()
gradient.addColor(am4core.color('#826eff'))
gradient.addColor(am4core.color('#a79aff'))
gradient.rotation = -90

columnSeries.columns.template.fill = gradient
```

**컬럼 모서리 라운드처리**
```javascript
columnSeries.columns.template.column.cornerRadiusTopLeft = 100
columnSeries.columns.template.column.cornerRadiusTopRight = 100
```

**곡선지수**
- 수치가 작을수록 구부러짐이 심함
```javascript
lineSeries.tensionX = 0.7
```

**y축 그리드 그리기**
- 최소값 0, 최대값=최대값+여유값, 등분, 간격 구하기 
```javascript
// min, max를 기준으로 등분, 차트의 최하단/상단을 기준으로 등분
columnAxis.strictMinMax = true

// 등분
const divide = 5
// 기본 그리드 값 
const gridNum = [0, 10, 20, 30, 40, 50]
let maxStud = 0

if (this.data.length > 0) {
  //데이터 최대값
  maxStud = _.maxBy(this.data, 'studCnt').studCnt 
}
if (maxStud == null || maxStud == 0) {
  columnAxis.max = gridNum[divide]
  gridNum.forEach(el => this.createGrid(columnAxis, el))
} else {
  // 최대값/등분 = 계산을 위한 간격
  const diff = Math.round(maxStud / divide)
  // 최대값+간격 = 계산을 위한 최대값 
  const maxAxis = maxStud + diff
  // 계산을 위한 최대값/등분 = 실제 간격
  const diffAxis = Math.round(maxAxis / divide)
  // 실제 간격*등분 = 실제 최대값
  columnAxis.max = diffAxis * divide
  for (let i = 0; i <= divide; i++) {
    this.createGrid(columnAxis, diffAxis * i)
  }
}

// 선 그리기
createGrid(axis, value) {
  let range = axis.axisRanges.create()
  range.value = value
  range.label.text = value + '명'
}
```