<template>
  <div class="top">
    <div class="title">{{ title }}</div>
    <div class="control">
      <select v-model="currentSelect">
        <option v-for="data in select" :key="data" :value="data">{{ data }}{{ unit }}</option>
      </select>
      <button class="btn btn-primary" @click="excelDownload">
        <i class="material-icons">file_download</i>다운로드
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'select', 'unit'],
  data() {
    return {
      currentSelect: this.select[0]
    }
  },
  methods: {
    excelDownload() {
      this.$emit('excelDownload')
    }
  },
  watch: {
    currentSelect(value) {
      this.$emit('changeCurrentSelect', value)
    }
  }
}
</script>

<style></style>
