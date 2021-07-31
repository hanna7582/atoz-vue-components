# ColumnChart3
스택차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/100-stacked-column-chart/">100% Stacked Column Chart</a>
- <a target="_blank" href="https://www.amcharts.com/demos/stacked-column-chart/">Stacked Column Chart</a>

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
      chart.maskBullets = false
      chart.padding(15, 0, 0, 0)
      chart.seriesContainer.background.fill = '#eee'
      chart.seriesContainer.background.fillOpacity = 0.3

      //Create legend
      chart.legend = new am4charts.Legend()
      chart.legend.labels.template.fill = '#414141'
      chart.legend.fontSize = 12

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 50
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'
      categoryAxis.renderer.cellStartLocation = 0.1
      categoryAxis.renderer.cellEndLocation = 0.9
      categoryAxis.fontSize = 12
      categoryAxis.height = 30

      let label = categoryAxis.renderer.labels.template
      label.maxWidth = 80
      label.fill = '#414141'
      label.wrap = true
      label.textAlign = 'middle'

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.numberFormatter = new am4core.NumberFormatter()
      valueAxis.numberFormatter.numberFormat = "#'%'"
      valueAxis.renderer.minGridDistance = 50
      valueAxis.renderer.labels.template.fill = '#414141'
      valueAxis.strictMinMax = true
      valueAxis.calculateTotals = true
      valueAxis.fontSize = 12
      valueAxis.min = 0
      valueAxis.max = 100

      //Create series
      function createSeries(value, name, color) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.dataFields.valueYShow = 'totalPercent'
        series.columns.template.fill = color
        series.columns.template.width = am4core.percent(60)
        series.name = name
        series.strokeWidth = 0
        series.stacked = true

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.locationY = 0.5
        bullet.label.fontSize = 12
        bullet.label.text = "{valueY.totalPercent.formatNumber('#.00')}%"
        bullet.label.fill = am4core.color('#fff')
      }
      createSeries('item1', '아이템1', '#3CDC84')
      createSeries('item2', '아이템2', '#F4CA19')
      createSeries('item3', '아이템3', '#F1667F')

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
**100% 스택 컬럼**
```javascript
valueAxis.strictMinMax = true
valueAxis.calculateTotals = true

series.dataFields.valueYShow = 'totalPercent'
series.stacked = true
```

**0%일 경우 텍스트 미노출**
```javascript
bullet.label.adapter.add('textOutput', (text, target) => {
  return target.dataItem && target.dataItem.valueY == 0 ? '' : text
})
```