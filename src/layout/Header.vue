<template>
  <header class="top-nav">
    <h1>
      <router-link to="/">
        <img src="@/assets/img/atoz-white.svg" alt="atoz vue components" />
        <!-- <object data="@/assets/img/atoz.svg" type="image/svg+xml" aria-label="atoz"></object> -->
      </router-link>
    </h1>
    <ul>
      <li v-for="(item, index) in category" :key="index">
        <router-link :to="'/' + item">{{ item }}</router-link>
      </li>
    </ul>
    <div class="theme">
      <label>
        <input type="checkbox" v-model="currentTheme" @change="themeChange" />
        <span class="theme-btn"></span>
        <span class="theme-bg"></span>
      </label>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      currentTheme: false,
      category: ['components', 'templates']
    }
  },
  computed: {
    ...mapState(['theme']),
    themeCheck: function() {
      return this.theme == 'light' ? false : true
    }
  },
  methods: {
    ...mapMutations(['setCategory', 'setTheme']),
    themeChange: function() {
      this.setTheme({ theme: this.currentTheme })
    }
  },
  created() {
    this.currentTheme = this.themeCheck
  },
  watch: {
    $route(to) {
      this.setCategory(to.matched[0].name)
    }
  }
}
</script>

<style></style>
