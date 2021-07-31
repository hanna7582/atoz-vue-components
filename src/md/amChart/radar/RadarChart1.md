# RadarChart1
기본 방사형 차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/radar-chart/">Radar Chart</a>

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
  </div>
</template>
```

## Demo Code <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true

export default {
  props: ['data'],
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.RadarChart)
      chart.data = this.data
      chart.seriesContainer.zIndex = 0

      //Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      const label = categoryAxis.renderer.labels.template
      label.fontWeight = 'bold'
      label.fontSize = '14px'
      label.fill = '#555'

      window.addEventListener('resize', function() {
        const deviceWidth = document.body.clientWidth
        if (deviceWidth < 420) {
          label.maxWidth = 70
          label.truncate = true
          label.tooltipText = '{category}'
        } else {
          label.truncate = false
          label.tooltipText = ''
        }
      })
      window.dispatchEvent(new Event('resize'))

      //Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2)
      valueAxis.renderer.axisFills.template.fillOpacity = 0.05
      valueAxis.renderer.gridType = 'polygons'
      valueAxis.min = 0
      valueAxis.max = 100
      valueAxis.zIndex = 1
      valueAxis.numberFormatter.numberFormat = "#.#'%'"
      valueAxis.renderer.labels.template.horizontalCenter = 'right'
      valueAxis.renderer.labels.template.fontSize = '14px'

      //Create series
      const series = chart.series.push(new am4charts.RadarSeries())
      series.dataFields.categoryX = 'category'
      series.dataFields.valueY = 'count'
      series.bulletsContainer.parent = chart.seriesContainer
      series.name = 'Sales'
      series.strokeWidth = 3
      series.stroke = '#fb9813'

      //Create bullet
      const circleBullet = series.bullets.push(new am4charts.CircleBullet())
      circleBullet.circle.strokeWidth = 0
      circleBullet.circle.radius = 5
      circleBullet.circle.fill = '#fb9813'

      this.chart = chart
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
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
**컨테이너 위치수정**
- seriesContainer.zIndex 기본값 2
- seriesContainer의 zIndex값에 따라 라인의 위치가 변경되며 수치의 위치도 변경된다.
```javascript
// 라인(주황색)이 백그라운드 뒤로
chart.seriesContainer.zIndex = -1
// 라인(주황색)이 백그라운드 앞으로(valueAxis : 라인 앞으로 나오도록 수치 변경)
chart.seriesContainer.zIndex = 0
valueAxis.zIndex = 1
```

**블렛의 부모 컨테이너 정하기**
- 블렛이 그려졌을 때 컨테이너 바깥쪽으로 나가는 경우 잘리지 않음
```javascript
series.bulletsContainer.parent = chart.seriesContainer 
```

**범례 툴팁 생성**
- 가로폭이 좁아질 경우 범례가 잘려질 수 있으므로 툴팁을 생성하도록 처리
```javascript
window.addEventListener('resize', function() {
  const deviceWidth = document.body.clientWidth
  if (deviceWidth < 420) {
    label.maxWidth = 70
    label.truncate = true
    label.tooltipText = '{category}'
  } else {
    label.truncate = false
    label.tooltipText = ''
  }
})
window.dispatchEvent(new Event('resize'))
```