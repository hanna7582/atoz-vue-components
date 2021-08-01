<template>
  <div class="flex">
    <div class="form-group">
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
    <div class="flex-container" :style="style">
      <div class="flex-item" :style="item1_order">1</div>
      <div class="flex-item" :style="item2_order">2</div>
      <div class="flex-item" :style="item3_order">3</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item1: 3,
      item2: 1,
      item3: 2
    }
  },
  computed: {
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
