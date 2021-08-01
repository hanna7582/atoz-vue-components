<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-areas</label>
        <input type="text" v-model="grid_template_areas" />
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item header">header</div>
      <div class="grid-item sidebar-a">sidebar-a</div>
      <div class="grid-item main-content">main-content</div>
      <div class="grid-item sidebar-b">sidebar-b</div>
      <div class="grid-item footer">footer</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid_template_areas: '"header header header" "a main b" ". . ." "footer footer footer"',
      gap: '10px'
    }
  },
  computed: {
    style() {
      return `grid-template-areas:${this.grid_template_areas};
              gap:${this.gap};`
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
}
.sidebar-a {
  grid-area: a;
}
.main-content {
  grid-area: main;
}
.sidebar-b {
  grid-area: b;
}
.footer {
  grid-area: footer;
}
</style>
