<template>
  <div class="datepicker">
    <div class="datepicker-container week">
      <div class="datepicker-header">
        <button class="title">{{ currYear + ' ' + currMonth }}</button>
        <button class="prev" @click="changeWeek('prev')">
          <span class="material-icons-outlined">
            navigate_before
          </span>
        </button>
        <button class="next" @click="changeWeek('next')">
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
          v-for="item in dateObj"
          :key="item.dateStr"
          :class="classDate(item)"
          :data-date="item.dateStr"
          @click="item.dateStr <= today ? changeDate(item.dateStr) : ''"
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
  props: ['setDate'],
  data() {
    return {
      currView: null,
      dateObj: null,
      currYear: null,
      currMonth: null,
      days: null,
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
    }
  },
  methods: {
    changeWeek(arrow) {
      this.dateObj = this.$calendar.weekDatepicker(arrow, this.dateObj[0].dateStr)
    },
    changeDate(date) {
      this.selectDate = date
    },
    classDate(item) {
      return [
        { disabled: item.dateStr > this.today },
        { today: item.dateStr === this.today && item.class == null },
        { on: item.dateStr == this.selectDate }
      ]
    }
  },
  created() {
    this.currView = this.type || 'year'
    this.days = this.setDays || ['월', '화', '수', '목', '금', '토', '일']
    this.dateObj = this.$calendar.weekDatepicker()
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
    setDate(date) {
      this.dateObj = date ? this.$calendar.weekDatepicker(date) : this.$calendar.weekDatepicker()
    }
  }
}
</script>

<style lang="scss"></style>
