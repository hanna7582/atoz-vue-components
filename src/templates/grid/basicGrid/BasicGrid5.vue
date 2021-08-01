<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-columns</label>
        <input type="text" v-model="grid_template_columns" />
      </div>
      <div class="row">
        <label>grid-area</label>
        <div class="input-group">
          <input type="text" v-model="grid_area1" />
          <input type="text" v-model="grid_area2" />
          <input type="text" v-model="grid_area3" />
          <input type="text" v-model="grid_area4" />
          <input type="text" v-model="grid_area5" />
          <input type="text" v-model="grid_area6" />
          <input type="text" v-model="grid_area7" />
          <input type="text" v-model="grid_area8" />
          <input type="text" v-model="grid_area9" />
        </div>
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item" :style="item1">1</div>
      <div class="grid-item" :style="item2">2</div>
      <div class="grid-item" :style="item3">3</div>
      <div class="grid-item" :style="item4">4</div>
      <div class="grid-item" :style="item5">5</div>
      <div class="grid-item" :style="item6">6</div>
      <div class="grid-item" :style="item7">7</div>
      <div class="grid-item" :style="item8">8</div>
      <div class="grid-item" :style="item9">9</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid_template_columns: 'repeat(3, 1fr)',
      gap: '20px',
      grid_area1: 'auto /  2 / auto  / 3',
      grid_area2: '1 / 3 / 3 / 4',
      grid_area3: '',
      grid_area4: '',
      grid_area5: '3 / 1 / span 2 / 1',
      grid_area6: 'auto / 3 / auto / auto',
      grid_area7: 'auto / auto  / auto / span 2',
      grid_area8: 'auto / auto  / auto / span 2',
      grid_area9: '6/auto/auto/span 3'
    }
  },
  computed: {
    style() {
      return `grid-template-columns:${this.grid_template_columns};
              gap:${this.gap};`
    },
    item1() {
      return `grid-area:${this.grid_area1}`
    },
    item2() {
      return `grid-area:${this.grid_area2}`
    },
    item3() {
      return `grid-area:${this.grid_area3}`
    },
    item4() {
      return `grid-area:${this.grid_area4}`
    },
    item5() {
      return `grid-area:${this.grid_area5}`
    },
    item6() {
      return `grid-area:${this.grid_area6}`
    },
    item7() {
      return `grid-area:${this.grid_area7}`
    },
    item8() {
      return `grid-area:${this.grid_area8}`
    },
    item9() {
      return `grid-area:${this.grid_area9}`
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
