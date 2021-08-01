import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/js/all.js'
import '@/common/category.js'
import '@/common/utils.js'
import '@/common/filters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import '@/assets/styles/styles.scss'
import Highlight from 'vue-markdown-highlight'
import 'highlight.js/styles/night-owl.css'

Vue.use(Highlight)
Vue.use(VueAwesomeSwiper)
window.onload = function() {}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
