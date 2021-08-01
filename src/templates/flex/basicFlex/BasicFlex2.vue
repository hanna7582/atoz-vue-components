<template>
  <div class="flex">
    <div class="form-group">
      <div class="row">
        <label>flex-direction</label>
        <div class="radio-group">
          <label v-for="(item, i) in flexDirection" :key="i">
            <i class="material-icons">
              {{ currentFlexDirection === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentFlexDirection" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>flex-wrap</label>
        <div class="radio-group">
          <label v-for="(item, i) in flexWrap" :key="i">
            <i class="material-icons">
              {{ currentFlexWrap === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentFlexWrap" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>flex-flow</label>
        <input type="text" :value="currentFlexDirection + ' ' + currentFlexWrap" readonly />
      </div>
    </div>
    <div class="flex-container" :style="style">
      <div class="flex-item">1 a</div>
      <div class="flex-item">2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, sunt.</div>
      <div class="flex-item">3 ccc</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
      flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
      currentFlexDirection: 'row',
      currentFlexWrap: 'nowrap'
    }
  },
  computed: {
    style() {
      return `flex-direction:${this.currentFlexDirection};
              flex-wrap:${this.currentFlexWrap}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
