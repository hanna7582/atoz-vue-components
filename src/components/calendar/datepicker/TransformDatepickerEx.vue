<template>
  <div class="datepicker-ex">
    <div class="flex-container">
      <div class="flex-item">
        <TransformDatepicker :type="currType" @result="result" />
      </div>
      <div class="flex-item">
        <Select label="시작 타입" :value="currType" :options="types" @changeValue="changeValue" />
        <InputText label="오늘 날짜" :value="today" :readonly="true" />
        <InputText label="선택 날짜" :value="currDate" :readonly="true" />
        <InputText label="이전 7일 ~ 선택 날짜" :value="prev7Date + ' ~ ' + currDate" :readonly="true" />
      </div>
    </div>
  </div>
</template>

<script>
import TransformDatepicker from '@/components/calendar/datepicker/TransformDatepicker'
import Select from '@/components/common/Select.vue'
import InputText from '@/components/common/InputText.vue'
export default {
  components: {
    TransformDatepicker,
    Select,
    InputText
  },
  // props: ['type'],
  data() {
    return {
      // type: 'year',
      types: ['year', 'month', 'date'],
      currType: 'year',
      today: null,
      currDate: null,
      prev7Date: null
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.currDate = data.currDate
      this.prev7Date = data.prev7Date
    },
    changeValue(type) {
      this.currType = type
    }
  }
}
</script>

<style lang="scss"></style>
