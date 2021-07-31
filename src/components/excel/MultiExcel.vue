<template>
  <div class="excel-group">
    <div class="group-top">
      <div class="title">데이터 그룹</div>
      <button class="btn btn-primary" @click="excelDownload('multi', data, dataGroup)">
        <i class="material-icons">file_download</i>전체 다운로드
      </button>
    </div>

    <Excel
      v-for="(item, i) in dataGroup"
      :key="i"
      :data="data[i]"
      :title="item.title"
      :select="select"
      :selectUnit="selectUnit"
      :currentSelect="currentSelect"
      :tUnit="item.tUnit"
      :thead="item.thead"
      :tfoot="item.tfoot"
      @excelDownload="excelDownload('single', data[i], dataGroup, i)"
    />
  </div>
</template>

<script>
import Excel from '@/components/excel/Excel'
export default {
  components: {
    Excel
  },
  props: ['data'],
  data() {
    return {
      date: '20210401-20210409',
      select: [5, 10, 15, 20],
      selectUnit: '개씩 보기',
      currentSelect: 5,
      dataGroup: [
        {
          title: '데이터1',
          colWidth: [70, 80, 80, 80, 80],
          tUnit: '%',
          thead: ['날짜', '전과목 수행률', '이전 7일', '또래 상위', '또래 평균'],
          tfoot: '평균'
        },
        {
          title: '데이터2',
          colWidth: [70, 80, 80, 80, 80],
          tUnit: '',
          thead: ['날짜', '학습 계획일', '출석일', '출석 또래 상위', '출석 또래 평균'],
          tfoot: '합계'
        },
        {
          title: '데이터3',
          colWidth: [70, 80, 90, 80, 130, 140, 130],
          tUnit: '',
          thead: [
            '날짜',
            '일찍 했어요',
            '계획대로 했어요',
            '나중에 했어요',
            '이전 7일 일찍했어요',
            '이전 7일 계획대로 했어요',
            '이전 7일 나중에 했어요'
          ],
          tfoot: '평균'
        }
      ]
    }
  },
  methods: {
    excelDownloadSet(data, title, colWidth, tUnit, thead, tfoot) {
      let colWidthStr = ''
      let theadStr = '<Row>'
      let tbodyStr = ''
      let tfootStr = `<Row>
                    <Cell ss:StyleID="Header">
                      <Data ss:Type="String">${tfoot}</Data>
                    </Cell>`
      colWidth.forEach(width => {
        colWidthStr += `<Column ss:Width="${width}" /> `
      })

      thead.forEach(th => {
        theadStr += `<Cell ss:StyleID="Header">
                      <Data ss:Type="String">${th}</Data>
                    </Cell> `
      })
      theadStr += '</Row>'

      data.forEach(tr => {
        tbodyStr += '<Row>'
        for (const key in tr) {
          if (Object.hasOwnProperty.call(tr, key)) {
            if (key == 'date') {
              tbodyStr += `<Cell ss:StyleID="Header">
                              <Data ss:Type="String">${tr[key]}</Data>
                          </Cell>`
            } else {
              if (tUnit == '%') {
                tbodyStr += `<Cell ss:StyleID="BodyPercent">
                                  <Data ss:Type="Number">${tr[key] / 100}</Data>
                              </Cell>`
              } else {
                tbodyStr +=
                  typeof tr[key] === 'boolean'
                    ? `<Cell ss:StyleID="Body"><Data ss:Type="String">${tr[key] ? 'O' : 'X'}</Data></Cell>`
                    : `<Cell ss:StyleID="Body"><Data ss:Type="Number">${tr[key]}</Data></Cell>`
              }
            }
          }
        }
        tbodyStr += '</Row>'
      })

      const length = data.length
      let total = []
      let isAvg = true
      data.forEach(tr => {
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
      total = isAvg
        ? tUnit === '%'
          ? total.map(value => (value / length).toFixed(1))
          : total.map(value => parseInt(value / length))
        : total

      total.forEach(td => {
        if (tUnit == '%') {
          tfootStr += `<Cell ss:StyleID="TotalPercent"><Data ss:Type="Number">${td / 100}</Data></Cell>`
        } else {
          tfootStr += `<Cell ss:StyleID="Total"><Data ss:Type="Number">${td}</Data></Cell>`
        }
      })
      tfootStr += '</Row>'

      let worksheet = `
          <Worksheet ss:Name="${title}">
            <Table>
                ${colWidthStr}
                ${theadStr}
                ${tbodyStr}
                ${tfootStr}
            </Table>
          </Worksheet>`

      return worksheet
    },
    excelDownload(type, data, dataGroup, index) {
      let excelTitle = ''
      let worksheet = ''
      if (type === 'single') {
        excelTitle = dataGroup[index].title + '_' + this.date
        worksheet = this.excelDownloadSet(
          data,
          dataGroup[index].title,
          dataGroup[index].colWidth,
          dataGroup[index].tUnit,
          dataGroup[index].thead,
          dataGroup[index].tfoot
        )
      } else {
        excelTitle = '전체_' + this.date
        for (let index = 0; index < data.length; index++) {
          worksheet += this.excelDownloadSet(
            data[index],
            dataGroup[index].title,
            dataGroup[index].colWidth,
            dataGroup[index].tUnit,
            dataGroup[index].thead,
            dataGroup[index].tfoot
          )
        }
      }

      let tab_text = `<?xml version='1.0' encoding='UTF-8'?>
        <?mso-application progid="Excel.Sheet"?>
        <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" 
          xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" 
          xmlns:html="http://www.w3.org/TR/REC-html40">
          <Styles>
            <Style ss:ID="Default" ss:Name="Normal">
              <Alignment ss:Horizontal="Center" ss:Vertical="Center" /> 
              <Font ss:FontName="고딕" ss:Size="10" ss:Color="Black" /> 
              <Interior /> 
              <NumberFormat /> 
              <Protection />
            </Style>
            <Style ss:ID="Header"> 
              <Borders>
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
              </Borders>
              <Font ss:FontName="고딕" ss:Size="10" ss:Color="Black" ss:Bold="1" /> 
              <Interior ss:Color="#d4d4d4" ss:Pattern="Solid" />
            </Style>
            <Style ss:ID="Body"> 
              <Borders>
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
              </Borders>
            </Style>
            <Style ss:ID="BodyPercent"> 
              <Borders>
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
              </Borders>
              <NumberFormat ss:Format="#%" /> 
            </Style>
            <Style ss:ID="TotalPercent"> 
              <Borders>
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
              </Borders>
              <Font ss:FontName="고딕" ss:Size="10" ss:Color="Black" ss:Bold="1" /> 
              <Interior ss:Color="#d4d4d4" ss:Pattern="Solid" />
              <NumberFormat ss:Format="0.0##%" />
            </Style>
            <Style ss:ID="Total"> 
              <Borders>
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
              </Borders>
              <Font ss:FontName="고딕" ss:Size="10" ss:Color="Black" ss:Bold="1" /> 
              <Interior ss:Color="#d4d4d4" ss:Pattern="Solid" />
            </Style>
          </Styles>
          ${worksheet}
        </Workbook>`
      const fileName = excelTitle + '.xls'
      const a_tag = document.createElement('a')
      const blob = new Blob([tab_text], { type: 'application/vnd.ms-excel;charset=utf-8;' })
      a_tag.href = window.URL.createObjectURL(blob)
      a_tag.download = fileName
      a_tag.click()
    }
  }
}
</script>

<style></style>
