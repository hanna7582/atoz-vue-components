<template>
  <div class="datepicker-ex">
    <DatepickerEx currType="year" />
    <DatepickerEx currType="month" />
    <DatepickerEx currType="date" />
  </div>
</template>

<script>
import DatepickerEx from '@/components/calendar/datepicker/DatepickerEx'
export default {
  components: {
    DatepickerEx
  }
}
</script>

<style lang="scss">
.datepicker-ex {
  width: 100%;
}
</style>
