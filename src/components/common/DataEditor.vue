<template>
  <div class="data-editor">
    <div class="btn-group">
      <button class="btn btn-primary" @click="reset">Reset</button>
      <button class="btn btn-sub" @click="reload">Reload</button>
    </div>
    <v-jsoneditor v-model="newData" :height="height" />
  </div>
</template>

<script>
// https://vuejsexamples.com/json-editor-with-vue-js/
import VJsoneditor from 'v-jsoneditor/src/index'
export default {
  components: { VJsoneditor },
  props: ['data', 'height'],
  data() {
    return {
      newData: ''
    }
  },
  methods: {
    reset() {
      this.newData = this.data
      this.reload()
    },
    reload() {
      this.$emit('reloadData', this.newData)
    }
  },
  mounted() {
    this.newData = this.data
  },
  watch: {
    data() {
      this.newData = this.data
    }
  }
}
</script>

<style></style>
