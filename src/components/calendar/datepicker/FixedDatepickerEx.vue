<template>
  <div class="datepicker-ex">
    <FixedDatepickerItem type="year" />
    <FixedDatepickerItem type="month" />
    <FixedDatepickerItem type="date" />
  </div>
</template>

<script>
import FixedDatepickerItem from '@/components/calendar/datepicker/FixedDatepickerItem'
export default {
  components: {
    FixedDatepickerItem
  }
}
</script>

<style lang="scss"></style>
