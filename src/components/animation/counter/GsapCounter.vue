<template>
  <div class="gsap-counter">
    <div class="row">
      <label for="">기본 : </label>
      <GsapCounterComp data="100" unit="%" duration="3" />
    </div>
    <div class="row">
      <label for="">변경 : </label>
      <input type="text" v-model="changeNum" size="4" placeholder="숫자 입력" style="margin-right: 10px;" />
      <GsapCounterComp :data="changeNum" unit="개" duration="1" />
    </div>
  </div>
</template>

<script>
import GsapCounterComp from '@/components/animation/counter/GsapCounterComp'
export default {
  components: {
    GsapCounterComp
  },
  data() {
    return {
      changeNum: 0
    }
  }
}
</script>

<style></style>
