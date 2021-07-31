<template>
  <div class="contents">
    <SelectTab :category="category" :active="currentComp" @clickTab="changeTab" />
    <div class="contents-main">
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
import BasicLayout1 from '@/templates/grid/basic/BasicLayout1.vue'

//Markdown
import BasicLayout1Md from '@/md/grid/basic/BasicLayout1.md'

export default {
  components: {
    SelectTab,
    BasicLayout1,
    BasicLayout1Md
  },
  data() {
    return {
      currentComp: 'BasicLayout1',
      currentDesc: 'BasicLayout1Md'
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'templates' })
      category = _.find(category.depth2, { name: 'grid' })
      category = _.find(category.depth3, { name: 'basic' }).depth4
      return category
    }
  },
  methods: {
    changeTab(data) {
      this.currentComp = data
      this.currentDesc = data + 'Md'
      this.codeViewToggle()
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
