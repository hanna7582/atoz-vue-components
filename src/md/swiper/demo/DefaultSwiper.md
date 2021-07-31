# Default

## Reference   
- <a target="_blank" href="https://swiperjs.com/">swiperjs</a>
- <a target="_blank" href="https://swiperjs.com/demos#default">default</a>
- <a target="_blank" href="https://swiperjs.com/demos#navigation">navigation</a>
  
## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="swiper">
    <swiper ref="swiperComponent" :options="swiperOptions" @slideChange="slideChange">
      <swiper-slide :key="item" v-for="item in total">
        <img :src="'//picsum.photos/300/300/?image=5' + item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
    <div class="page">{{ current }}/{{ totalFraction }}</div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Pagination, Navigation } from 'swiper/core'
SwiperCore.use([Pagination, Navigation])
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 클릭 활성화
          // type: 'progressbar' // 프로그래스바 형식의 페이지네이션
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 5, // 한 화면 당 보여지는 슬라이드 수
        slidesPerGroup: 5, // 슬라이드 그룹시 묶는 슬라이드 수 
        spaceBetween: 30, // 슬라이드 간격
        loop: true // 무한롤링
      },
      current: 1, // 현재 페이지
      total: 10 // 총 슬라이드 수
    }
  },
  computed: {
    totalFraction() {
      return this.total / this.swiperOptions.slidesPerView
    }
  },
  methods: {
    slideChange() {
      console.log(this.swiper)
      this.current = this.swiper.realIndex / this.swiperOptions.slidesPerView + 1
    }
  },
  mounted() {
    this.swiper = this.$refs.swiperComponent.$swiper
  }
}
```