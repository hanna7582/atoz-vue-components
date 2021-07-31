import Vue from 'vue'

Vue.filter('filterNumberWithCommas', value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('filterValueCheck', (value, unit) => {
  return value || value === 0 ? value + (unit || '') : '-'
})

// 초 => 분
Vue.filter('filterMin', seconds => {
  let min = parseInt(seconds / 60)
  return seconds || seconds === 0 ? min + '분' : '-'
})

// 초 => 시 분
Vue.filter('filterHourMin', seconds => {
  let hour = parseInt(seconds / 3600)
  let min = parseInt((seconds % 3600) / 60)
  let time = ''
  if (hour == 0) {
    time = min + '분'
  } else {
    time = hour + '시간' + min + '분'
  }
  return seconds || seconds === 0 ? time : '-'
})

// 초 => 시 분 초
Vue.filter('filterHourMinSec', seconds => {
  let hour = parseInt(seconds / 3600)
  let min = parseInt((seconds % 3600) / 60)
  let sec = seconds % 60
  if (hour.toString().length == 1) hour = '0' + hour
  if (min.toString().length == 1) min = '0' + min
  if (sec.toString().length == 1) sec = '0' + sec
  let time = hour + '시간' + min + '분' + sec + '초'
  return seconds || seconds === 0 ? time : '-'
})

// 초 => 분 초
Vue.filter('filterMinSec', seconds => {
  let min = parseInt(seconds / 60)
  let sec = seconds % 60
  if (min.toString().length == 1) min = '0' + min
  if (sec.toString().length == 1) sec = '0' + sec
  let time = min + '분' + sec + '초'
  return seconds || seconds === 0 ? time : '-'
})
