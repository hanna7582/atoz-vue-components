<template>
  <div class="chart">
    <div class="chart-container" ref="chartdiv"></div>
    <div class="btn-group">
      <button
        v-for="(name, index) in menu"
        :key="index"
        :class="activeClass(name.en)"
        :style="'background:' + name.color"
        @click="changeActiveMenu(name.en)"
      >
        {{ name.ko }}
      </button>
    </div>
  </div>
</template>

<script>
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
      menu: [
        { en: 'total', ko: '전체', color: '#f26721' },
        { en: 'item1', ko: '아이템1', color: '#ee5557' },
        { en: 'item2', ko: '아이템2', color: '#ffa628' },
        { en: 'item3', ko: '아이템3', color: '#3b92bf' },
        { en: 'time', ko: '시간', color: '#23b4a5' }
      ],
      activeMenu: 'total'
    }
  },
  methods: {
    changeActiveMenu(name) {
      this.activeMenu = name
      this.chart.series.values.forEach(series => {
        if (this.activeMenu == 'total') {
          series.hiddenInLegend = false
          series.show()
        } else {
          if (this.activeMenu == series.dataFields.valueY) {
            series.hiddenInLegend = false
            series.show()
          } else {
            series.hiddenInLegend = true
            series.hide()
          }
        }
      })
    },
    activeClass(name) {
      return this.activeMenu == name ? 'active' : ''
    },
    initChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      chart.data = this.data
      chart.padding(5, 0, 20, 0)
      chart.responsive.enabled = true
      chart.zoomOutButton.disabled = true
      chart.maskBullets = false

      // Add legend
      chart.legend = new am4charts.Legend()
      chart.legend.fontSize = 12
      chart.legend.itemContainers.template.clickable = false
      chart.legend.itemContainers.template.focusable = false
      chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default

      // Add chart cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'none'
      // chart.cursor.strokeWidth = 0

      // Create category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 1
      categoryAxis.renderer.labels.template.maxWidth = 80
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.fontSize = 12

      categoryAxis.events.on('sizechanged', function(ev) {
        const axis = ev.target
        const cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex)
        const label = axis.renderer.labels.template
        if (cellWidth < label.maxWidth) {
          label.rotation = -45
          label.horizontalCenter = 'middle'
          label.verticalCenter = 'middle'
        } else {
          label.rotation = 0
          label.horizontalCenter = 'middle'
          label.verticalCenter = 'top'
        }
      })

      // Create value axis
      const lineAxis = chart.yAxes.push(new am4charts.ValueAxis())
      lineAxis.numberFormatter = new am4core.NumberFormatter()
      lineAxis.numberFormatter.numberFormat = "#.#'%'"
      lineAxis.renderer.minGridDistance = 50
      lineAxis.renderer.grid.template.disabled = true
      lineAxis.min = 0
      lineAxis.max = 100
      lineAxis.fontSize = 12

      const columnAxis = chart.yAxes.push(new am4charts.ValueAxis())
      columnAxis.numberFormatter = new am4core.NumberFormatter()
      columnAxis.numberFormatter.numberFormat = "#'분'"
      columnAxis.renderer.opposite = true
      columnAxis.renderer.minGridDistance = 50
      columnAxis.renderer.grid.template.disabled = true
      columnAxis.fontSize = 12

      // Create series
      function lineCreateSeries(field, name, color) {
        const lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.valueY = field
        lineSeries.dataFields.categoryX = 'category'
        lineSeries.name = name
        lineSeries.yAxis = lineAxis
        lineSeries.stroke = am4core.color(color)
        lineSeries.strokeWidth = 2
        lineSeries.zIndex = 1
        lineSeries.tooltipText = '{categoryX} {name} : {valueY}%'
        lineSeries.tooltip.getFillFromObject = false
        lineSeries.tooltip.background.fill = am4core.color(color)
        lineSeries.tooltip.label.fill = am4core.color('#fff')
        lineSeries.events.on('hidden', toggleAxes)
        lineSeries.events.on('shown', toggleAxes)
        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color(color)
      }

      function columnCreateSeries(field, name, color) {
        const columnSeries = chart.series.push(new am4charts.ColumnSeries())
        columnSeries.dataFields.valueY = field
        columnSeries.dataFields.categoryX = 'category'
        columnSeries.name = name
        columnSeries.yAxis = columnAxis
        columnSeries.strokeWidth = 0
        columnSeries.columns.template.fill = am4core.color(color)
        columnSeries.columns.template.width = am4core.percent(50)
        columnSeries.tooltipText = '{categoryX} {name} : {valueY}분'
        columnSeries.tooltip.getFillFromObject = false
        columnSeries.tooltip.background.fill = am4core.color(color)
        columnSeries.tooltip.label.fill = am4core.color('#fff')
        columnSeries.events.on('hidden', toggleAxes)
        columnSeries.events.on('shown', toggleAxes)
      }

      function toggleAxes(ev) {
        const axis = ev.target.yAxis
        let disabled = true
        axis.series.each(function(series) {
          if (!series.isHiding && !series.isHidden) {
            disabled = false
          }
        })
        axis.disabled = disabled
      }

      lineCreateSeries('item1', '아이템1', '#ee5557')
      lineCreateSeries('item2', '아이템2', '#ffa628')
      lineCreateSeries('item3', '아이템3', '#3b92bf')
      columnCreateSeries('time', '시간', '#23b4a5')

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
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base/_mixins.scss';
@import '@/assets/styles/_base/_variables.scss';
.btn-group {
  white-space: nowrap;
  @include position($xy: 'x', $bottom: 10px);
}
button {
  outline: none;
  height: 30px;
  border: none;
  padding: 0 5px;
  color: $white;
  box-sizing: border-box;
}
button.active {
  border: 2px solid $black;
}
</style>
