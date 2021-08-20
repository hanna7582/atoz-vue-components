# 전환 달력
- 년 / 월 / 일 단계별로 전환되는 달력

## 달력 전환하기
- 년 달력이 보이는 경우 
  - 하단 9개의 년도 중 선택시 월 달력으로 전환
- 월 달력이 보이는 경우 
  - 하단 12개의 월 중 선택시 일 달력으로 전환
  - 상단 년도 선택시 년 달력으로 전환
- 일 달력이 보이는 경우 
  - 상단 년월 선택시 월 달력으로 전환 

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
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
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
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
```