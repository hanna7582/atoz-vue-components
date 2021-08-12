<template>
  <div class="row">
    <label>{{ label }}</label>
    <input type="text" :value="value" :readonly="readonly" />
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'readonly']
}
</script>

<style></style>
