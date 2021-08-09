<template>
  <div class="datepicker-ex">
    <SingleDatepickerEx currType="year" />
    <SingleDatepickerEx currType="month" />
    <SingleDatepickerEx currType="date" />
  </div>
</template>

<script>
import SingleDatepickerEx from '@/components/calendar/datepicker/SingleDatepickerEx'
export default {
  components: {
    SingleDatepickerEx
  }
}
</script>

<style lang="scss">
.datepicker-ex {
  width: 100%;
}
</style>
