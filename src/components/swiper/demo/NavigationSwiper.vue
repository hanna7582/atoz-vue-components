<template>
  <div class="swiper">
    <swiper class="mySwiper" :options="swiperOptions" @slideChange="slideChange">
      <swiper-slide :key="item" v-for="item in 10">Slide {{ item }}</swiper-slide>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    slideChange() {
      console.log('slideChange')
    }
  }
}
</script>

<style></style>
