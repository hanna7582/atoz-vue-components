<template>
  <div class="datepicker-ex">
    <SingleDatepickerEx type="year" />
    <SingleDatepickerEx type="month" />
    <SingleDatepickerEx type="date" />
    <FixedSingleDatepickerEx type="year" />
    <FixedSingleDatepickerEx type="month" />
    <FixedSingleDatepickerEx type="date" />
  </div>
</template>

<script>
import SingleDatepickerEx from '@/components/calendar/datepicker/SingleDatepickerEx'
import FixedSingleDatepickerEx from '@/components/calendar/datepicker/FixedSingleDatepickerEx'
export default {
  components: {
    SingleDatepickerEx,
    FixedSingleDatepickerEx
  }
}
</script>

<style lang="scss">
.datepicker-ex {
  width: 100%;
}
</style>
