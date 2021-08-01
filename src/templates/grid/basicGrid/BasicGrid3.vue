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
        <label>grid-auto-rows</label>
        <input type="text" v-model="grid_auto_rows" />
      </div>
      <div class="row">
        <label>grid-auto-columns</label>
        <input type="text" v-model="grid_auto_columns" />
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item">1</div>
      <div class="grid-item" style="grid-column:3;">2</div>
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
      grid_template_rows: '100px',
      grid_template_columns: '50px',
      grid_auto_rows: 'minmax(50px, auto)',
      grid_auto_columns: '1fr 50px'
    }
  },
  computed: {
    style() {
      return `grid-template-rows:${this.grid_template_rows};
              grid-template-columns:${this.grid_template_columns};
              grid-auto-rows:${this.grid_auto_rows};
              grid-auto-columns:${this.grid_auto_columns};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
