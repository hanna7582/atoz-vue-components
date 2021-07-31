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
import LineChart1 from '@/components/amChart/line/LineChart1.vue'
import LineChart2 from '@/components/amChart/line/LineChart2.vue'
import LineChart3 from '@/components/amChart/line/LineChart3.vue'
import LineChart4 from '@/components/amChart/line/LineChart4.vue'

//Markdown
import LineChart1Md from '@/md/amChart/line/LineChart1.md'
import LineChart2Md from '@/md/amChart/line/LineChart2.md'
import LineChart3Md from '@/md/amChart/line/LineChart3.md'
import LineChart4Md from '@/md/amChart/line/LineChart4.md'

//data
import ChartData from '@/data/amChart/LineChart'

export default {
  components: {
    SelectTab,
    DataEditor,
    LineChart1,
    LineChart2,
    LineChart3,
    LineChart4,
    LineChart1Md,
    LineChart2Md,
    LineChart3Md,
    LineChart4Md
  },
  data() {
    return {
      currentComp: 'LineChart1',
      currentDesc: 'LineChart1Md',
      currentData: ChartData['LineChart1'],
      initData: ChartData['LineChart1'],
      height: {
        LineChart1: '300px',
        LineChart2: '300px',
        LineChart3: '300px',
        LineChart4: '300px'
      }
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'amChart' })
      category = _.find(category.depth3, { name: 'lineChart' }).depth4
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
