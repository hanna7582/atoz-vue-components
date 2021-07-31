<template>
  <div id="app" :class="theme == 'dark' ? 'dark' : 'light'">
    <Header />
    <section class="container">
      <Nav />
      <router-view />
    </section>
    <button class="btn btn-sub btn-top" :class="hidden ? 'hidden' : ''" @click="scrollTop">
      <i class="fas fa-angle-up"></i>
    </button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '@/layout/Header'
import Nav from '@/layout/Nav'
export default {
  components: {
    Header,
    Nav
  },
  data() {
    return {
      hidden: true
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    scrollTop() {
      let position = document.body.scrollTop || document.documentElement.scrollTop
      let scrollAnimation
      if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)))
        scrollAnimation = setTimeout(this.scrollTop, 10)
      } else {
        clearTimeout(scrollAnimation)
      }
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      let position = document.body.scrollTop || document.documentElement.scrollTop
      this.hidden = position > 100 ? false : true
    })
  }
}
</script>
<style></style>
