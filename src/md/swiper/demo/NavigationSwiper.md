# Navigation

## Reference   
- <a target="_blank" href="https://swiperjs.com/">swiperjs</a>
- <a target="_blank" href="https://swiperjs.com/demos#default">default</a>
  
## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="swiper">
    <swiper class="mySwiper" :options="swiperOptions" @slideChange="slideChange">
      <swiper-slide :key="item" v-for="item in 10">Slide {{ item }}</swiper-slide>
    </swiper>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
export default {
  data() {
    return {
      swiperOptions: {}
    }
  },
  methods: {
    slideChange() {
      console.log('slideChange')
    }
  }
}
```

## 주요 속성
**swiperOptions**
- swiperOptions 속성
