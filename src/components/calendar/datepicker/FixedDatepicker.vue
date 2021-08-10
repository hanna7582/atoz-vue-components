<template>
  <div :class="mode">
    <div class="datepicker-container date" v-if="mode === 'multi' && prevDateObj">
      <div class="datepicker-header">
        <button class="title">{{ prevDateObj.year + ' ' + prevDateObj.month }}</button>
      </div>
      <div class="datepicker-body">
        <div class="day" v-for="(day, dayIndex) in days" :key="'days' + dayIndex">
          {{ day }}
        </div>
        <div
          class="item"
          v-for="item in prevDateObj.dates"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="item.dateStr <= today ? changeDate(item, item.dateStr) : ''"
        >
          {{ item.dateArray[2] }}
        </div>
      </div>
    </div>
    <div class="datepicker-container year" v-if="type === 'year'">
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
    <div class="datepicker-container month" v-if="type === 'month'">
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
          @click="changeView('date', month)"
        >
          {{ month }}
        </div>
      </div>
    </div>
    <div class="datepicker-container date" v-if="type === 'date'">
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
        <div class="day" v-for="(day, dayIndex) in days" :key="'days' + dayIndex">
          {{ day }}
        </div>
        <div
          class="item"
          v-for="item in dateObj.dates"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="item.dateStr <= today ? changeDate(item, item.dateStr) : ''"
        >
          {{ item.dateArray[2] }}
        </div>
      </div>
    </div>
    <div class="datepicker-container date" v-if="mode === 'multi' && nextDateObj">
      <div class="datepicker-header">
        <button class="title">{{ nextDateObj.year + ' ' + nextDateObj.month }}</button>
      </div>
      <div class="datepicker-body">
        <div class="day" v-for="(day, dayIndex) in days" :key="'days' + dayIndex">
          {{ day }}
        </div>
        <div
          class="item"
          v-for="item in nextDateObj.dates"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="item.dateStr <= today ? changeDate(item, item.dateStr) : ''"
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
  props: ['mode', 'type', 'setDate', 'setDays'],
  data() {
    return {
      prevDateObj: null,
      nextDateObj: null,
      dateObj: null,
      currYear: null,
      currMonth: null,
      currDate: null,
      selectDate: null,
      days: null,
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
      if (type === 'month') {
        if (value) this.currYear = value
      } else if (type === 'date') {
        this.currMonth = value
      }
      this.selectDate =
        this.currYear +
        '-' +
        this.$calendar.addZero(this.currMonth) +
        '-' +
        this.$calendar.addZero(this.currDate)
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
    changeDate(item, date) {
      if (item) {
        const [year, month, date] = item.dateArray
        this.currYear = year
        this.currMonth = month
        this.currDate = date
      }
      this.selectDate = date
      const currDate = new Date(date)
      currDate.setDate(currDate.getDate() - 6)
      this.prev7Date = this.$calendar.setDate(currDate).fullDate
    },
    classDate(item) {
      return [
        { disabled: item.dateStr > this.today },
        { today: item.dateStr === this.today && item.class == null },
        { on: item.dateStr <= this.selectDate && item.dateStr >= this.prev7Date },
        item.class
      ]
    }
  },
  created() {
    this.dateObj = this.setDate ? this.$calendar.setDate(this.setDate) : this.$calendar.setDate()
    this.days = this.setDays || ['일', '월', '화', '수', '목', '금', '토']
    const { fullDate, year, month, date } = this.dateObj
    this.selectDate = fullDate
    this.currYear = year
    this.currMonth = month
    this.currDate = date
  },
  watch: {
    currYear(year) {
      this.dateObj = this.$calendar.setDate(year + '-' + this.currMonth + '-' + this.currDate)
      // this.$emit('result', { today: this.today, currDate: this.dateObj })
    },
    currMonth(month) {
      const monthStr = month > 9 ? month : '0' + month
      this.dateObj = this.$calendar.setDate(this.currYear + '-' + monthStr + '-' + this.currDate)
      // this.$emit('result', { today: this.today, currDate: this.dateObj })
    },
    currDate(date) {
      const dateStr = date > 9 ? date : '0' + date
      this.dateObj = this.$calendar.setDate(this.currYear + '-' + this.currMonth + '-' + dateStr)
    },
    dateObj(obj) {
      this.dates = obj.dates
      const prevMonth = obj.fullDate ? new Date(obj.fullDate) : new Date()
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      this.prevDateObj = this.$calendar.setDate(prevMonth)

      const nextMonth = obj.fullDate ? new Date(obj.fullDate) : new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.nextDateObj = this.$calendar.setDate(nextMonth)
    },
    selectDate(date) {
      this.changeDate(null, date)
      this.$emit('result', { today: this.today, currDate: this.dateObj, prev7Date: this.prev7Date })
    },
    setDate(date) {
      this.dateObj = date ? this.$calendar.setDate(date) : this.$calendar.setDate()
    }
  }
}
</script>

<style lang="scss"></style>
