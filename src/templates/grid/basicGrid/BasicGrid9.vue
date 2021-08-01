<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-columns</label>
        <input type="text" v-model="grid_template_columns" />
      </div>
      <div class="row">
        <label>item1</label>
        <input type="text" v-model="item1" />
      </div>
      <div class="row">
        <label>item2</label>
        <input type="text" v-model="item2" />
      </div>
      <div class="row">
        <label>item3</label>
        <input type="text" v-model="item3" />
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item" :style="item1_order">1</div>
      <div class="grid-item" :style="item2_order">2</div>
      <div class="grid-item" :style="item3_order">3</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid_template_columns: 'repeat(3, 1fr)',
      item1: 3,
      item2: 1,
      item3: 2
    }
  },
  computed: {
    style() {
      return `grid-template-columns:${this.grid_template_columns};`
    },
    item1_order() {
      return `order:${this.item1};`
    },
    item2_order() {
      return `order:${this.item2};`
    },
    item3_order() {
      return `order:${this.item3};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
