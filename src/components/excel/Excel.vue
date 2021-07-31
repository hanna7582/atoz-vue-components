<template>
  <div class="excel">
    <SingleDownload
      :title="title"
      :select="select"
      :unit="selectUnit"
      @excelDownload="excelDownload"
      @changeCurrentSelect="changeCurrentSelect"
    />
    <ExcelTable :data="data" :currentSelect="reCurrentSelect" :thead="thead" :tfoot="tfoot" :unit="tUnit" />
  </div>
</template>

<script>
import SingleDownload from '@/components/excel/SingleDownload'
import ExcelTable from '@/components/excel/ExcelTable'
export default {
  components: {
    SingleDownload,
    ExcelTable
  },
  props: ['data', 'title', 'select', 'selectUnit', 'currentSelect', 'thead', 'tfoot', 'tUnit'],
  data() {
    return {
      reCurrentSelect: this.currentSelect
    }
  },
  methods: {
    excelDownload() {
      this.$emit('excelDownload')
    },
    changeCurrentSelect(value) {
      this.reCurrentSelect = value
    }
  }
}
</script>

<style lang="scss">
.group-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .title {
    font-weight: bold;
  }
  .material-icons {
    font-size: 1rem;
    vertical-align: middle;
  }
}
</style>
