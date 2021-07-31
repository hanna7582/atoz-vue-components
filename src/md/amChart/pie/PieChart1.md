# PieChart1
범례파이차트

## Reference   
- <a target="_blank" href="https://www.amcharts.com/demos/solid-gauge/">Solid Gauge</a>
- <a target="_blank" href="https://www.amcharts.com/docs/v4/tutorials/custom-external-legend/">Custom external legend</a>
- <a target="_blank" href="https://www.amcharts.com/demos/animated-time-line-pie-chart/">Animated Time-Line Pie Chart</a>

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="legend" :id="id">
      <div class="legend-item">
        <div class="legend-marker" :style="`background: ${color} `"></div>
        {{ legend }}
        <span class="legend-value" :style="`color: ${color} `">
          <GsapCounter :data="percent" unit="%" duration="1" />
        </span>
      </div>
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
import GsapCounter from '@/components/counter/GsapCounter'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)
am4core.options.commercialLicense = true
am4core.options.autoDispose = true

export default {
  props: ['data'],
  components: {
    GsapCounter
  },
  data() {
    return {
      id: 'pieChart1',
      legend: 'percent',
      title: 'count/total'
    }
  },
  computed: {
    percent() {
      return ((this.data[0].count / this.data[0].total) * 100).toFixed(0)
    },
    color() {
      return this.data[0].color
    }
  },
  methods: {
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.RadarChart)
      chart.data = this.data

      chart.innerRadius = am4core.percent(70)

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.labels.template.disabled = true

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.renderer.labels.template.disabled = true
      valueAxis.min = 0
      valueAxis.max = 100

      // Create series
      var series1 = chart.series.push(new am4charts.RadarColumnSeries())
      series1.dataFields.valueX = 'full'
      series1.dataFields.categoryY = 'category'
      series1.columns.template.fill = am4core.color('#eee')
      series1.columns.template.strokeWidth = 0
      series1.clustered = false
      series1.showOnInit = false

      var series2 = chart.series.push(new am4charts.RadarColumnSeries())
      series2.dataFields.valueX = 'percent'
      series2.dataFields.categoryY = 'category'
      series2.columns.template.fill = am4core.color(this.data[0].color)
      series2.columns.template.strokeWidth = 0
      series2.columns.template.radarColumn.cornerRadius = 20

      // create label on inner circle
      const label = chart.seriesContainer.createChild(am4core.Label)
      label.horizontalCenter = 'middle'
      label.verticalCenter = 'middle'
      label.textAlign = 'middle'
      label.text = `[bold font-size:16px]${this.title}\n
                    [bold ${this.data[0].color} font-size:30px] ${this.data[0].count}/[#777 font-size:30px]${this.data[0].total}개`

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
**컬럼 차트 겹침**
```javascript
series1.clustered = false
```

**배경 컬럼 차트 애니메이션 비활성화**
```javascript
series1.showOnInit = false
```

**차트 중앙 정보**
```javascript
const label = chart.seriesContainer.createChild(am4core.Label)
label.horizontalCenter = 'middle'
label.verticalCenter = 'middle'
label.textAlign = 'middle'
label.text = `[bold font-size:16px]${this.title}\n
              [bold ${this.data[0].color} font-size:30px] ${this.data[0].count}/[#777 font-size:30px]${this.data[0].total}개`
```