# 주간 달력
- 해당 주차의 날짜를 보여주는 달력

## 옵션
- 시작요일 변경 : 일요일 또는 월요일
- 시작 기준 날짜 이후는 선택 불가

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<template>
  <div class="datepicker-ex">
    <div class="flex-container">
      <div class="flex-item">
        <WeekDatepicker @result="result" :startDate="startDate" :setDay="currDay" />
      </div>
      <div class="flex-item">
        <Select label="시작 요일" :value="currDay" :options="types" @changeValue="val => (currDay = val)" />
        <InputText label="시작 기준 날짜" :value="startDate" @changeValue="val => (startDate = val)" />
        <InputText label="오늘 날짜" :value="today" :readonly="true" />
        <InputText label="선택 날짜" :value="currDate" :readonly="true" />
      </div>
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
import WeekDatepicker from '@/components/calendar/datepicker/WeekDatepicker'
import Select from '@/components/common/Select.vue'
import InputText from '@/components/common/InputText.vue'
export default {
  components: {
    WeekDatepicker,
    Select,
    InputText
  },
  data() {
    return {
      types: [
        { name: '일', value: 0 },
        { name: '월', value: 1 }
      ],
      currDay: { name: '월', value: 1 },
      today: null,
      currDate: null,
      startDate: '2021-08-01'
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.currDate = data.currDate
    }
  }
}
```