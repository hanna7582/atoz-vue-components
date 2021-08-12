import Vue from 'vue'
const calendar = {
  // yyyy-mm-dd
  datepicker(dateStr) {
    const dateObj = dateStr ? new Date(dateStr) : new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const fullDate = this.formatDateArr([year, month, date])
    const firstDate = new Date(year, dateObj.getMonth(), 1)
    const lastDate = new Date(year, dateObj.getMonth() + 1, 0)
    const firstDateDay = firstDate.getDay()
    const prevLastDate = new Date(year, dateObj.getMonth(), 0)
    const prevDateYear = prevLastDate.getFullYear()
    const prevMonth = prevLastDate.getMonth() + 1
    const nextFirstDate = new Date(year, dateObj.getMonth() + 1, 1)
    const nextDateYear = nextFirstDate.getFullYear()
    const nextMonth = nextFirstDate.getMonth() + 1
    // 일 달력
    const dates = []
    // 이전달 시작일
    let prevDate = prevLastDate.getDate() - firstDateDay + 1
    // 다음달 시작일
    let nextDate = 1
    for (let index = 0; index < 42; index++) {
      let date = {}
      if (index < firstDateDay) {
        // 이전달
        date = {
          dateArray: [prevDateYear, prevMonth, prevDate],
          class: 'prev',
          dateStr: [prevDateYear, this.addZero(prevMonth), this.addZero(prevDate)].join('-')
        }
        prevDate++
        dates.push(date)
      } else if (index >= lastDate.getDate() + firstDateDay) {
        // 다음달
        date = {
          dateArray: [nextDateYear, nextMonth, nextDate],
          class: 'next',
          dateStr: [nextDateYear, this.addZero(nextMonth), this.addZero(nextDate)].join('-')
        }
        nextDate++
        dates.push(date)
      } else {
        // 이번달
        date = {
          dateArray: [year, month, index - firstDateDay + 1],
          class: null,
          dateStr: [year, this.addZero(month), this.addZero(index - firstDateDay + 1)].join('-')
        }
        dates.push(date)
      }
      // 주차 달력
      // let weeks = []
      // let weekDates = []
      // let weekIndex = -1
      // // 주차의 시작
      // if (firstDateDay == 1) {
      //   weekIndex = 0
      //   console.log('요일 인덱스', dateObj.toLocaleDateString(), firstDateDay)
      // }
      // weekDates.push(date)
      // if ((index + 1) % 7 == 0) {
      //   let weekObj = {
      //     week: ++weekIndex,
      //     dates: []
      //   }
      //   weekObj.dates = weekDates
      //   weeks.push(weekObj)
      //   weekDates = []
      // }
    }
    return { fullDate, year, month, date, dates }
  },
  weekDatepicker(arrow, startDate) {
    /**
     * @params arrow 이전/다음
     * @params startDate 시작날짜
     */
    const dates = []
    // 월요일부터 시작
    let changeWeekDate = 1
    // 월요일부터 시작이므로 +8, -6
    if (arrow == 'next') {
      changeWeekDate = 8
    } else if (arrow == 'prev') {
      changeWeekDate = -6
    }

    const now = startDate ? new Date(startDate) : new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const date = now.getDate()
    const day = now.getDay()
    const weekStartDate = new Date(year, month, date - day + changeWeekDate)
    dates.push({
      dateStr: this.formatDateObj(weekStartDate),
      dateArray: [weekStartDate.getFullYear(), weekStartDate.getMonth() + 1, weekStartDate.getDate()]
    })
    for (let index = 0; index < 6; index++) {
      weekStartDate.setDate(weekStartDate.getDate() + 1)
      dates.push({
        dateStr: this.formatDateObj(weekStartDate),
        dateArray: [weekStartDate.getFullYear(), weekStartDate.getMonth() + 1, weekStartDate.getDate()]
      })
    }

    return dates
  },
  today() {
    return this.formatDateObj(new Date())
  },
  formatDateObj(dateObj, separator) {
    if (separator == undefined) separator = '-'
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    return year + separator + this.addZero(month) + separator + this.addZero(date)
  },
  formatDateArr(dateArr, separator) {
    if (separator == undefined) separator = '-'
    const [year, month, date] = dateArr
    return [year, this.addZero(month), this.addZero(date)].join(separator)
  },
  addZero(num) {
    return num < 10 ? '0' + num : num
  }
}

Vue.prototype.$calendar = calendar
