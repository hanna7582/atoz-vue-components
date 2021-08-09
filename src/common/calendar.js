import Vue from 'vue'
const calendar = {
  // yyyy-mm-dd
  setDate(dateStr) {
    const dateObj = dateStr ? new Date(dateStr) : new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const fullDate = this.formatDate([year, month, date], '-')
    const firstDate = new Date(year, dateObj.getMonth(), 1)
    const lastDate = new Date(year, dateObj.getMonth() + 1, 0)
    const firstDateDay = firstDate.getDay()
    const prevLastDate = new Date(year, dateObj.getMonth(), 0)
    const prevDateYear = prevLastDate.getFullYear()
    const prevMonth = prevLastDate.getMonth() + 1
    const nextFirstDate = new Date(year, dateObj.getMonth() + 1, 1)
    const nextDateYear = nextFirstDate.getFullYear()
    const nextMonth = nextFirstDate.getMonth() + 1
    const dates = []

    // 이전달 시작일
    let prevDate = prevLastDate.getDate() - firstDateDay + 1
    // 다음달 시작일
    let nextDate = 1
    for (let index = 0; index < 42; index++) {
      if (index < firstDateDay) {
        // 이전달
        dates.push({
          dateArray: [prevDateYear, prevMonth, prevDate++],
          class: 'prev',
          dateStr: [prevDateYear, this.addZero(prevMonth), this.addZero(prevDate)].join('-')
        })
      } else if (index >= lastDate.getDate() + firstDateDay) {
        // 다음달
        dates.push({
          dateArray: [nextDateYear, nextMonth, nextDate++],
          class: 'next',
          dateStr: [nextDateYear, this.addZero(nextMonth), this.addZero(nextDate)].join('-')
        })
      } else {
        // 이번달
        dates.push({
          dateArray: [year, month, index - firstDateDay + 1],
          class: null,
          dateStr: [year, this.addZero(month), this.addZero(index - firstDateDay + 1)].join('-')
        })
      }
    }
    return { fullDate, year, month, date, dates }
  },
  today() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    return this.formatDate([year, month, date], '-')
  },
  formatDate(dateArr, separator) {
    const [year, month, date] = dateArr
    const reDateArr = [year, this.addZero(month), this.addZero(date)]
    return reDateArr.join(separator)
  },
  addZero(num) {
    return num < 10 ? '0' + num : num
  }
}

Vue.prototype.$calendar = calendar
