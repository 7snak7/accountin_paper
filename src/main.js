import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import AccPaper from './pages/AccPaper.vue'
import Home from '@/pages/HomePage.vue'
import SignageCalc from '@/pages/SignageCalc.vue'
import SignagePage from '@/pages/SignagePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
    },
    {
      name: 'AccPaper',
      path: '/acc_paper',
      component: AccPaper,
    },
    {
      name: 'SignageCalc',
      path: '/signage_calc',
      component: SignageCalc,
    },
    {
      name: 'Signage',
      path: '/signage',
      component: SignagePage,
    },
  ]
})

createApp(App).use(router).mount('#app')
