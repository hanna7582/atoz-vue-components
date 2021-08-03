<template>
  <div class="contents">
    <SelectTab :category="category" :active="currentComp" @clickTab="changeTab" />
    <div class="contents-main">
      <component :is="currentComp" class="datepicker" :style="'height:' + height[currentComp]" />
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
import SingleDatepicker from '@/components/calendar/datepicker/SingleDatepicker'

//Markdown
import SingleDatepickerMd from '@/md/calendar/datepicker/SingleDatepicker.md'

export default {
  components: {
    SelectTab,
    SingleDatepicker,
    SingleDatepickerMd
  },
  data() {
    return {
      currentComp: 'SingleDatepicker',
      currentDesc: 'SingleDatepickerMd',
      height: {
        BarChart1: '300px'
      }
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

<style lang="scss">
.datepicker {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.14);
  .datepicker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      cursor: pointer;
    }
    .title {
      width: 100%;
      height: 47px;
      order: 2;
      text-align: center;
      font-size: 16px;
    }
    .prev {
      flex: none;
      order: 1;
      padding: 10px;
    }
    .next {
      flex: none;
      order: 3;
      padding: 10px;
    }
  }
  .datepicker-body {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1.2em;
      &:hover {
        background: #fbd2bd;
      }
      &.on {
        background-color: #f26721;
        color: #fff;
      }
    }
  }
}
</style>
