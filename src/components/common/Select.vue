<template>
  <div class="row">
    <label>{{ label }}</label>
    <select v-model="currType">
      <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'options'],
  data() {
    return {
      currType: this.value
    }
  },
  watch: {
    currType(type) {
      this.$emit('changeType', type)
    }
  }
}
</script>

<style></style>
