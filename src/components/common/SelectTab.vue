<template>
  <div class="contents-tab">
    <button
      class="btn"
      :class="{ active: active == item.en }"
      v-for="item in category"
      :key="item.en"
      @click="onClickTab(item.en)"
    >
      {{ item.ko }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['category', 'active'],
  methods: {
    onClickTab(data) {
      this.$emit('clickTab', data)
    }
  }
}
</script>

<style></style>
