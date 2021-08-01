<template>
  <div class="flex">
    <div class="form-group">
      <div class="row">
        <label>display</label>
        <div class="radio-group">
          <label v-for="(item, i) in display" :key="i">
            <i class="material-icons">
              {{ currentDisplay === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentDisplay" :value="item" />
            {{ item }}
          </label>
        </div>
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
      display: ['flex', 'inline-flex'],
      currentDisplay: 'flex'
    }
  },
  computed: {
    style() {
      return `display:${this.currentDisplay};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
