<template>
  <div class="row">
    <label>{{ label }}</label>
    <input type="text" v-model="currValue" :readonly="readonly" />
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'readonly'],
  data() {
    return {
      currValue: this.value
    }
  },
  watch: {
    value(value) {
      this.currValue = value
    },
    currValue(value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style></style>
