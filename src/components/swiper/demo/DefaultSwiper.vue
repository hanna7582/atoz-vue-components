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

<script>
import SwiperCore, { Pagination, Navigation } from 'swiper/core'
SwiperCore.use([Pagination, Navigation])
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
          // type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 30,
        loop: true
      },
      current: 1,
      total: 10
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
</script>

<style>
.swiper-slide img {
  width: 100%;
}
.page {
  padding: 10px;
  text-align: center;
}
</style>
