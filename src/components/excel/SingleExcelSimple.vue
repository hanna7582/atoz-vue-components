<template>
  <div class="excel">
    <div class="top">
      <div class="title">데이터</div>
      <div class="control">
        <select v-model="currentSelect">
          <option v-for="data in selectData" :key="data" :value="data">{{ data }}개씩 보기</option>
        </select>
        <button class="btn btn-primary" @click="excelDownload">
          <i class="material-icons">file_download</i>다운로드
        </button>
      </div>
    </div>
    <table class="table" id="table">
      <thead>
        <tr>
          <th :style="bg">날짜</th>
          <th :style="bg">전과목 수행률</th>
          <th :style="bg">이전 7일</th>
          <th :style="bg">또래 상위</th>
          <th :style="bg">또래 평균</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in sortData[currPage - 1]" :key="i">
          <th :style="bg">{{ tr.date }}</th>
          <td>{{ tr.data | filterValueCheck('%') }}</td>
          <td>{{ tr.prevData | filterValueCheck('%') }}</td>
          <td>{{ tr.top | filterValueCheck('%') }}</td>
          <td>{{ tr.avg | filterValueCheck('%') }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th :style="bg">평균</th>
          <td :style="bg">{{ totalData.data | filterValueCheck('%') }}</td>
          <td :style="bg">{{ totalData.prevData | filterValueCheck('%') }}</td>
          <td :style="bg">{{ totalData.top | filterValueCheck('%') }}</td>
          <td :style="bg">{{ totalData.avg | filterValueCheck('%') }}</td>
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
    <table id="excel" v-show="false">
      <thead>
        <tr>
          <th :style="bg">날짜</th>
          <th :style="bg">전과목 수행률</th>
          <th :style="bg">이전 7일</th>
          <th :style="bg">또래 상위</th>
          <th :style="bg">또래 평균</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in data" :key="i">
          <th :style="bg">{{ tr.date }}</th>
          <td>{{ tr.data | filterValueCheck('%') }}</td>
          <td>{{ tr.prevData | filterValueCheck('%') }}</td>
          <td>{{ tr.top | filterValueCheck('%') }}</td>
          <td>{{ tr.avg | filterValueCheck('%') }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th :style="bg">평균</th>
          <td :style="bg">{{ excelTotalData.data | filterValueCheck('%') }}</td>
          <td :style="bg">{{ excelTotalData.prevData | filterValueCheck('%') }}</td>
          <td :style="bg">{{ excelTotalData.top | filterValueCheck('%') }}</td>
          <td :style="bg">{{ excelTotalData.avg | filterValueCheck('%') }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  components: {
    Paginate
  },
  props: ['data'],
  data() {
    return {
      selectData: [5, 10, 20],
      currentSelect: 5,
      bg: 'background-color: #d4d4d4;',
      sortData: [],
      currPage: 1,
      size: 5,
      totalData: {
        data: 0,
        prevData: 0,
        top: 0,
        avg: 0
      }
    }
  },
  computed: {
    title() {
      return (
        '데이터_' +
        this.data[0].date.replaceAll('-', '') +
        '-' +
        this.data[this.data.length - 1].date.replaceAll('-', '')
      )
    },
    excelTotalData() {
      const length = this.data.length
      const total = {
        data: 0,
        prevData: 0,
        top: 0,
        avg: 0
      }
      this.data.forEach(tr => {
        total.data += tr.data
        total.prevData += tr.prevData
        total.top += tr.top
        total.avg += tr.avg
      })
      return {
        data: (total.data / length).toFixed(1),
        prevData: (total.prevData / length).toFixed(1),
        top: (total.top / length).toFixed(1),
        avg: (total.avg / length).toFixed(1)
      }
    }
  },
  methods: {
    excelDownload() {
      this.changeSortData(0)
      const temp = document.getElementById('excel').innerHTML
      let tab_text = `<html xmlns:x="urn:schemas-microsoft-com:office:excel">
                      <head>
                        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
                        <style>th,td{border-top: 1px solid #343a40;}</style>
                      </head>
                      <body>
                        <xml>
                          <x:ExcelWorkbook>
                            <x:ExcelWorksheets>
                              <x:ExcelWorksheet>
                                <x:Name>데이터1</x:Name>
                                <x:WorksheetOptions>
                                  <x:Panes></x:Panes>
                                </x:WorksheetOptions>
                              </x:ExcelWorksheet>
                            </x:ExcelWorksheets>
                          </x:ExcelWorkbook>
                        </xml>
                        <table>${temp}</table>
                      </body>
                      </html>`
      const fileName = this.title + '.xls'
      const a_tag = document.createElement('a')
      const blob = new Blob([tab_text], { type: 'application/vnd.ms-excel;charset=utf-8;' })
      a_tag.href = window.URL.createObjectURL(blob)
      a_tag.download = fileName
      a_tag.click()
      this.changeSortData(5)
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
      const total = {
        data: 0,
        prevData: 0,
        top: 0,
        avg: 0
      }
      this.sortData[page - 1].forEach(tr => {
        total.data += tr.data
        total.prevData += tr.prevData
        total.top += tr.top
        total.avg += tr.avg
      })
      this.totalData.data = (total.data / length).toFixed(1)
      this.totalData.prevData = (total.prevData / length).toFixed(1)
      this.totalData.top = (total.top / length).toFixed(1)
      this.totalData.avg = (total.avg / length).toFixed(1)
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
      text-align: right;
    }
  }
}
</style>
