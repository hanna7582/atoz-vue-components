<template>
  <div class="datepicker">
    <div class="datepicker-container week">
      <div class="datepicker-header">
        <button class="title">{{ currYear + ' ' + currMonth }}</button>
        <button class="prev" @click="changeWeek('prev')" v-if="startDate < dateObj[0].dateStr">
          <span class="material-icons-outlined">
            navigate_before
          </span>
        </button>
        <button class="next" @click="changeWeek('next')" v-if="today > dateObj[6].dateStr">
          <span class="material-icons-outlined">
            navigate_next
          </span>
        </button>
      </div>
      <div class="datepicker-body">
        <div class="day" v-for="(day, dayIndex) in days" :key="'days' + dayIndex" :class="classDay(day)">
          {{ day }}
        </div>
        <div
          class="item"
          v-for="item in dateObj"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="item.dateStr <= today && item.dateStr >= startDate ? changeDate(item.dateStr) : ''"
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
  props: ['setDate', 'startDate', 'setDay'],
  data() {
    return {
      currView: null,
      dateObj: null,
      currYear: null,
      currMonth: null,
      selectDate: null
    }
  },
  computed: {
    years() {
      const list = []
      let year = this.dateObj[0].dateArray[0] - 4
      for (let index = 0; index < 9; index++) {
        list.push(year + index)
      }
      return list
    },
    today() {
      return this.$calendar.today()
    },
    days() {
      const days = ['월', '화', '수', '목', '금', '토', '일']
      if (this.setDay) {
        if (this.setDay.value == 0) {
          days.unshift(days.pop())
        }
      }
      return days
    }
  },
  methods: {
    changeWeek(arrow) {
      this.dateObj = this.$calendar.weekDatepicker(this.setDay.value, this.dateObj[0].dateStr, arrow)
    },
    changeDate(date) {
      this.selectDate = date
    },
    classDay(day) {
      let className = ''
      switch (day) {
        case '일':
          className = 'sun'
          break
        case '토':
          className = 'sat'
          break
      }
      return className
    },
    classDate(item) {
      return [
        { disabled: item.dateStr > this.today || item.dateStr < this.startDate },
        { today: item.dateStr === this.today && item.class == null },
        { on: item.dateStr == this.selectDate }
      ]
    }
  },
  created() {
    this.currView = this.type || 'year'
    this.dateObj = this.$calendar.weekDatepicker(this.setDay.value)
    const [year, month] = this.dateObj[0].dateArray
    this.selectDate = this.today
    this.currYear = year
    this.currMonth = month
  },
  watch: {
    dateObj(obj) {
      console.log()
      const [year, month] = obj[0].dateArray
      this.currYear = year
      this.currMonth = month
    },
    selectDate(date) {
      this.$emit('result', { today: this.today, currDate: date })
    },
    setDay(day) {
      this.dateObj = this.$calendar.weekDatepicker(day.value)
    },
    setDate(date) {
      this.dateObj = date
        ? this.$calendar.weekDatepicker(this.setDay.value, date)
        : this.$calendar.weekDatepicker(this.setDay.value)
    }
  }
}
</script>

<style lang="scss"></style>
