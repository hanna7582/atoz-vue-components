<template>
  <div class="excel-group">
    <Excel
      :data="data"
      :title="title"
      :select="select"
      :selectUnit="selectUnit"
      :currentSelect="currentSelect"
      :tUnit="tUnit"
      :thead="thead"
      :tfoot="tfoot"
      @excelDownload="excelDownload(data)"
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
      title: '데이터1',
      select: [5, 10, 15, 20],
      selectUnit: '개씩 보기',
      currentSelect: 5,
      colWidth: [70, 80, 80, 80, 80],
      tUnit: '%',
      thead: ['날짜', '전과목 수행률', '이전 7일', '또래 상위', '또래 평균'],
      tfoot: '평균'
    }
  },
  methods: {
    excelDownload(data) {
      let excelTitle =
        '데이터_' + data[0].date.replaceAll('-', '') + '-' + data[data.length - 1].date.replaceAll('-', '')
      let colWidth = ''
      let thead = '<Row>'
      let tbody = ''
      let tfoot = `<Row>
                    <Cell ss:StyleID="Header">
                      <Data ss:Type="String">${this.tfoot}</Data>
                    </Cell>`
      this.colWidth.forEach(data => {
        colWidth += `<Column ss:Width="${data}" /> `
      })

      this.thead.forEach(data => {
        thead += `<Cell ss:StyleID="Header">
                    <Data ss:Type="String">${data}</Data>
                  </Cell> `
      })
      thead += '</Row>'

      data.forEach(tr => {
        tbody += '<Row>'
        for (const key in tr) {
          if (Object.hasOwnProperty.call(tr, key)) {
            if (key == 'date') {
              tbody += `<Cell ss:StyleID="Header">
                         <Data ss:Type="String">${tr[key]}</Data>
                     </Cell>`
            } else {
              if (this.tUnit == '%') {
                tbody += `<Cell ss:StyleID="BodyPercent">
                                  <Data ss:Type="Number">${tr[key] / 100}</Data>
                              </Cell>`
              } else {
                tbody +=
                  typeof tr[key] === 'boolean'
                    ? `<Cell ss:StyleID="Body"><Data ss:Type="String">${tr[key] ? 'O' : 'X'}</Data></Cell>`
                    : `<Cell ss:StyleID="Body"><Data ss:Type="Number">${tr[key]}</Data></Cell>`
              }
            }
          }
        }
        tbody += '</Row>'
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
        ? this.tUnit === '%'
          ? total.map(value => (value / length).toFixed(1))
          : total.map(value => parseInt(value / length))
        : total

      total.forEach(data => {
        if (this.tUnit == '%') {
          tfoot += `<Cell ss:StyleID="TotalPercent"><Data ss:Type="Number">${data / 100}</Data></Cell>`
        } else {
          tfoot += `<Cell ss:StyleID="Total"><Data ss:Type="Number">${data}</Data></Cell>`
        }
      })
      tfoot += '</Row>'

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
          <Worksheet ss:Name="${this.title}">
            <Table>
                ${colWidth}
                ${thead}
                ${tbody}
                ${tfoot}
            </Table>
          </Worksheet>
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
