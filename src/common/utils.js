import Vue from 'vue'
const utils = {
  // 마크다운 코드 토글
  toggleCodeBlock(id) {
    setTimeout(function() {
      const btn = document.getElementById(id)
      const pre = btn.parentNode.nextSibling.firstChild
      const handler = function() {
        if (pre.style.display == 'none') {
          btn.classList.remove('hidden')
          pre.style.display = 'block'
        } else {
          btn.classList += ' hidden'
          pre.style.display = 'none'
        }
      }
      btn.addEventListener('click', handler)
    })
  },
  // 내림차순 정렬
  descOrder(arr, key) {
    arr.sort((a, b) => {
      if (a[key] > b[key]) return -1
      if (a[key] < b[key]) return 1
      return 0
    })
    return arr
  },
  // 초 => 시간 분 초(차트)
  durationFormatter(data) {
    const hour = parseInt(data / 3600)
    const min = parseInt((data % 3600) / 60)
    const sec = data % 60
    if (hour !== 0) {
      return `${hour}시간 ${min}분`
    } else if (min !== 0) {
      if (sec === 0) return `${min}분`
      return `${min}분 ${sec}초`
    } else {
      return `${sec}초`
    }
  },
  // 초 => 시간, 분(배열)
  durationFormatterArr(data) {
    const hour = parseInt(data / 3600)
    const min = parseInt((data % 3600) / 60)
    return [hour, min]
  },
  // 시간 비교
  timeDifference(now, prev) {
    const diffMSec = now.getTime() - prev.getTime()
    const hours = Math.abs(parseInt((diffMSec / (1000 * 60 * 60)) % 24))
    const min = Math.abs((diffMSec / (1000 * 60)) % 60)
    const sign = diffMSec > 0 ? '+' : '-'
    return `${sign}${hours}시간 ${min}분`
  }
}

Vue.prototype.$utils = utils
