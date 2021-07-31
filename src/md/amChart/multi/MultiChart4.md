# MultiChart4
라인차트 + 컬럼차트(최대/최소값변경)

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/column-and-line-mix/">Column and Line mix</a>
  
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
      categoryAxis.renderer.labels.template.fill = '#414141'
      categoryAxis.fontSize = 12

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.strictMinMax = true
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 30
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.renderer.labels.template.disabled = true
      lineAxis.renderer.labels.template.fill = '#414141'
      lineAxis.fontSize = 12
      const lineAxisMin = _.min(this.getMinArr(this.data))
      const lineAxisMax = _.max(this.getMaxArr(this.data))
      this.gridCalc(lineAxisMin, lineAxisMax, lineAxis, 5, [0, 20, 40, 60, 80, 100], 'item')

      const durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
      durationAxis.baseUnit = 'second'
      durationAxis.strictMinMax = true
      durationAxis.renderer.opposite = true
      durationAxis.renderer.grid.template.disabled = true
      durationAxis.renderer.labels.template.disabled = true
      durationAxis.renderer.labels.template.fill = '#414141'
      durationAxis.fontSize = 12
      const durationAxisMin = _.minBy(this.data, 'sec').sec
      const durationAxisMax = _.maxBy(this.data, 'sec').sec
      this.gridCalc(durationAxisMin, durationAxisMax, durationAxis, 5, [0, 60, 120, 180, 240, 300], 'sec')

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

      function columnCreateSeries(field, name) {
        const gradient = new am4core.LinearGradient()
        gradient.addColor(am4core.color('#69CCC1'))
        gradient.addColor(am4core.color('#55E5D5'))
        gradient.rotation = -90

        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.valueY = field
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.name = name
        columnSeries.strokeWidth = 0
        columnSeries.yAxis = durationAxis
        columnSeries.columns.template.fill = gradient
        columnSeries.columns.template.width = am4core.percent(30)
        columnSeries.columns.template.column.cornerRadiusTopLeft = 100
        columnSeries.columns.template.column.cornerRadiusTopRight = 100
      }

      lineCreateSeries('item1', '아이템1', '#FFA628')
      lineCreateSeries('item2', '아이템2', '#42BDF1')
      columnCreateSeries('sec', '시간')

      this.chart = chart
    },
    gridCalc(min, max, axis, divide, gridInit, type) {
      const diff = (max - min) / divide
      let minAxis = min - diff
      if (minAxis < 0) minAxis = 0
      let maxAxis = max + diff
      if (type == 'item') {
        maxAxis = maxAxis > 100 ? 100 : maxAxis
      }
      let diffAxis = (maxAxis - minAxis) / divide

      if (min == max) {
        diffAxis = (min * 2) / divide
        minAxis = 0
        maxAxis = min * 2
        if (type == 'item') {
          diffAxis = 20
          maxAxis = 100
        }
      }

      if (this.data.length == 0 || (min == 0 && max == 0)) {
        axis.min = gridInit[0]
        axis.max = gridInit[divide]
        for (let index = 0; index <= divide; index++) {
          this.createGrid(axis, gridInit[index], type)
        }
      } else {
        axis.min = minAxis
        axis.max = maxAxis
        for (let index = 0; index <= divide; index++) {
          this.createGrid(axis, minAxis + diffAxis * index, type)
        }
      }
    },
    createGrid(axis, value, type) {
      let range = axis.axisRanges.create()
      range.value = value
      if (type == 'item') {
        range.label.text = parseInt(value) + '%'
      } else {
        range.label.text = this.$utils.durationFormatter(parseInt(value))
      }
    },
    getMaxArr(values) {
      return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item2').item2]
    },
    getMinArr(values) {
      return [_.minBy(values, 'item1').item1, _.minBy(values, 'item2').item2]
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
chart.paddingRight = 0
chart.paddingLeft = 0
chart.paddingBottom = 0
// 또는
chart.padding(15, 0, 0, 0)
```

**블릿이 그리드 최대/최소에 걸쳤을 때 잘리지 않음**
```javascript
chart.maskBullets = false
```

**y축값 오른쪽방향으로 지정**
```javascript
durationAxis.renderer.opposite = true
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
```javascript
// 최소/최대값 구하기
const lineAxisMin = _.min(this.getMinArr(this.data))
const lineAxisMax = _.max(this.getMaxArr(this.data))
this.gridCalc(lineAxisMin, lineAxisMax, lineAxis, 5, [0, 20, 40, 60, 80, 100], 'item')

// 그리드 계산(최소값, 최대값, axis, 등분수, 그리드초기화, 타입)
gridCalc(min, max, axis, divide, gridInit, type) {
  // (최대값 - 최소값) / 등분수 = 계산을 위한 간격
  const diff = (max - min) / divide
  // 최소값 - 간격 = 실제 최소값 
  let minAxis = min - diff
  // 최소값이 음수일 경우 최소값은 0
  if (minAxis < 0) minAxis = 0
  // 최대값 + 간격 = 실제 최대값
  let maxAxis = max + diff
  // 백분율일 경우 최대값은 100
  if (type == 'item') {
    maxAxis = maxAxis > 100 ? 100 : maxAxis
  }
  // (실제 최대값 - 실제 최소값) / 등분수 = 실제 간격
  let diffAxis = (maxAxis - minAxis) / divide
  // 최소, 최대값이 같을 경우 
  if (min == max) {
    // 최소(또는 최대)값 * 2 / 등분수
    diffAxis = (min * 2) / divide
    // 최소값은 0
    minAxis = 0
    // 최소값 * 2 = 최대값
    maxAxis = min * 2
    // 백분율일 경우 
    if (type == 'item') {
      // 간격 20%
      diffAxis = 20
      // 최대값 100%
      maxAxis = 100
    }
  }

  // 데이터가 없거나 0일 경우
  if (this.data.length == 0 || (min == 0 && max == 0)) {
    // 초기값 배열의 0번째
    axis.min = gridInit[0]
    // 초기값 배열의 마지막번째
    axis.max = gridInit[divide]
    for (let index = 0; index <= divide; index++) {
      this.createGrid(axis, gridInit[index], type)
    }
  } else {
    // 데이터가 있을 경우
    axis.min = minAxis
    axis.max = maxAxis
    for (let index = 0; index <= divide; index++) {
      this.createGrid(axis, minAxis + diffAxis * index, type)
    }
  }
},
// 그리드 그리기
createGrid(axis, value, type) {
  let range = axis.axisRanges.create()
  range.value = value
  if (type == 'item') {
    range.label.text = parseInt(value) + '%'
  } else {
    range.label.text = this.$utils.durationFormatter(parseInt(value))
  }
},
// item1, item2 최대값 배열
getMaxArr(values) {
  return [_.maxBy(values, 'item1').item1, _.maxBy(values, 'item2').item2]
},
// item1, item2 최소값 배열
getMinArr(values) {
  return [_.minBy(values, 'item1').item1, _.minBy(values, 'item2').item2]
}
```

