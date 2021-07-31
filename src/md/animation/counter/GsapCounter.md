# GsapCounter
Gsap를 이용한 숫자 카운터

## Reference   
- <a target="_blank" href="https://greensock.com/gsap/">gsap</a>

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<!-- GsapCounter.vue -->
<template>
  <div class="gsap-counter">
    <div class="row">
      <label for="">기본 : </label>
      <GsapCounterComp data="100" unit="%" duration="3" />
    </div>
    <div class="row">
      <label for="">변경 : </label>
      <input type="text" v-model="changeNum" size="4" placeholder="숫자 입력" style="margin-right: 10px;" />
      <GsapCounterComp :data="changeNum" unit="개" duration="1" />
    </div>
  </div>
</template>

<!-- GsapCounterComp.vue -->
<template>
  <span>{{ count }}{{ unit }}</span>
</template>

```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
// GsapCounter.vue
import GsapCounterComp from '@/components/animation/counter/GsapCounterComp'
export default {
  components: {
    GsapCounterComp
  },
  data() {
    return {
      changeNum: 0
    }
  }
}

// GsapCounterComp.vue
import { TimelineLite } from 'gsap'
export default {
  props: ['data', 'unit', 'duration'],
  data() {
    return {
      count: 0
    }
  },
  methods: {
    animated(data) {
      var Cont = { val: 0 },
        NewVal = data
      const timeline = new TimelineLite()
      timeline.to(Cont, parseInt(this.duration), {
        val: NewVal,
        roundProps: 'val',
        onUpdate: () => {
          this.count = Cont.val
        }
      })
    }
  },
  mounted() {
    this.animated(this.data)
  },
  watch: {
    data(newData) {
      this.animated(newData)
    }
  }
}
```