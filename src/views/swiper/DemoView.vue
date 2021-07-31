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
import DefaultSwiper from '@/components/swiper/demo/DefaultSwiper.vue'
import NavigationSwiper from '@/components/swiper/demo/NavigationSwiper.vue'

//Markdown
import DefaultSwiperMd from '@/md/swiper/demo/DefaultSwiper.md'
import NavigationSwiperMd from '@/md/swiper/demo/NavigationSwiper.md'

export default {
  components: {
    SelectTab,
    DefaultSwiper,
    NavigationSwiper,
    DefaultSwiperMd,
    NavigationSwiperMd
  },
  data() {
    return {
      currentComp: 'DefaultSwiper',
      currentDesc: 'DefaultSwiperMd'
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'swiper' })
      category = _.find(category.depth3, { name: 'demo' }).depth4
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
