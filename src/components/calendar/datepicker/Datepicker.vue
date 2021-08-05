<template>
  <div>
    <div class="datepicker-container year" v-if="currView === 'year'">
      <div class="datepicker-header">
        <button class="title">{{ currYear }}</button>
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
          :class="{ on: year === currYear }"
          @click="changeView('month', year)"
        >
          {{ year }}
        </div>
      </div>
    </div>
    <div class="datepicker-container month" v-if="currView === 'month'">
      <div class="datepicker-header">
        <button class="title" @click="changeView('year')">{{ currYear }}</button>
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
          :class="{ on: month === currMonth }"
          @click="changeView('date', month)"
        >
          {{ month }}
        </div>
      </div>
    </div>
    <div class="datepicker-container date" v-if="currView === 'date'">
      <div class="datepicker-header">
        <button class="title" @click="changeView('month')">{{ currYear + ' ' + currMonth }}</button>
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
        <div class="day" v-for="(day, dayIndex) in days" :key="'days' + dayIndex">
          {{ day }}
        </div>
        <div
          class="item"
          v-for="item in dates"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="changeDate(item)"
        >
          {{ item.dateArray[2] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/common/calendar.js'
export default {
  props: ['type', 'setDate', 'setDays'],
  data() {
    return {
      currView: null,
      dateObj: null,
      currFullDate: null,
      currYear: null,
      currMonth: null,
      currDate: null,
      days: null,
      dates: null
    }
  },
  computed: {
    years() {
      const list = []
      let year = this.currYear - 4
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
      } else if (type === 'date') {
        this.currMonth = value
        this.currView = 'date'
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
      this.dateObj = this.$calendar.setDate(this.currYear + '-' + this.currMonth + '-' + 1)
    },
    changeDate(item) {
      const [year, month, date] = item.dateArray
      this.currYear = year
      this.currMonth = month
      this.currDate = date
    },
    classDate(item) {
      return [{ on: item.dateStr === this.today && item.class == null }, item.class]
    }
  },
  created() {
    this.currView = this.type || 'year'
    this.dateObj = this.setDate ? this.$calendar.setDate(this.setDate) : this.$calendar.setDate()
    this.days = this.setDays || ['일', '월', '화', '수', '목', '금', '토']
    const { fullDate, year, month, date, dates } = this.dateObj
    this.currYear = year
    this.currMonth = month
    this.currDate = date
    this.dates = dates
    this.currFullDate = fullDate
  },
  watch: {
    type(type) {
      this.currView = type || 'year'
    },
    currYear(year) {
      this.dateObj = this.$calendar.setDate(year + '-' + this.currMonth + '-' + this.currDate)
    },
    currMonth(month) {
      console.log(month)
      const monthStr = month > 9 ? month : '0' + month
      this.dateObj = this.$calendar.setDate(this.currYear + '-' + monthStr + '-' + this.currDate)
    },
    currDate(date) {
      const dateStr = date > 9 ? date : '0' + date
      this.dateObj = this.$calendar.setDate(this.currYear + '-' + this.currMonth + '-' + dateStr)
    },
    dateObj(obj) {
      this.dates = obj.dates
      this.currFullDate = obj.fullDate
      this.$emit('result', { today: this.today, fullDate: obj.fullDate })
    }
  }
}
</script>

<style lang="scss"></style>
