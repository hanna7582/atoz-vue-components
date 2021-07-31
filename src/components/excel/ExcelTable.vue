<template>
  <div>
    <table class="table" id="table">
      <colgroup>
        <col v-for="i in thead" :key="'col_' + i" :width="100 / thead.length + '%'" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(th, i) in thead" :key="'thead_' + i" v-html="th"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in sortData[currPage - 1]" :key="'tbody_' + i">
          <td v-for="(td, key) in tr" :key="key" :class="{ th: key === 'date' }">
            <template v-if="key === 'date'">{{ td | filterValueCheck }}</template>
            <template v-else>{{ tdDataCheck(td) | filterValueCheck(unit) }}</template>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>{{ tfoot }}</th>
          <td v-for="(td, i) in totalData" :key="'tfoot_' + i">{{ td | filterValueCheck(unit) }}</td>
        </tr>
      </tfoot>
    </table>
    <paginate
      v-model="currPage"
      :page-count="sortData.length"
      :page-range="size"
      :active-class="'on'"
      :disabled-class="''"
      :prev-text="'navigate_before'"
      :next-text="'navigate_next'"
      :prev-link-class="'material-icons-outlined'"
      :next-link-class="'material-icons-outlined'"
      :click-handler="pageChanged"
      :container-class="'paging'"
    ></paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  components: {
    Paginate
  },
  props: ['data', 'currentSelect', 'thead', 'tfoot', 'unit'],
  data() {
    return {
      sortData: [],
      currPage: 1,
      size: 5,
      totalData: []
    }
  },
  methods: {
    tdDataCheck(data) {
      return typeof data == 'boolean' ? (data ? 'O' : 'X') : data
    },
    changeSortData(size) {
      const arr = [...this.data]
      const len = arr.length
      if (size == 0) {
        this.sortData[0] = arr
      } else {
        const cnt = Math.floor(len / size) + (Math.floor(len % size) > 0 ? 1 : 0)
        this.sortData = []
        for (let index = 0; index < cnt; index++) {
          this.sortData.push(arr.splice(0, size))
        }
      }
      this.changeTotalData(1)
    },
    changeTotalData(page) {
      const length = this.sortData[page - 1].length
      const total = []
      let isAvg = true
      this.sortData[page - 1].forEach(tr => {
        let objectIndex = 0
        for (const key in tr) {
          if (total[objectIndex] === undefined) total[objectIndex] = 0
          if (Object.hasOwnProperty.call(tr, key)) {
            if (key !== 'date') {
              if (typeof tr[key] === 'boolean') {
                isAvg = false
                total[objectIndex++] += tr[key] ? 1 : 0
              } else {
                total[objectIndex++] += tr[key]
              }
            }
          }
        }
        objectIndex = 0
      })
      this.totalData = isAvg
        ? this.unit === '%'
          ? total.map(value => (value / length).toFixed(1))
          : total.map(value => parseInt(value / length))
        : total
    },
    pageChanged(pageNum) {
      if (pageNum == 1) this.currPage = 1
      this.changeTotalData(pageNum)
    }
  },
  mounted() {
    this.changeSortData(this.currentSelect)
  },
  watch: {
    currentSelect(newValue) {
      this.currPage = 1
      this.changeSortData(newValue)
    },
    data() {
      this.currPage = 1
      this.changeSortData(5)
    }
  }
}
</script>

<style lang="scss">
.excel {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-weight: bold;
    }
    select {
      padding: 0.5rem;
      margin-right: 10px;
    }
    .material-icons {
      font-size: 1rem;
      vertical-align: middle;
    }
  }

  table {
    width: 100%;
    td {
      text-align: center;
    }
  }
}
</style>
