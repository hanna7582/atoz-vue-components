<template>
  <div class="contents">
    <SelectTab :category="category" :active="currentComp" @clickTab="changeTab" />
    <div class="contents-main">
      <component :is="currentComp" :data="currentData" :style="'height:' + height[currentComp]" />
      <DataEditor :data="initData" :height="height[currentComp]" @reloadData="reloadData" />
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
import DataEditor from '@/components/common/DataEditor'
import BarChart1 from '@/components/atozChart/bar/BarChart1.vue'

//Markdown
import BarChart1Md from '@/md/atozChart/bar/BarChart1.md'

//data
import ChartData from '@/data/atozChart/BarChart'

export default {
  components: {
    SelectTab,
    DataEditor,
    BarChart1,
    BarChart1Md
  },
  data() {
    return {
      currentComp: 'BarChart1',
      currentDesc: 'BarChart1Md',
      currentData: ChartData['BarChart1'],
      initData: ChartData['BarChart1'],
      height: {
        BarChart1: '250px'
      }
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'atozChart' })
      category = _.find(category.depth3, { name: 'atozBarChart' }).depth4
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
