<template>
  <div class="search">
    <input
      type="text"
      v-model="searchValue"
      @keyup.enter="search"
      @focus="autoSearchActive(true)"
      @blur="autoSearchActive(false)"
      @keydown.up="tabSearchTargetUp(selectSearchIdx)"
      @keydown.down="tabSearchTargetDown(selectSearchIdx)"
    />
    <ul class="auto-complete" v-if="autoSearchValue.length && selectSearchActive">
      <li
        v-for="(item, idx) in autoSearchValue"
        :key="item[item.length - 1] + idx"
        :class="[idx == selectSearchIdx ? 'active' : '', getAutoSearchName(item)[0] ? 'auto-title' : '']"
        @mousedown="getAutoSearchName(item)[0] ? '' : tabSearch(item)"
      >
        <span v-if="getAutoSearchName(item)[0]">{{ getAutoSearchName(item)[1] }}</span>
        <TextHighlight v-else :queries="searchValue">{{ getAutoSearchName(item)[1] }}</TextHighlight>
      </li>
    </ul>
  </div>
</template>

<script>
import TextHighlight from 'vue-text-highlight'
export default {
  components: {
    TextHighlight
  },
  data() {
    return {
      searchValue: '',
      queries: ['com'],

      autoSearchValue: [], //자동완성에서 일치하는항목들
      autoSearchIndex: [], //자동완성 타이틀들의 인덱스

      selectSearchIdx: 1, //선택된 인덱스
      selectSearchActive: false //자동완성 박스 유무
    }
  },
  methods: {
    search() {
      //enter search
      if (this.autoSearchValue.length) {
        let query = ''
        if (this.autoSearchValue[this.selectSearchIdx].length == 4) {
          query = { tab: this.autoSearchValue[this.selectSearchIdx][3] }
        }
        this.$router
          .push({
            path: '/' + this.autoSearchValue[this.selectSearchIdx].slice(0, 3).join('/'),
            query: query
          })
          .catch(error => {
            if (error.name != 'NavigationDuplicated') {
              throw error
            }
          })
        this.searchValue = ''
      }
    },
    autoSearch() {
      //자동완성되는 항목 검색
      let searchValue = this.searchValue.toLowerCase()
      let params = []
      if (searchValue != '') {
        for (let depth1 of this.$categoryList) {
          if (depth1.name.toLowerCase().includes(searchValue)) {
            params.push([depth1.name])
          }
          depth1.depth2.forEach(item => {
            if (item.name.toLowerCase().includes(searchValue)) {
              params.push([depth1.name, item.name])
            }
          })
          for (let depth2 of depth1.depth2) {
            depth2.depth3.forEach(el => {
              if (el.name.toLowerCase().includes(searchValue)) {
                params.push([depth1.name, depth2.name, el.name])
              }
            })
          }
          for (let depth2 of depth1.depth2) {
            for (let depth3 of depth2.depth3) {
              depth3.depth4.forEach(el => {
                if (el.en.toLowerCase().includes(searchValue)) {
                  params.push([depth1.name, depth2.name, depth3.name, el.en])
                }
              })
            }
          }
        }
      }

      const result = this.highlightSearchHeader(params)
      this.selectSearchIdx = 1
      this.autoSearchValue = result
    },
    highlightSearchHeader(value) {
      //각 카테고리의 마지막 인덱스 계산
      const clusterParams = value.reduce((obj, now, idx) => {
        const title = now[0]
        obj[title] = idx
        return obj
      }, {})

      const clusterParamsArr = Object.entries(clusterParams)
      clusterParamsArr.forEach((item, idx) => {
        if (idx == 0) {
          value.splice(0, 0, [item[0], 'autoTitle'])
        } else {
          value.splice(item[1] + 1, 0, [item[0], 'autoTitle'])
        }
      })
      this.autoSearchIndex = clusterParamsArr
      return value
    },
    getAutoSearchName(item) {
      if (item.length == 2 && item[1] == 'autoTitle') {
        return [true, item[0]]
      } else {
        return [false, item.join(' / ')]
      }
    },
    tabSearch(target) {
      //tab click event
      let query = ''
      if (target.length == 4) {
        query = { tab: target[3] }
      }
      this.$router
        .push({
          path: '/' + target.slice(0, 3).join('/'),
          query: query
        })
        .catch(error => {
          if (error.name != 'NavigationDuplicated') {
            throw error
          }
        })
      this.searchValue = ''
    },
    tabSearchTargetDown(target) {
      //방향키 아래 눌렀을때
      if (target == this.autoSearchValue.length - 1) {
        this.selectSearchIdx = 1
      } else {
        if (this.autoSearchIndex.find((item, idx) => item[1] + 1 == target + 1 && idx != 0)) {
          this.selectSearchIdx += 2
        } else {
          this.selectSearchIdx += 1
        }
      }
    },
    tabSearchTargetUp(target) {
      //방향키 위 눌렀을때
      if (target == 1) {
        this.selectSearchIdx = this.autoSearchValue.length - 1
      } else {
        if (this.autoSearchIndex.find(item => item[1] + 1 == target - 1)) {
          this.selectSearchIdx -= 2
        } else {
          this.selectSearchIdx -= 1
        }
      }
    },
    autoSearchActive(value) {
      this.selectSearchActive = value
    }
  },
  watch: {
    searchValue() {
      this.autoSearch()
    }
  }
}
</script>

<style></style>
