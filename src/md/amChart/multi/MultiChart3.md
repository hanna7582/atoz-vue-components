# MultiChart3
스택 차트 + 라인차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-column-chart/">Stacked Column Chart</a>
- <a target="_blank" href="https://www.amcharts.com/docs/v4/concepts/bullets/">bullets</a>
  
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
      chart.scrollbarX = new am4core.Scrollbar()
      chart.scrollbarY = new am4core.Scrollbar()
      chart.scrollbarY.marginRight = 0
      chart.scrollbarX.marginTop = 0

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.cursorTooltipEnabled = false

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.renderer.labels.template.disabled = true

      // Create series
      function lineCreateSeries(field, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.stroke = am4core.color(color)
        lineSeries.strokeWidth = 2
        lineSeries.tensionX = 0.7
        lineSeries.zIndex = 1
        lineSeries.yAxis = lineAxis

        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
        bullet.circle.strokeWidth = 2

        const labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.text = '{totalTime}'
        labelBullet.label.fill = am4core.color(color)
        labelBullet.label.fontSize = 14
        labelBullet.label.fontWeight = 'bold'
        labelBullet.label.y = -10
      }
      lineCreateSeries('total', '#fa7d28')

      function columnCreateSeries(field, color, radius, name, time, count) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.name = name
        columnSeries.stacked = true
        columnSeries.strokeWidth = 0
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.dataFields.valueY = field
        columnSeries.dataItems.template.locations.categoryX = 0.5
        columnSeries.tooltip.pointerOrientation = 'vertical'
        columnSeries.tooltip.getFillFromObject = false
        columnSeries.tooltip.background.fill = '#fff'
        columnSeries.columns.template.width = 30
        columnSeries.columns.template.fill = color
        columnSeries.columns.template.column.cornerRadiusTopRight = radius
        columnSeries.columns.template.column.cornerRadiusTopLeft = radius
        columnSeries.columns.template.tooltipText =
          '[' +
          color +
          ' bold font-size:14px]{name}\n[/]' +
          '[#555 font-size:12px padding-bottom:10px]count: ' +
          count +
          '개\n' +
          '[#555 font-size:12px]time: ' +
          time
        const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.locationY = 0.5
        // 카테고리명으로 노출
        // labelBullet.interactionsEnabled = false
        // labelBullet.label.text = name
        // labelBullet.label.fill = am4core.color('#ffffff')
        // labelBullet.label.truncate = false
        // labelBullet.label.wrap = true
        // labelBullet.label.fontSize = 12
        // 이미지로 노출
        const image = labelBullet.createChild(am4core.Image)
        image.href = 'https://www.amcharts.com/lib/images/star.svg'
        image.width = 10
        image.height = 10
        image.horizontalCenter = 'middle'
        image.verticalCenter = 'middle'
        image.tooltipText = columnSeries.columns.template.tooltipText
        image.filters.push(new am4core.DropShadowFilter())
      }

      this.data.forEach(obj => {
        const keys = Object.keys(obj)
        for (let index = 1; index < keys.length - 6; index++) {
          const key = keys[index]
          let radius = 0
          let color = obj.color[0]
          if (index == keys.length - 7) radius = 10
          if (index % 2 == 0) color = obj.color[1]
          columnCreateSeries(
            key,
            color,
            radius,
            obj.item[index - 1],
            obj.time[index - 1],
            obj.count[index - 1]
          )
        }
      })

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
**차트 스크롤바**
```javascript
chart.scrollbarX = new am4core.Scrollbar()
chart.scrollbarY = new am4core.Scrollbar()
// 여백 수정
chart.scrollbarY.marginRight = 0
chart.scrollbarX.marginTop = 0
```

**차트 스크롤바**
```javascript
chart.scrollbarX = new am4core.Scrollbar()
chart.scrollbarY = new am4core.Scrollbar()
// 여백 수정
chart.scrollbarY.marginRight = 0
chart.scrollbarX.marginTop = 0
```

**series 툴팁 방향**
```javascript
// 세로방향 vertical/기본 가로방향
columnSeries.tooltip.pointerOrientation = 'vertical'
```

**라벨 블렛 생성**
- 도형, 이미지, 텍스트 등으로 생성할 수 있음
```javascript
// 도형
const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
bullet.circle.fill = am4core.color(color)
bullet.circle.strokeWidth = 2

// 시간
const labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet())
labelBullet.label.text = '{totalTime}'
labelBullet.label.fill = am4core.color(color)
labelBullet.label.fontSize = 14
labelBullet.label.fontWeight = 'bold'
labelBullet.label.y = -10

// 카테고리
const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet())
labelBullet.interactionsEnabled = false
labelBullet.label.text = name
labelBullet.label.fill = am4core.color('#ffffff')
labelBullet.label.truncate = false
labelBullet.label.wrap = true
labelBullet.label.fontSize = 12

// 이미지(labelBullet의 자식생성)
const image = labelBullet.createChild(am4core.Image)
image.href = 'https://www.amcharts.com/lib/images/star.svg'
image.width = 10
image.height = 10
image.horizontalCenter = 'middle'
image.verticalCenter = 'middle'
image.tooltipText = columnSeries.columns.template.tooltipText
image.filters.push(new am4core.DropShadowFilter())
```

**series 여러개 생성**
- 단일 series가 아니라면 함수를 만들어 사용
```javascript
function lineCreateSeries(field, color) { ... }
lineCreateSeries('total', '#fa7d28')
function columnCreateSeries(field, color, radius, name, time, count) { ... }
columnCreateSeries('total', '#fa7d28', 10, 'item', 100, 10)
```