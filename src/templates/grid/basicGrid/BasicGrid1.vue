<template>
  <div class="grid">
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
    <div class="grid-container" :style="style">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: ['grid', 'inline-grid'],
      currentDisplay: 'grid'
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
