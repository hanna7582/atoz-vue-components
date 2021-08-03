import Vue from 'vue'
const calendar = {
  getYear() {
    return new Date().getFullYear()
  }
}

Vue.prototype.$calendar = calendar
