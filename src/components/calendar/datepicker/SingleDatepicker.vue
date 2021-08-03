<template>
  <div>
    <Datepicker />
  </div>
</template>

<script>
import '@/common/calendar.js'
import Datepicker from '@/components/calendar/datepicker/Datepicker'
export default {
  components: {
    Datepicker
  },
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
