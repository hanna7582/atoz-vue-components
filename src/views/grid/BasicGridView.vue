<template>
  <div class="contents">
    <SelectTab :category="category" :active="currentComp" @clickTab="changeTab" />
    <div class="contents-main templates">
      <component :is="currentComp" />
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
import BasicGrid1 from '@/templates/grid/basicGrid/BasicGrid1.vue'
import BasicGrid2 from '@/templates/grid/basicGrid/BasicGrid2.vue'
import BasicGrid3 from '@/templates/grid/basicGrid/BasicGrid3.vue'
import BasicGrid4 from '@/templates/grid/basicGrid/BasicGrid4.vue'
import BasicGrid5 from '@/templates/grid/basicGrid/BasicGrid5.vue'
import BasicGrid6 from '@/templates/grid/basicGrid/BasicGrid6.vue'
import BasicGrid7 from '@/templates/grid/basicGrid/BasicGrid7.vue'
import BasicGrid8 from '@/templates/grid/basicGrid/BasicGrid8.vue'
import BasicGrid9 from '@/templates/grid/basicGrid/BasicGrid9.vue'

//Markdown
import BasicGrid1Md from '@/md/grid/basicGrid/BasicGrid1.md'
import BasicGrid2Md from '@/md/grid/basicGrid/BasicGrid2.md'
import BasicGrid3Md from '@/md/grid/basicGrid/BasicGrid3.md'
import BasicGrid4Md from '@/md/grid/basicGrid/BasicGrid4.md'
import BasicGrid5Md from '@/md/grid/basicGrid/BasicGrid5.md'
import BasicGrid6Md from '@/md/grid/basicGrid/BasicGrid6.md'
import BasicGrid7Md from '@/md/grid/basicGrid/BasicGrid7.md'
import BasicGrid8Md from '@/md/grid/basicGrid/BasicGrid8.md'
import BasicGrid9Md from '@/md/grid/basicGrid/BasicGrid9.md'

export default {
  components: {
    SelectTab,
    BasicGrid1,
    BasicGrid2,
    BasicGrid3,
    BasicGrid4,
    BasicGrid5,
    BasicGrid6,
    BasicGrid7,
    BasicGrid8,
    BasicGrid9,
    BasicGrid1Md,
    BasicGrid2Md,
    BasicGrid3Md,
    BasicGrid4Md,
    BasicGrid5Md,
    BasicGrid6Md,
    BasicGrid7Md,
    BasicGrid8Md,
    BasicGrid9Md
  },
  data() {
    return {
      currentComp: 'BasicGrid1',
      currentDesc: 'BasicGrid1Md'
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'templates' })
      category = _.find(category.depth2, { name: 'grid' })
      category = _.find(category.depth3, { name: 'basicGrid' }).depth4
      return category
    }
  },
  methods: {
    changeTab(data) {
      this.currentComp = data
      this.currentDesc = data + 'Md'
    }
  },
  created() {
    const { query } = this.$route
    if (Object.keys(query).length) {
      this.changeTab(query.tab)
    }
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
