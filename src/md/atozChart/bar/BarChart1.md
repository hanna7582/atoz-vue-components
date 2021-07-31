# BarChart1
넓은 화면에서 대칭 / 모바일에서 하나씩 보여지는 차트

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="chart">
    <div class="chart-container row">
      <div class="col" v-for="(col, colIndex) in 2" :key="'col_' + colIndex">
        <div class="title">{{ title[colIndex] }}</div>
        <div
          class="bar-chart"
          :class="colIndex == 0 ? 'reverse' : ''"
          v-for="(item, rowIndex) in data"
          :key="'row_' + rowIndex"
        >
          <span class="bar-chart-label">{{ item.category }}</span>
          <span class="bar-chart-bar" :style="style('bar', item, colIndex)"></span>
          <span class="bar-chart-value" :style="style('value', item, colIndex)">{{
            colIndex == 0 ? item.value1 : item.value2
          }}</span>
          <span
            class="line"
            v-for="lineIndex in parseInt((colIndex == 0 ? item.value1 : item.value2) / 10)"
            :key="lineIndex"
            :style="style('line', item, colIndex, lineIndex)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
export default {
  props: ['data'],
  data() {
    return {
      device: '',
      title: ['chart1', 'chart2']
    }
  },
  methods: {
    style(type, row, colIndex, lineIndex) {
      const bgColor = 'background-color:' + row.color
      const value = colIndex == 0 ? row.value1 : row.value2
      const direction = colIndex == 0 ? 'reverse' : ''
      let directionNm = 'left:'
      if (direction && !this.device) directionNm = 'right:'
      if (type == 'bar') {
        return bgColor + '; width:' + value + '%'
      } else if (type == 'value') {
        return directionNm + value + '%'
      } else {
        return directionNm + lineIndex * 10 + '%'
      }
    },
    animate() {
      this.data.forEach(item => {
        const count = 0
        const speed = 10
        const { value1: max1, value2: max2 } = item
        const fnTimer = function(count, max, value, speed) {
          return function() {
            const ani = setInterval(() => {
              if (count == max) clearInterval(ani)
              item[value] = count++
            }, speed)
          }
        }
        fnTimer(count, max1, 'value1', speed)()
        fnTimer(count, max2, 'value2', speed)()
      })
    }
  },
  mounted() {
    this.animate()
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth
      this.device = windowWidth <= 767 ? 'mobile' : ''
    })
    window.dispatchEvent(new Event('resize'))
  },
  watch: {
    data() {
      this.animate()
    }
  }
}
```

## 주요 속성
**레이아웃 변경**
- resize이벤트로 넓이에 따라 device값 적용
- 스타일의 타입과 컬럼의 속성에 따라 스타일 적용
```javascript
window.addEventListener('resize', () => {
  const windowWidth = window.innerWidth
  this.device = windowWidth <= 767 ? 'mobile' : ''
})
window.dispatchEvent(new Event('resize'))

style(type, row, colIndex, lineIndex) {
  const bgColor = 'background-color:' + row.color
  const value = colIndex == 0 ? row.value1 : row.value2
  let directionNm = 'left:'
  let direction = colIndex == 0 ? 'reverse' : ''
  if (direction && !this.device) directionNm = 'right:'
  if (type == 'bar') {
    return bgColor + '; width:' + value + '%'
  } else if (type == 'value') {
    return directionNm + value + '%'
  } else {
    return directionNm + lineIndex * 10 + '%'
  }
}
```

**차트 애니메이션**
- 첫 진입시(mounted), data 변경시 호출
```javascript
animate() {
  this.data.forEach(item => {
    const count = 0
    const speed = 10
    const { value1: max1, value2: max2 } = item
    const fnTimer = function(count, max, value, speed) {
      return function() {
        const ani = setInterval(() => {
          if (count == max) clearInterval(ani)
          item[value] = count++
        }, speed)
      }
    }
    fnTimer(count, max1, 'value1', speed)()
    fnTimer(count, max2, 'value2', speed)()
  })
}
```