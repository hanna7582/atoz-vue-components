<template>
  <div class="datepicker-ex">
    <div class="flex-container">
      <div class="flex-item">
        <TransformDatepicker
          :setDate="setDate"
          :type="currType"
          mode="multi"
          @result="result"
          @changeSetDate="changeSetDate"
        />
      </div>
      <div class="flex-item">
        <Select label="시작 타입" :value="currType" :options="types" @changeValue="changeValue" />
        <InputText label="오늘 날짜" :value="today" :readonly="true">
          <button slot="button" class="btn" @click="setToday()">오늘 날짜로 가기</button>
        </InputText>
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
  data() {
    return {
      types: ['year', 'month', 'date'],
      currType: 'date',
      today: null,
      currDate: null,
      prev7Date: null,
      setDate: null
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.currDate = data.currDate
      this.prev7Date = data.prev7Date
      this.setDate = data.currDate
    },
    setToday() {
      this.setDate = this.$calendar.today()
    },
    changeValue(type) {
      this.currType = type
    },
    changeSetDate(date) {
      this.setDate = date
    }
  }
}
</script>

<style lang="scss"></style>
