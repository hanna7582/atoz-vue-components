<template>
  <div class="flex-container">
    <div class="flex-item">
      <Datepicker :type="currType" class="datepicker" @result="result" />
    </div>
    <div class="flex-item">
      <div class="row">
        <label for="type">시작 타입</label>
        <select v-model="currType" id="type">
          <option v-for="item in type" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="row">
        <label for="today">오늘 날짜</label>
        <input type="text" :value="today" readonly />
      </div>
      <div class="row">
        <label for="type">선택 날짜</label>
        <input type="text" :value="currDate" readonly />
      </div>
      <div class="row">
        <label for="type">이전 7일 ~ 선택 날짜</label>
        <input type="text" :value="prev7Date + ' ~ ' + currDate" readonly />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@/components/calendar/datepicker/Datepicker'
export default {
  components: {
    Datepicker
  },
  props: ['currType'],
  data() {
    return {
      type: ['year', 'month', 'date'],
      // currType: 'year',
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
    }
  }
}
</script>

<style lang="scss"></style>
