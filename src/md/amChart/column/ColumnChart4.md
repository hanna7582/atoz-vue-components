# ColumnChart4
이중차트(좌측-백분율, 우측-시간)

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<!-- ColumnChart4(Parent) -->
<template>
  <div class="chart">
    <div class="row">
      <ColumnChart4Child :data="data_1" yAxis="퍼센트" class="col1" />
      <ColumnChart4Child :data="data_2" yAxis="시간" class="col2" />
    </div>
  </div>
</template>

<!-- ColumnChart4Child -->
<template>
  <div>
    <div class="chart-container" ref="chartdiv"></div>
    <div class="columnChart-legend" ref="legend" v-if="yAxis == '퍼센트'"></div>
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
  props: ['data', 'yAxis'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
      chart.maskBullets = false
      chart.padding(25, 0, 0, 0)
      chart.seriesContainer.background.fill = '#F6F7FB'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      if (this.yAxis == 'theme') {
        chart.legend = new am4charts.Legend()
        chart.legend.itemContainers.template.clickable = false
        chart.legend.itemContainers.template.focusable = false
        chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default
        chart.legend.labels.template.fill = '#414141'
        chart.legend.fontSize = 12

        /* Create a separate container to put legend in */
        const legendContainer = am4core.create(this.$refs.legend, am4core.Container)
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
      categoryAxis.renderer.labels.template.fill = '#414141'
      categoryAxis.fontSize = 12

      //Create value axis
      let valueAxis, durationAxis
      const gridNum = [0, 60, 120, 180, 240, 300]

      if (this.yAxis == 'theme') {
        valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.numberFormatter = new am4core.NumberFormatter()
        valueAxis.numberFormatter.numberFormat = "#.#'%'"
        valueAxis.min = 0
        valueAxis.max = 100
        valueAxis.renderer.minGridDistance = 30
        valueAxis.renderer.labels.template.fill = '#414141'
        valueAxis.fontSize = 12
      } else {
        durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
        durationAxis.strictMinMax = true
        durationAxis.renderer.opposite = true
        durationAxis.renderer.labels.template.disabled = true
        durationAxis.renderer.grid.template.disabled = true
        durationAxis.renderer.labels.template.fill = '#414141'
        durationAxis.fontSize = 12
        const divide = 5
        const item1 = this.data[0].item1
        const item2 = this.data[0].item2
        const min = Math.min(item1, item2)
        const max = Math.max(item1, item2)
        const diff = (max - min) / divide
        let minAxis = min - diff
        if (minAxis < 0) minAxis = 0
        let maxAxis = max + diff
        let diffAxis = (maxAxis - minAxis) / divide

        if (min == max) {
          diffAxis = (min * 2) / divide
          minAxis = 0
          maxAxis = min * 2
        }

        if ((min == null && max == null) || (min == 0 && max == 0)) {
          durationAxis.min = gridNum[0]
          durationAxis.max = gridNum[divide]
          for (let index = 0; index <= divide; index++) {
            this.createGrid(durationAxis, gridNum[index])
          }
        } else {
          durationAxis.min = minAxis
          durationAxis.max = maxAxis
          for (let index = 0; index <= divide; index++) {
            this.createGrid(durationAxis, minAxis + diffAxis * index)
          }
        }
      }

      //Create series
      function createSeries(value, name, color, yAxis) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.strokeWidth = 0
        series.columns.template.fill = color
        series.columns.template.width = 30
        series.columns.template.column.cornerRadiusTopLeft = 100
        series.columns.template.column.cornerRadiusTopRight = 100

        const bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.label.fontSize = 10
        bullet.label.fill = am4core.color('#414141')
        bullet.label.truncate = false
        bullet.dy = -10

        if (yAxis == 'theme') {
          series.yAxis = valueAxis
          bullet.label.text = '{valueY}'
        } else {
          series.yAxis = durationAxis
          if (value == 'item1') {
            bullet.label.text = '{item1Format}'
          } else {
            bullet.label.text = '{item2Format}'
          }
        }
      }
      createSeries('item1', '아이템1', '#F47920', this.yAxis)
      createSeries('item2', '아이템2', '#00D2ED', this.yAxis)

      this.chart = chart
    },
    createGrid(axis, value) {
      let range = axis.axisRanges.create()
      range.value = value
      range.label.text = this.$utils.durationFormatter(parseInt(value))
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
**차트 붙이기**
- ColumnChart4Child를 테마/시간별로 생성 
- 마크업 구조
```html
<div class="chart">
  <div class="row">
    <ColumnChart4Child :data="data_1" yAxis="theme" class="col1" />
    <ColumnChart4Child :data="data_2" yAxis="sec" class="col2" />
  </div>
</div>

<!-- ColumnChart4Child -->
<template>
  <div>
    <div class="chart-container" ref="chartdiv"></div>
    <!-- 커스텀 legend공간 -->
    <div class="columnChart-legend" ref="legend" v-if="yAxis == 'theme'"></div>
  </div>
</template>
```
- 스타일
```css
.row {
  position: relative;
  display: flex;
}
.col1 {
  width: 70%;
  height: 250px;
}
.col2 {
  width: 30%;
  height: 250px;
}
.columnChart-legend {
  height: 40px;
  position: absolute;
  width: 100%;
}
```

**커스텀 legendContainer**
- 테마 차트만 legend를 생성 후 차트 두개를 합친 중앙 위치에 붙도록 legendContainer 생성 
```javascript
chart.legend = new am4charts.Legend()
// 부모 컨테이너 생성
const legendContainer = am4core.create(this.$refs.legend, am4core.Container)
legendContainer.width = am4core.percent(100)
legendContainer.height = am4core.percent(20)
chart.legend.parent = legendContainer
```

**데이터 재정의**
- 차트를 그리기위해 속성명을 맞추고 테마/시간 데이터 분리
```javascript
// origin
data : [
  { category: 'theme1', item1Theme1: 71, item2Theme1: 96 },
  { category: 'theme2', item1Theme2: 72, item2Theme2: 98 },
  { category: 'theme3', item1Theme3: 70, item2Theme3: 84 },
  { category: 'sec', item1Sec: 2567, item2Sec: 12638 }
]

// reData
computed: {
  reData() {
    const chartData = []
    this.data.forEach(el => {
      const obj = {}
      if (el.category == 'theme1') {
        obj.category = '테마1'
        obj.item1 = el.item1Theme1
        obj.item2 = el.item2Theme1
      } else if (el.category == 'theme2') {
        obj.category = '테마2'
        obj.item1 = el.item1Theme2
        obj.item2 = el.item2Theme2
      } else if (el.category == 'theme3') {
        obj.category = '테마3'
        obj.item1 = el.item1Theme3
        obj.item2 = el.item2Theme3
      } else if (el.category == 'sec') {
        obj.category = '시간'
        // 컬럼차트를 그리기위한 데이터
        obj.item1 = el.item1Sec
        obj.item2 = el.item2Sec
        // 시분초 출력을 위한 데이터
        obj.item1Format = this.$utils.durationFormatter(el.item1Sec)
        obj.item2Format = this.$utils.durationFormatter(el.item2Sec)
      }
      chartData.push(obj)
    })
    return chartData
  },
  // 테마 data
  data_1() {
    return this.reData.slice(0, 3)
  },
  // 시간 data
  data_2() {
    return this.reData.slice(3)
  }
}
```