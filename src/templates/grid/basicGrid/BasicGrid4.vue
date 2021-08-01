<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-columns</label>
        <input type="text" v-model="grid_template_columns" />
      </div>
      <div class="row">
        <label>gap</label>
        <input type="text" :value="row_gap + ' ' + column_gap" readonly />
      </div>
      <div class="row">
        <label>row-gap</label>
        <input type="text" v-model="row_gap" />
      </div>
      <div class="row">
        <label>column-gap</label>
        <input type="text" v-model="column_gap" />
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
      grid_template_columns: 'repeat(3, 1fr)',
      row_gap: '10px',
      column_gap: '20px'
    }
  },
  computed: {
    style() {
      return `grid-template-columns:${this.grid_template_columns};
              row-gap:${this.row_gap};
              column-gap:${this.column_gap};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
