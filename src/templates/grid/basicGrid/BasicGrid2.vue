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
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel molestias mollitia nemo asperiores quis
        ut, aliquid totam obcaecati.
      </div>
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
      grid_template_rows: 'repeat(3, minmax(60px, auto))',
      grid_template_columns: '20% 1fr 0.5fr'
    }
  },
  computed: {
    style() {
      return `grid-template-rows:${this.grid_template_rows};
              grid-template-columns:${this.grid_template_columns};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
