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
import BasicFlex1 from '@/templates/flex/basicFlex/BasicFlex1.vue'
import BasicFlex2 from '@/templates/flex/basicFlex/BasicFlex2.vue'
import BasicFlex3 from '@/templates/flex/basicFlex/BasicFlex3.vue'
import BasicFlex4 from '@/templates/flex/basicFlex/BasicFlex4.vue'
import BasicFlex5 from '@/templates/flex/basicFlex/BasicFlex5.vue'

//Markdown
import BasicFlex1Md from '@/md/flex/basicFlex/BasicFlex1.md'
import BasicFlex2Md from '@/md/flex/basicFlex/BasicFlex2.md'
import BasicFlex3Md from '@/md/flex/basicFlex/BasicFlex3.md'
import BasicFlex4Md from '@/md/flex/basicFlex/BasicFlex4.md'
import BasicFlex5Md from '@/md/flex/basicFlex/BasicFlex5.md'

export default {
  components: {
    SelectTab,
    BasicFlex1,
    BasicFlex2,
    BasicFlex3,
    BasicFlex4,
    BasicFlex5,
    BasicFlex1Md,
    BasicFlex2Md,
    BasicFlex3Md,
    BasicFlex4Md,
    BasicFlex5Md
  },
  data() {
    return {
      currentComp: 'BasicFlex1',
      currentDesc: 'BasicFlex1Md'
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'templates' })
      category = _.find(category.depth2, { name: 'flex' })
      category = _.find(category.depth3, { name: 'basicFlex' }).depth4
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
