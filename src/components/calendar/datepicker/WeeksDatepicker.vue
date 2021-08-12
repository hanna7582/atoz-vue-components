<template>
  <div class="datepicker">
    <div class="datepicker-container year" v-if="currView === 'year'">
      <div class="datepicker-header">
        <button class="title">{{ dateObj.year }}</button>
        <button class="prev" @click="changeYears('year', 'prev')">
          <span class="material-icons-outlined">
            navigate_before
          </span>
        </button>
        <button class="next" @click="changeYears('year', 'next')">
          <span class="material-icons-outlined">
            navigate_next
          </span>
        </button>
      </div>
      <div class="datepicker-body">
        <div
          class="item"
          v-for="year in years"
          :key="year"
          :class="{ on: year === dateObj.year }"
          @click="changeView('month', year)"
        >
          {{ year }}
        </div>
      </div>
    </div>
    <div class="datepicker-container month" v-if="currView === 'month'">
      <div class="datepicker-header">
        <button class="title" @click="changeView('year')">{{ dateObj.year }}</button>
        <button class="prev" @click="changeYears('month', 'prev')">
          <span class="material-icons-outlined">
            navigate_before
          </span>
        </button>
        <button class="next" @click="changeYears('month', 'next')">
          <span class="material-icons-outlined">
            navigate_next
          </span>
        </button>
      </div>
      <div class="datepicker-body">
        <div
          class="item"
          v-for="month in 12"
          :key="'month' + month"
          :class="{ on: month === dateObj.month }"
          @click="changeView('weeks', month)"
        >
          {{ month }}
        </div>
      </div>
    </div>
    <div class="datepicker-container weeks" v-if="currView === 'weeks'">
      <div class="datepicker-header">
        <button class="title" @click="changeView('month')">{{ dateObj.year + ' ' + dateObj.month }}</button>
        <button class="prev" @click="changeMonth('prev')">
          <span class="material-icons-outlined">
            navigate_before
          </span>
        </button>
        <button class="next" @click="changeMonth('next')">
          <span class="material-icons-outlined">
            navigate_next
          </span>
        </button>
      </div>
      <div class="datepicker-body">
        <div
          class="item"
          v-for="week in 5"
          :key="week"
          :class="classWeek(week)"
          :data-week="week"
          @click="changeWeek(week)"
        >
          {{ week }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/common/calendar.js'
export default {
  props: ['type', 'setDate'],
  data() {
    return {
      currView: null,
      prevDateObj: null,
      nextDateObj: null,
      dateObj: null,
      currYear: null,
      currMonth: null,
      currWeek: null,
      selectWeek: null,
      prev7Date: null
    }
  },
  computed: {
    years() {
      const list = []
      let year = this.dateObj.year - 4
      for (let index = 0; index < 9; index++) {
        list.push(year + index)
      }
      return list
    },
    today() {
      return this.$calendar.today()
    }
  },
  methods: {
    changeView(type, value) {
      if (type === 'year') {
        this.currView = 'year'
      } else if (type === 'month') {
        if (value) this.currYear = value
        this.currView = 'month'
      } else if (type === 'weeks') {
        this.currMonth = value
        this.currView = 'weeks'
      }
    },
    changeYears(type, arrow) {
      if (type === 'year') {
        this.currYear = arrow === 'prev' ? this.currYear - 9 : this.currYear + 9
      } else if (type === 'month') {
        this.currYear = arrow === 'prev' ? this.currYear - 1 : this.currYear + 1
      }
    },
    changeMonth(arrow) {
      if (arrow === 'prev') {
        this.currMonth = this.currMonth - 1
        if (this.currMonth < 1) {
          this.currMonth = 12
          this.currYear = this.currYear - 1
        }
      } else {
        this.currMonth = this.currMonth + 1
        if (this.currMonth > 12) {
          this.currMonth = 1
          this.currYear = this.currYear + 1
        }
      }
    },
    changeWeek(item, week) {
      if (item) {
        const [year, month, week] = item.dateArray
        this.currYear = year
        this.currMonth = month
        this.currWeek = week
      }
      this.selectWeek = week
      const currWeek = new Date(week)
      currWeek.setDate(currWeek.getDate() - 6)
      this.prev7Date = this.$calendar.datepicker(currWeek).fullDate
    },
    classWeek(item) {
      console.log('classWeek', item)
      return [{ disabled: false }, { on: true }]
    }
  },
  created() {
    this.currView = this.type || 'year'
    this.dateObj = this.setDate ? this.$calendar.datepicker(this.setDate) : this.$calendar.datepicker()
    const { fullDate, year, month, week } = this.dateObj
    this.selectWeek = fullDate
    this.currYear = year
    this.currMonth = month
    this.currWeek = week
  },
  watch: {
    type(type) {
      this.currView = type || 'year'
    },
    currYear(year) {
      this.dateObj = this.$calendar.datepicker(year + '-' + this.currMonth + '-' + this.currWeek)
    },
    currMonth(month) {
      const monthStr = month > 9 ? month : '0' + month
      this.dateObj = this.$calendar.datepicker(this.currYear + '-' + monthStr + '-' + this.currWeek)
    },
    currWeek(week) {
      this.dateObj = this.$calendar.datepicker(this.currYear + '-' + this.currMonth + '-' + week)
    },
    dateObj(obj) {
      this.dates = obj.dates
      const prevMonth = obj.fullDate ? new Date(obj.fullDate) : new Date()
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      this.prevDateObj = this.$calendar.datepicker(prevMonth)

      const nextMonth = obj.fullDate ? new Date(obj.fullDate) : new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.nextDateObj = this.$calendar.datepicker(nextMonth)
      this.$emit('changeView')
    },
    // selectWeek(week) {
    //   this.changeWeek(null, week)
    //   this.$emit('result', { today: this.today, currWeek: week, prev7Date: this.prev7Date })
    // },
    setDate(date) {
      this.dateObj = date ? this.$calendar.datepicker(date) : this.$calendar.datepicker()
    }
  }
}
</script>

<style lang="scss"></style>
