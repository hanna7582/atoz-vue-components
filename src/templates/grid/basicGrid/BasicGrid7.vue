<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-rows</label>
        <input type="text" v-model="grid_template_rows" />
      </div>
      <div class="row">
        <label>grid-template-columns</label>
        <input type="text" v-model="grid_template_columns" />
      </div>
      <div class="row">
        <label>grid-auto-flow</label>
        <div class="radio-group">
          <label v-for="(item, i) in grid_auto_flow" :key="i">
            <i class="material-icons">
              {{ currentRadio === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentRadio" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid_template_rows: 'repeat(5, minmax(50px,auto))',
      grid_template_columns: 'repeat(auto-fill, minmax(25%, auto))',
      grid_auto_flow: ['row', 'column', 'dense', 'row dense', 'column dense'],
      currentRadio: 'row'
    }
  },
  computed: {
    style() {
      return `grid-template-rows:${this.grid_template_rows};
              grid-template-columns:${this.grid_template_columns};
              grid-auto-flow:${this.currentRadio}`
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-item:nth-child(2) {
  grid-column: auto / span 3;
}
.grid-item:nth-child(5) {
  grid-column: auto / span 3;
}
.grid-item:nth-child(7) {
  grid-column: auto / span 2;
}
</style>
