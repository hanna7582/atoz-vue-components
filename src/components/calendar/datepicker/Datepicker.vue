<template>
  <div class="year">
    <div class="datepicker-header">
      <button class="title">{{ currYear }}</button>
      <button class="prev" @click="changeYears('prev')">
        <span class="material-icons-outlined">
          navigate_before
        </span>
      </button>
      <button class="next" @click="changeYears('next')">
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
        @click="changeYear(year)"
      >
        {{ year }}
      </div>
    </div>
  </div>
</template>

<script>
import '@/common/calendar.js'
export default {
  data() {
    return {
      calendar: this.$calendar,
      currYear: 2021
    }
  },
  computed: {
    year() {
      return this.calendar.getYear()
    },
    years() {
      const list = []
      let year = this.currYear - 4
      for (let index = 0; index < 9; index++) {
        list.push(year + index)
      }
      return list
    }
  },
  methods: {
    changeYears(arrow) {
      this.currYear = arrow === 'prev' ? this.currYear - 9 : this.currYear + 9
    },
    changeYear(year) {
      this.currYear = year
    }
  }
}
</script>

<style lang="scss"></style>
