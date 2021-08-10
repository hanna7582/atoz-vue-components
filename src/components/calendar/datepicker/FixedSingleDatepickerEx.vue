<template>
  <div class="flex-container">
    <div class="flex-item">
      <FixedDatepicker :type="type" class="datepicker" @result="result" />
    </div>
    <div class="flex-item" v-if="type === 'year'">
      <div class="row">
        <label>오늘 기준</label>
        <input type="text" :value="todayYear" readonly />
      </div>
      <div class="row">
        <label>선택 년도</label>
        <input type="text" :value="currYear" readonly />
      </div>
    </div>
    <div class="flex-item" v-if="type === 'month'">
      <div class="row">
        <label>오늘 기준</label>
        <input type="text" :value="todayYear + '-' + todayMonth" readonly />
      </div>
      <div class="row">
        <label>선택 년/월</label>
        <input type="text" :value="currYear + '-' + currMonth" readonly />
      </div>
    </div>
    <div class="flex-item" v-if="type === 'date'">
      <div class="row">
        <label>오늘 기준</label>
        <input type="text" :value="today" readonly />
      </div>
      <div class="row">
        <label>선택 날짜</label>
        <input type="text" :value="currDate" readonly />
      </div>
      <div class="row">
        <label>이전 7일 ~ 선택 날짜</label>
        <input type="text" :value="prev7Date + ' ~ ' + currDate" readonly />
      </div>
    </div>
  </div>
</template>

<script>
import FixedDatepicker from '@/components/calendar/datepicker/FixedDatepicker'
export default {
  components: {
    FixedDatepicker
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
</script>

<style lang="scss"></style>
