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
    </div>
  </div>
</template>

<script>
import Datepicker from '@/components/calendar/datepicker/Datepicker'
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      type: ['year', 'month', 'date'],
      currType: 'year',
      today: null,
      currDate: null
    }
  },
  methods: {
    result(data) {
      this.today = data.today
      this.currDate = data.fullDate
    }
  }
}
</script>

<style lang="scss">
.datepicker {
  width: 300px;
  height: 300px;
}
.flex-container {
  width: 100%;
  padding: 0;
  background: none;
  flex-wrap: wrap;
}
.flex-item {
  background: white;
  border: none;
  &:nth-child(1) {
    flex: 0;
  }
  &:nth-child(2) {
    flex: 1;
  }
}
</style>
