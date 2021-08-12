# 고정 달력 
- 년 / 월 / 일 별로 고정된 달력 

## Demo Code HTML <button class="btn-toggle-code" id="toggle-code1">Toggle</button>
```html
<!-- FixedDatepickerEx -->
<template>
  <div class="datepicker-ex">
    <FixedDatepickerItem type="year" />
    <FixedDatepickerItem type="month" />
    <FixedDatepickerItem type="date" />
  </div>
</template>

<!-- FixedDatepickerItem -->
<template>
  <div class="flex-container">
    <div class="flex-item">
      <FixedDatepicker :type="type" @result="result" />
    </div>
    <div class="flex-item" v-if="type === 'year'">
      <InputText label="오늘 기준" :value="todayYear" :readonly="true" />
      <InputText label="선택 년도" :value="currYear" :readonly="true" />
    </div>
    <div class="flex-item" v-if="type === 'month'">
      <InputText label="오늘 기준" :value="todayYear + '-' + todayMonth" :readonly="true" />
      <InputText label="선택 년월" :value="currYear + '-' + currMonth" :readonly="true" />
    </div>
    <div class="flex-item" v-if="type === 'date'">
      <InputText label="오늘 기준" :value="today" :readonly="true" />
      <InputText label="선택 날짜" :value="currDate" :readonly="true" />
      <InputText label="이전 7일 ~ 선택 날짜" :value="prev7Date + ' ~ ' + currDate" :readonly="true" />
    </div>
  </div>
</template>
```

## Demo Code JS <button class="btn-toggle-code" id="toggle-code2">Toggle</button>
```javascript
import FixedDatepicker from '@/components/calendar/datepicker/FixedDatepicker'
import InputText from '@/components/common/InputText.vue'
export default {
  components: {
    FixedDatepicker,
    InputText
  },
  props: ['type'],
  data() {
    return {
      today: null,
      todayYear: null,
      todayMonth: null,
      currYear: null,
      currMonth: null,
      currDate: null,
      prev7Date: null
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.todayYear = data.today.split('-')[0]
      this.todayMonth = data.today.split('-')[1]
      this.currDate = data.currDate.fullDate
      this.currYear = data.currDate.year
      this.currMonth = data.currDate.fullDate.split('-')[1]
      this.prev7Date = data.prev7Date
    }
  }
}
```