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
import TransformDatepicker from '@/components/calendar/datepicker/TransformDatepickerEx'
import FixedDatepicker from '@/components/calendar/datepicker/FixedDatepickerEx'
import MultiDatepicker from '@/components/calendar/datepicker/MultiDatepickerEx'
import WeekDatepicker from '@/components/calendar/datepicker/WeekDatepickerEx'
// import WeeksDatepicker from '@/components/calendar/datepicker/WeeksDatepickerEx'

//Markdown
import TransformDatepickerMd from '@/md/calendar/datepicker/TransformDatepicker.md'
import FixedDatepickerMd from '@/md/calendar/datepicker/FixedDatepicker.md'
import MultiDatepickerMd from '@/md/calendar/datepicker/MultiDatepicker.md'
import WeekDatepickerMd from '@/md/calendar/datepicker/WeekDatepicker.md'
// import WeeksDatepickerMd from '@/md/calendar/datepicker/WeeksDatepicker.md'

export default {
  components: {
    SelectTab,
    TransformDatepicker,
    FixedDatepicker,
    MultiDatepicker,
    WeekDatepicker,
    TransformDatepickerMd,
    FixedDatepickerMd,
    MultiDatepickerMd,
    WeekDatepickerMd
  },
  data() {
    return {
      currentComp: 'TransformDatepicker',
      currentDesc: 'TransformDatepickerMd'
    }
  },
  computed: {
    category() {
      let category = _.find(this.$categoryList, { name: 'components' })
      category = _.find(category.depth2, { name: 'calendar' })
      category = _.find(category.depth3, { name: 'datepicker' }).depth4
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
