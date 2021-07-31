<template>
  <div class="contents">
    <SelectTab :category="category" :active="currentComp" @clickTab="changeTab" />
    <div class="contents-main">
      <component :is="currentComp" class="example" :data="currentData" />
      <DataEditor :data="initData" @reloadData="reloadData" />
    </div>
    <div class="contents-description">
      <component :is="currentDesc" class="md" v-highlight />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
//components
import SelectTab from '@/components/common/SelectTab.vue'
import SingleExcel from '@/components/excel/SingleExcel'
import MultiExcel from '@/components/excel/MultiExcel'
import DataEditor from '@/components/common/DataEditor'

//Markdown
import SingleExcelMd from '@/md/excel/SingleExcel.md'
import MultiExcelMd from '@/md/excel/MultiExcel.md'

//data
import ChartData from '@/data/excel/Excel'

export default {
  components: {
    SelectTab,
    SingleExcel,
    MultiExcel,
    DataEditor,
    SingleExcelMd,
    MultiExcelMd
  },
  data() {
    return {
      currentComp: 'SingleExcel',
      currentDesc: 'SingleExcelMd',
      currentData: ChartData['SingleExcel'],
      initData: ChartData['SingleExcel']
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'excel' })
      category = _.find(category.depth3, { name: 'download' }).depth4
      return category
    }
  },
  methods: {
    changeTab(data) {
      this.currentComp = data
      this.currentDesc = data + 'Md'
      this.currentData = ChartData[data]
      this.initData = this.currentData
      this.codeViewToggle()
    },
    reloadData(data) {
      this.currentData = data
    },
    codeViewToggle() {
      this.$utils.toggleCodeBlock('toggle-code1')
      this.$utils.toggleCodeBlock('toggle-code2')
    }
  },
  created() {
    const { query } = this.$route
    if (Object.keys(query).length) {
      this.changeTab(query.tab)
    }
  },
  mounted() {
    this.codeViewToggle()
  },
  watch: {
    $route(to) {
      if (Object.keys(to.query).length) {
        this.changeTab(to.query.tab)
      }
    }
  }
}
</script>

<style></style>
