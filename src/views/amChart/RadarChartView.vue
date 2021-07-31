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
import RadarChart1 from '@/components/amChart/radar/RadarChart1'

//Markdown
import RadarChart1Md from '@/md/amChart/radar/RadarChart1.md'

//data
import ChartData from '@/data/amChart/RadarChart'

export default {
  components: {
    SelectTab,
    DataEditor,
    RadarChart1,
    RadarChart1Md
  },
  data() {
    return {
      currentComp: 'RadarChart1',
      currentDesc: 'RadarChart1Md',
      currentData: ChartData['RadarChart1'],
      initData: ChartData['RadarChart1'],
      height: {
        RadarChart1: '300px'
      }
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'amChart' })
      category = _.find(category.depth3, { name: 'radarChart' }).depth4
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
