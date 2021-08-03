import Vue from 'vue'
const category = [
  {
    name: 'components',
    depth2: [
      {
        name: 'amChart',
        depth3: [
          {
            name: 'barChart',
            depth4: [
              { en: 'BarChart1', ko: '비교차트' },
              { en: 'BarChart2', ko: '정렬차트' },
              { en: 'BarChart3', ko: '범례라디오차트' }
            ]
          },
          {
            name: 'columnChart',
            depth4: [
              { en: 'ColumnChart1', ko: '순위차트' },
              { en: 'ColumnChart2', ko: '범례컬럼차트' },
              { en: 'ColumnChart3', ko: '스택차트' },
              { en: 'ColumnChart4', ko: '이중차트' },
              { en: 'ColumnChart5', ko: '비교차트' },
              { en: 'ColumnChart6', ko: '스택/클러스터차트' },
              { en: 'ColumnChart7', ko: '스택/클러스터 라디오차트' }
            ]
          },
          {
            name: 'lineChart',
            depth4: [
              { en: 'LineChart1', ko: '라인차트' },
              { en: 'LineChart2', ko: '멀티라인차트' },
              { en: 'LineChart3', ko: '범례라디오차트(퍼센트)' },
              { en: 'LineChart4', ko: '범례라디오차트(시간)' }
            ]
          },
          {
            name: 'multiChart',
            depth4: [
              { en: 'MultiChart1', ko: '라인컬럼차트' },
              { en: 'MultiChart2', ko: '범례토글차트' },
              { en: 'MultiChart3', ko: '스택라인차트' },
              { en: 'MultiChart4', ko: '최대/최소값변경' }
            ]
          },
          { name: 'pieChart', depth4: [{ en: 'PieChart1', ko: '범례파이차트' }] },
          { name: 'radarChart', depth4: [{ en: 'RadarChart1', ko: '방사형차트' }] }
        ]
      },
      {
        name: 'calendar',
        depth3: [
          {
            name: 'datepicker',
            depth4: [
              { en: 'SingleDatepicker', ko: '달력' },
              { en: 'WeeksDatepicker', ko: '주차 달력' },
              { en: 'WeekDatepicker', ko: '주간 달력' },
              { en: 'MultiDatepicker', ko: '멀티 달력' }
            ]
          },
          {
            name: 'timepicker',
            depth4: [{ en: 'Timepicker', ko: '시간선택' }]
          }
        ]
      },
      {
        name: 'atozChart',
        depth3: [
          {
            name: 'atozBarChart',
            depth4: [{ en: 'BarChart1', ko: '대칭차트' }]
          }
        ]
      },
      {
        name: 'swiper',
        depth3: [
          {
            name: 'demo',
            depth4: [{ en: 'DefaultSwiper', ko: '기본' }]
          }
        ]
      },
      {
        name: 'animation',
        depth3: [
          {
            name: 'counter',
            depth4: [{ en: 'GsapCounter', ko: 'Gsap 카운터' }]
          }
        ]
      },
      {
        name: 'excel',
        depth3: [
          {
            name: 'download',
            depth4: [
              { en: 'SingleExcel', ko: '단일 다운로드' },
              { en: 'MultiExcel', ko: '다중시트 다운로드' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'templates',
    depth2: [
      {
        name: 'flex',
        depth3: [
          {
            name: 'basicFlex',
            depth4: [
              { en: 'BasicFlex1', ko: '플랙스시작' },
              { en: 'BasicFlex2', ko: '배치 방향/줄넘김' },
              { en: 'BasicFlex3', ko: '아이템 크기' },
              { en: 'BasicFlex4', ko: '아이템 정렬' },
              { en: 'BasicFlex5', ko: '아이템 순서' }
            ]
          }
        ]
      },
      {
        name: 'grid',
        depth3: [
          {
            name: 'basicGrid',
            depth4: [
              { en: 'BasicGrid1', ko: '그리드시작' },
              { en: 'BasicGrid2', ko: '트랙 크기' },
              { en: 'BasicGrid3', ko: '트랙 크기 자동' },
              { en: 'BasicGrid4', ko: '셀 간격' },
              { en: 'BasicGrid5', ko: '셀 영역' },
              { en: 'BasicGrid6', ko: '셀 영역 이름' },
              { en: 'BasicGrid7', ko: '셀 자동 배치' },
              { en: 'BasicGrid8', ko: '아이템 정렬' },
              { en: 'BasicGrid9', ko: '아이템 순서' }
            ]
          }
        ]
      }
    ]
  }
]

Vue.prototype.$categoryList = category
