import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('views/Home')
  },
  {
    path: '/components',
    name: 'components',
    component: loadView('views/Components'),
    children: [
      {
        path: 'amChart',
        name: 'amChart',
        component: loadView('views/amChart/ChartView'),
        children: [
          {
            path: 'barChart',
            name: 'barChart',
            component: loadView('views/amChart/BarChartView')
          },
          {
            path: 'columnChart',
            name: 'columnChart',
            component: loadView('views/amChart/ColumnChartView')
          },
          {
            path: 'lineChart',
            name: 'lineChart',
            component: loadView('views/amChart/LineChartView')
          },
          {
            path: 'multiChart',
            name: 'multiChart',
            component: loadView('views/amChart/MultiChartView')
          },
          {
            path: 'pieChart',
            name: 'pieChart',
            component: loadView('views/amChart/PieChartView')
          },
          {
            path: 'radarChart',
            name: 'radarChart',
            component: loadView('views/amChart/RadarChartView')
          }
        ]
      },
      {
        path: 'atozChart',
        name: 'atozChart',
        component: loadView('views/atozChart/ChartView'),
        children: [
          {
            path: 'atozBarChart',
            name: 'atozBarChart',
            component: loadView('views/atozChart/BarChartView')
          }
        ]
      },
      {
        path: 'swiper',
        name: 'swiper',
        component: loadView('views/swiper/SwiperView'),
        children: [
          {
            path: 'demo',
            name: 'demo',
            component: loadView('views/swiper/DemoView')
          }
        ]
      },
      {
        path: 'animation',
        name: 'animation',
        component: loadView('views/animation/AnimationView'),
        children: [
          {
            path: 'counter',
            name: 'counter',
            component: loadView('views/animation/CounterView')
          }
        ]
      },
      {
        path: 'excel',
        name: 'excel',
        component: loadView('views/excel/ExcelView'),
        children: [
          {
            path: 'download',
            name: 'download',
            component: loadView('views/excel/DownloadView')
          }
        ]
      }
    ]
  },
  {
    path: '/templates',
    name: 'templates',
    component: loadView('views/Templates'),
    children: [
      {
        path: 'flex',
        name: 'flex',
        component: loadView('views/flex/FlexView'),
        children: [
          {
            path: 'basicFlex',
            name: 'basicFlex',
            component: loadView('views/flex/BasicFlexView')
          }
        ]
      },
      {
        path: 'grid',
        name: 'grid',
        component: loadView('views/grid/GridView'),
        children: [
          {
            path: 'basicGrid',
            name: 'basicGrid',
            component: loadView('views/grid/BasicGridView')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: 'notFound',
    component: loadView('views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

function loadView(view) {
  return () => import(/* webpackChunkName: "[request]" */ `../${view}.vue`)
}

export default router
