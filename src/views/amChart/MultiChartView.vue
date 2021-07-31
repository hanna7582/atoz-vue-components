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
import SelectTab from '@/components/common/SelectTab'
import DataEditor from '@/components/common/DataEditor'
import MultiChart1 from '@/components/amChart/multi/MultiChart1'
import MultiChart2 from '@/components/amChart/multi/MultiChart2'
import MultiChart3 from '@/components/amChart/multi/MultiChart3'
import MultiChart4 from '@/components/amChart/multi/MultiChart4'

//Markdown
import MultiChart1Md from '@/md/amChart/multi/MultiChart1.md'
import MultiChart2Md from '@/md/amChart/multi/MultiChart2.md'
import MultiChart3Md from '@/md/amChart/multi/MultiChart3.md'
import MultiChart4Md from '@/md/amChart/multi/MultiChart4.md'

//data
import ChartData from '@/data/amChart/MultiChart'

export default {
  components: {
    SelectTab,
    DataEditor,
    MultiChart1,
    MultiChart2,
    MultiChart3,
    MultiChart4,
    MultiChart1Md,
    MultiChart2Md,
    MultiChart3Md,
    MultiChart4Md
  },
  data() {
    return {
      currentComp: 'MultiChart1',
      currentDesc: 'MultiChart1Md',
      currentData: ChartData['MultiChart1'],
      initData: ChartData['MultiChart1'],
      height: {
        MultiChart1: '350px',
        MultiChart2: '400px',
        MultiChart3: '300px',
        MultiChart4: '300px'
      }
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'amChart' })
      category = _.find(category.depth3, { name: 'multiChart' }).depth4
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
