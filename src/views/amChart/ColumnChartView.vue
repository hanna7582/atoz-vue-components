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
import ColumnChart1 from '@/components/amChart/column/ColumnChart1.vue'
import ColumnChart2 from '@/components/amChart/column/ColumnChart2.vue'
import ColumnChart3 from '@/components/amChart/column/ColumnChart3.vue'
import ColumnChart4 from '@/components/amChart/column/ColumnChart4.vue'
import ColumnChart5 from '@/components/amChart/column/ColumnChart5.vue'
import ColumnChart6 from '@/components/amChart/column/ColumnChart6.vue'
import ColumnChart7 from '@/components/amChart/column/ColumnChart7.vue'

//Markdown
import ColumnChart1Md from '@/md/amChart/column/ColumnChart1.md'
import ColumnChart2Md from '@/md/amChart/column/ColumnChart2.md'
import ColumnChart3Md from '@/md/amChart/column/ColumnChart3.md'
import ColumnChart4Md from '@/md/amChart/column/ColumnChart4.md'
import ColumnChart5Md from '@/md/amChart/column/ColumnChart5.md'
import ColumnChart6Md from '@/md/amChart/column/ColumnChart6.md'
import ColumnChart7Md from '@/md/amChart/column/ColumnChart7.md'

//data
import ChartData from '@/data/amChart/ColumnChart'

export default {
  components: {
    SelectTab,
    DataEditor,
    ColumnChart1,
    ColumnChart2,
    ColumnChart3,
    ColumnChart4,
    ColumnChart5,
    ColumnChart6,
    ColumnChart7,
    ColumnChart1Md,
    ColumnChart2Md,
    ColumnChart3Md,
    ColumnChart4Md,
    ColumnChart5Md,
    ColumnChart6Md,
    ColumnChart7Md
  },
  data() {
    return {
      currentComp: 'ColumnChart1',
      currentDesc: 'ColumnChart1Md',
      currentData: ChartData['ColumnChart1'],
      initData: ChartData['ColumnChart1'],
      height: {
        ColumnChart1: '300px',
        ColumnChart2: '300px',
        ColumnChart3: '300px',
        ColumnChart4: '330px',
        ColumnChart5: '300px',
        ColumnChart6: '400px',
        ColumnChart7: '300px'
      }
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'amChart' })
      category = _.find(category.depth3, { name: 'columnChart' }).depth4
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
