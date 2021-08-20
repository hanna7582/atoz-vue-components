<template>
  <div class="row">
    <label>{{ label }}</label>
    <select v-model="currValue">
      <option v-for="(item, i) in options" :key="i" :value="item">
        {{ item.name || item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'options'],
  data() {
    return {
      currValue: this.value
    }
  },
  watch: {
    currValue(value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style></style>
