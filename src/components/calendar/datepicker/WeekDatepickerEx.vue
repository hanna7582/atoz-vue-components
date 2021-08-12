<template>
  <div class="datepicker-ex">
    <div class="flex-container">
      <div class="flex-item">
        <WeekDatepicker @result="result" />
      </div>
      <div class="flex-item">
        <InputText label="오늘 날짜" :value="today" :readonly="true" />
        <InputText label="선택 날짜" :value="currDate" :readonly="true" />
      </div>
    </div>
  </div>
</template>

<script>
import WeekDatepicker from '@/components/calendar/datepicker/WeekDatepicker'
import InputText from '@/components/common/InputText.vue'
export default {
  components: {
    WeekDatepicker,
    InputText
  },
  data() {
    return {
      today: null,
      currDate: null
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.currDate = data.currDate
    }
  }
}
</script>

<style lang="scss"></style>
