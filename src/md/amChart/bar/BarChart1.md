# BarChart1
카테고리에 폰트 스타일을 적용한 비교차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/docs/v4/concepts/formatters/formatting-strings/#List_of_codes">formatting strings/List of codes</a>
  
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

      //Create category axis
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.line.strokeWidth = 3
      categoryAxis.renderer.line.strokeOpacity = 1
      categoryAxis.renderer.line.stroke = 'gray'

      //Create value axis
      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.max = 100

      //Create series
      const columnSeriesBackground = chart.series.push(new am4charts.ColumnSeries())
      columnSeriesBackground.dataFields.categoryY = 'category'
      columnSeriesBackground.dataFields.valueX = 'background'
      columnSeriesBackground.columns.template.fill = '#eee'
      columnSeriesBackground.columns.template.height = 20
      columnSeriesBackground.strokeWidth = 0
      columnSeriesBackground.showOnInit = false

      const columnSeries = chart.series.push(new am4charts.ColumnSeries())
      columnSeries.dataFields.categoryY = 'category'
      columnSeries.dataFields.valueX = 'score'
      columnSeries.columns.template.propertyFields.fill = 'color'
      columnSeries.columns.template.height = 20
      columnSeries.strokeWidth = 0
      columnSeries.sequencedInterpolation = true
      columnSeries.clustered = false

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
**formatting strings**
- 데이터에서 카테고리명에 값을 넣을 때 대괄호[]를 사용하여 스타일 적용
```javascript
{
  category: '[bold #FF5722 font-size:24px]90점',
}
```

**카테고리 역순**
```javascript
categoryAxis.renderer.inversed = true
```

**애니메이션 비활성**
```javascript
columnSeries.showOnInit = false
```

**단계별 애니메이션**
- 첫번째 컬럼 애니메이션이 진행되고 다음 컬럼 애니메이션 수행
```javascript
columnSeries.sequencedInterpolation = true
```

**컬럼 겹치기(백그라운드 컬럼 만들기)**
- 데이터를 받을 때 백그라운드 컬럼 100과 실제 수치를 함께 받는다.
- columnSeriesBackground, columnSeries 생성 후 백그라운드컬럼을 기본 컬럼 뒤로 보낸다.
```javascript
{
  score: 90,
  background: 100,
}
 columnSeries.clustered = false
```

**라벨 활성화 여부**
```javascript
categoryAxis.renderer.labels.template.disabled = true
valueAxis.renderer.labels.template.disabled = true
```

**그리드(선) 활성화 여부**
```javascript
categoryAxis.renderer.grid.template.disabled = true
valueAxis.renderer.grid.template.disabled = true
```