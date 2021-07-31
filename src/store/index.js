import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
  // theme
  getTheme() {
    var theme = localStorage.getItem('theme')
    if (!theme) {
      localStorage.setItem('theme', 'light')
      return 'light'
    }
    return theme
  }
}

export default new Vuex.Store({
  state: {
    theme: storage.getTheme(),
    category: 'components'
  },
  mutations: {
    setTheme(state, payload) {
      let theme = payload.theme ? 'dark' : 'light'
      localStorage.setItem('theme', theme)
      state.theme = theme
    },
    setCategory(state, payload) {
      state.category = payload
    }
  },
  actions: {},
  modules: {}
})
